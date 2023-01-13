import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, IconButton } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinearProgress from "@mui/material/LinearProgress";
import Peer from 'peerjs';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import CallIcon from "@mui/icons-material/Call";
import Draggable from 'react-draggable'; 

import "./Call.css";
import { ToastContainer, toast } from "react-toastify";
import Teams from "../../../assets/teams.mp3";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Stack from '@mui/material/Stack';

//export const socket = io(URL);


function Call(props) {

  const [peerId, setPeerId] = useState('');
  const [PeerConnection,setPeerConnection] = useState(null);
  const [incomingCall,setIncomingCall] = useState(false);
  const [tryCall,setTryCall] = useState(false)
  const[callConnections,setCallConnections] = useState(null)
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [onCall,setonCall] = useState(false)
  const peerInstance = useRef(null);
  const socketInstance = useRef(null);
  const nodeRef = useRef(null);
  const[videoOn,setVideoOn]=useState(true);
  const[micOn,setMicOn]=useState(true);

  const [adminServiceObject, setAdminServiceObject] = useState(null)




  const closeVoice =(p_active = false)=>{
    console.log("Try " + tryCall);
    // release media connection
    if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject){
      console.log(currentUserVideoRef.current.srcObject.getTracks())
      currentUserVideoRef.current.srcObject.getTracks().forEach(function(track) {
        track.stop();
      });
      currentUserVideoRef.current.srcObject = null;
    }
    if(remoteVideoRef.current && remoteVideoRef.current.srcObject){
      remoteVideoRef.current.srcObject.getTracks().forEach(function(track) {
        track.stop();
      });
      remoteVideoRef.current.srcObject = null;
    }
    // send end call to admin 
    if(p_active && socketInstance.current ){
      console.log("Emit close");
      socketInstance.current.emit('closeVoiceFromUser')
    }else{
      console.log("dont emit");
    }
    setonCall(false)
    setTryCall(false)
    //close peer connection
    callConnections && callConnections.close()
  }

  //PEER JS CONFIGURATION
  useEffect(() => {
    const iceConfiguration = {
      iceServers: [
          {
              urls: 'stun.l.google.com:19302',
          }
      ]
    }
    var conn = new Peer(iceConfiguration);
    setPeerConnection(conn)
    console.log("CONNE", conn)
    conn.on('open', (id) => {
        setPeerId(id)        
    });
    conn.on('connection', function(conn) {
      console.log("connection")
    });
    conn.on('close', () => {
      console.log('close peer')
    });
    conn.on('disconnected', function() {
       console.log('disconnected peer') 
    });
    conn.on('error', () => {
      console.log('error peer')
    });
    // incoming call 
    conn.on('call',(call) => {
      setIncomingCall(true)
      //request user media 
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
          currentUserVideoRef.current.srcObject = stream;
          // currentUserVideoRef.current.play();
          call.answer(stream)
          call.on('stream', function(remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play();
          });
      })
      .catch((err) => {
        console.log("cant answer " + err)
      });
    })
    peerInstance.current = conn;
  }, [])

  //SOCKET CONFIGURATION
  useEffect(()=>{
    if(peerId){
      const URL = "http://localhost:9000";
      const socket = io(URL);
      console.log("socket ", socket)
      let user_socketID = null;
      const userIDRandom = Math.random(10).toString();
      console.log("userID: " + userIDRandom)
      const userDetails={
        userId:userIDRandom,
        userName:'daniel',
      }
      socket.emit('me',userDetails);
      socket.on('me', (p_id)=>{
        user_socketID =p_id;
      })
      socket.on('connect',()=>{
        console.log('connection');
      })
      socket.on('close_call',()=>{
        closeVoice(); 
      })
      socket.on('adminNotAvailable',()=>{
        alert("admin not available")
        setTryCall(false)
      });
      socket.on('admin_disconnected',()=>{
        closeVoice();
      });
      socket.on("adminService",(p_admin_service_object)=>{
        // if admin is connected and available for calling - try calling
        console.log("adminService")
        setAdminServiceObject(p_admin_service_object)
        if(p_admin_service_object.connect && p_admin_service_object.available){
          const id = p_admin_service_object.peerId;
          //request user media 
          navigator.mediaDevices.getUserMedia({video: {width:120}, audio: true})
            .then(function(stream) {
              //send caller details to admin.
              socket.emit('onCallWithAdmin',{name:'Admin',socketId:user_socketID});
              currentUserVideoRef.current.srcObject = stream;
              // currentUserVideoRef.current.play();
              const call = peerInstance.current.call(id, stream)
              setCallConnections(call)
              call.on('stream', function(remoteStream) { 
                setonCall(true)
                setTryCall(false)
                remoteVideoRef.current.srcObject = remoteStream
                  // remoteVideoRef.current.play();
              })
            })
            .catch(function(err) {
              setTryCall(false)
              console.log("error: " + err);
            })
        }else{
          setTryCall(false)
          alert("adminNotAvailable")
          return ;
        }
      })
      socket.on('disconnect', () => {
        console.log('disConnect');
      });
      socketInstance.current=socket;
      return ()=>{
        //Delete all socket events - for each connected site
        socket.off('me');
        socket.off('connect');
        socket.off('disconnect');
        socket.off('close_call');
      }
    }
  },[peerId])

  // validate the visibility of video container
  useEffect(()=>{
    const videoContainer = document.getElementById('video-container')
    if(onCall){
      videoContainer.style.visibility="visible"
      videoContainer.style.color="white"

    }else{
      videoContainer.style.visibility="hidden"
    }
  },[onCall])

useEffect(()=>{
 if(tryCall){
    if(socketInstance.current && !onCall){
      socketInstance.current.emit('getAdminService');
    }
  } 
},[tryCall ])

  const CallFunction = () => {
    setTryCall(true)
  }


  const controlUserVideo =  () => {
    if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject){
      if(currentUserVideoRef.current.srcObject.getTracks()[0].kind ==='video'){
        currentUserVideoRef.current.srcObject.getTracks()[0].enabled = !videoOn;
        setVideoOn(!videoOn)
      }else{
        currentUserVideoRef.current.srcObject.getTracks()[1].enabled = !videoOn;
        setVideoOn(!videoOn)
      }
    }
  }
  
  const controlUserMic =  () => {
    if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject){
      if(currentUserVideoRef.current.srcObject.getTracks()[0].kind ==='audio'){
        currentUserVideoRef.current.srcObject.getTracks()[0].enabled = !micOn;
        setMicOn(!micOn)
      }else{
        currentUserVideoRef.current.srcObject.getTracks()[1].enabled = !micOn;
        setMicOn(!micOn)
      }
    }
  }


  return (
    <div style={{
      position:'absolute'
    }}>
    {tryCall ? 
      <div
      onClick={()=>
        closeVoice(true)
              }
              style={{
                position: "fixed",
                left: "1.5vw",
                width: "200px",
                bottom: "5px",
                height: "50px",
                zIndex: "1000000",
                borderRadius: "10px 10px 10px 10px",
                backgroundColor: "white",
                color: "black",
                cursor: "pointer",
                textAlign:'center'
              }}
            >
              try Calling - tap to leave
              <LinearProgress color="inherit" onClick={()=>
                setTryCall(false)
              } sx={{
                width:'90%',
                position: "relative",
                left: "5%",
                bottom:'2px',
                backgroundColor: "white",
              }}/>
            </div> : 
    <IconButton
              style={{
                position: "fixed",
                left: "1vw",
                bottom: "3vh",
                zIndex: "1000000",
                height: "2em",
                width: "8vw",
                justifyContent: "center",
                textTransform: "none",
                borderRadius: "0px 0px 12px 12px",
                backgroundColor: "#009900",
                color: "white",
                opacity: "0.9",
                fontSize: "16px",
              }}
              color="primary"
              aria-label="call"
              onClick={() => CallFunction()}
            >
              <LocalPhoneIcon style={{ margin: "2px" }} fontSize="medium" />
              Call Admin
            </IconButton>
    
    }
    
      <Draggable 
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className='video-container'
          id="video-container"
          >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width:'100%',
              justifyContent: 'center',
              alignItems: 'center',
          }}>
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
              justifyContent: 'center',
              alignItems: 'center',
              }}
            >
            <h3 style={{
              color:'white',
            }}>
              Me
            </h3> 
              <video 
                 width={'50%'} 
                height={'50%'} 
                style={{
                  margin:'5px',
                  width:'150px',
                  height:'150px'
                }} 
                ref={currentUserVideoRef} 
                playsInline
                autoPlay
              />
            </div>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
              justifyContent: 'center',
              alignItems: 'center',
              }}
            >
            <h3 style={{
              color:'white',
            }}>
              {adminServiceObject?.name ? adminServiceObject.name : "Admin"}
            </h3> 
              <video 
                style={{
                  margin:'5px',
                  width:'150px',
                  height:'150px'
                }} 
                width={'50%'} 
                height={'50%'} 
                playsInline 
                ref={remoteVideoRef}
                autoPlay 
              />
            </div>
          </div>
          <Stack sx={{
              position:'absolute',
              bottom:0,
              width:'100%',
              backgroundColor:'black',
              height:'60px',
          }} 
          direction="row" 
          spacing={8}
          >
            <Button
              sx={{
                position:'relative',
                left:'20px',
              }} 
              variant='text'
              color='error'
              onTouchEnd={(e)=>{
                e.preventDefault();
                closeVoice(true)                }}
              onClick={(e)=>{
                e.preventDefault();
                closeVoice(true)
              }}
            >
              End 
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems: 'center',
                opacity: 0.8,
                position: 'relative',
                bottom:6
              }}
            >
              <IconButton
                size="small" 
                aria-label='mute-video'
                sx={{
                  color:'white'
                }}
                onTouchEnd={(e)=>{
                  e.preventDefault();
                  controlUserVideo()
                }}
                onClick={(e)=>{
                  e.preventDefault();
                  controlUserVideo()
                }}
              >
                {videoOn ? <VideocamIcon  /> : <VideocamOffIcon   />}
              </IconButton>
              <p style={{
                top:'35px',
                position: 'absolute',
                fontSize:'0.6rem',
                fontWeight:'bolder',
                textAlign: 'center'
              }}>
              {videoOn ? 'Stop ' : 'Unstop '}

              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems: 'center',
                opacity: 0.8,
                position: 'relative',
                bottom:6
                
              }}
            >
              <IconButton
              sx={{
                  color:'white',
                }}
              size='large' 
              aria-label='mute'
              onTouchEnd={(e)=>{
                e.preventDefault();
                controlUserMic()                }}
              onClick={(e)=>{
                e.preventDefault();
                controlUserMic()
              }}
            >
              {micOn ? <MicIcon /> : <MicOffIcon />}

            </IconButton>
              <p style={{
                top:'35px',
                position: 'absolute',
                fontSize:'0.6rem',
                fontWeight:'bolder',
                textAlign: 'center'
              }}>
              {micOn ? 'Mute' : 'Unmute'}

              </p>
              
            </div>
            </Stack>
        </div>
      </Draggable> 
    
  </div>
  );
}

export default Call;
