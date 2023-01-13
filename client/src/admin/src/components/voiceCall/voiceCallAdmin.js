import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './voice.css';
import Draggable from 'react-draggable'; 
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const SiteList=['localhost']

function VoiceCall() {
  const [peerId, setPeerId] = useState('');
  const remoteVideoRef = useRef(null);
  const[callConnections,setCallConnections] = useState(null)
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const voiceCallSocketRef = useRef(null);
  const siteSocketObjectRef = useRef(null);
  const [onCall,setonCall] = useState(false)
  const [userData,setUserData] = useState(null)
  const nodeRef = useRef(null);
  const[videoOn,setVideoOn]=useState(true);
  const[micOn,setMicOn]=useState(true);
  const [focousOnVideo,setFocousOnVideo]=useState(true)
  
  const closeVoice =(p_acitve=false)=>{
     //Release all user media connections
    if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject){
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
    // send end call to user 
    if(p_acitve && voiceCallSocketRef.current){
      closeVoiceFromAdmin()
    }else{
      console.log("dont close");
    }
    setonCall(false)
    //close peer connection
    callConnections&& callConnections.close()
    // emit to all servers(sites list) that admin is available 
    sendAdminAvalability(true)
   
  }

  const closeVoiceFromAdmin=()=>{
    if( voiceCallSocketRef.current){
      voiceCallSocketRef.current.socket.emit('closeVoiceFromAdmin',voiceCallSocketRef.current.userData.socketId)
    }
  }

  const adminNotAvailable = ()=>{
    if( voiceCallSocketRef.current){
      voiceCallSocketRef.current.socket.emit('adminNotAvailable',voiceCallSocketRef.current.userData.socketId)
    }
  }

  //PEER JS CONFIGURATION
  useEffect(() => {

    const iceConfiguration = {
      iceServers: [
          {
              urls: 'turn:pilot.carteav.com:3478',
              username: 'daniel',
          }
      ]
    }
    var conn = new Peer(iceConfiguration);
    conn.on('open', (id) => {
        setPeerId(id)
    });

    conn.on('disconnected', ()=> {
      console.log('disconnected peer'); 
    });

    conn.on('error', () => {
      console.log('error peer');
    });
    // icoming call from user 
    conn.on('call',(call) => {
      setCallConnections(call);
      Swal.fire({
        title: 'Icoming Call from user',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Answer',
        denyButtonText: `leave`,
      }).then((result) => {
        if(!callConnections) Swal.close();
        if (result.isConfirmed) {
          //request user media 
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setonCall(true)
            currentUserVideoRef.current.srcObject = stream;
            currentUserVideoRef.current.play();
            call.answer(stream)
            sendAdminAvalability(false)
            call.on('error', ()=>{
              console.log ("error ")
              closeVoice()
            })
            call.on('stream', function(remoteStream) {
              remoteVideoRef.current.srcObject = remoteStream
              remoteVideoRef.current.play();
            });
          })
          .catch((err) => {
            console.log("cant answer " + err);
            adminNotAvailable()
          });
        } else if (result.isDenied) {
          adminNotAvailable()
          Swal.close();
        }else{
          adminNotAvailable()
          Swal.close();
        }
      })        
    })

    conn.on('close', () => {
      console.log('error peer')
    });

    peerInstance.current = conn;
 
  }, [])

  //SOCKET CONFIGURATION
  useEffect(()=>{

    if(peerId){
      // create a dictionary - {'sitename':relevantSocket}

      const sites_scokets={}
      SiteList.forEach((site_name)=>{
        //const url ='http://' + site_name +'';
        const URL = "http://localhost:9000";
        const relevant_socket = io(URL);
        sites_scokets[site_name] =relevant_socket;
        relevant_socket.on('connect',()=>{
          console.log('connection');
        })

        // when socket is connecting set admin is available
        relevant_socket.emit('adminAvailability',true)

        relevant_socket.emit('serviceAdminSocket',[peerId,'Yehuda'])
        
        relevant_socket.on('close_call',()=>{
          closeVoice(); 
        })
        relevant_socket.on('onCallWithUser', (p_user_data)=> {
          setUserData(p_user_data);
          console.log('onCallWithUser');
          voiceCallSocketRef.current = {
            socket:relevant_socket,
            userData:p_user_data
          };
        });
        relevant_socket.on('disconnect', () => {
          console.log('disConnect');
        });
        relevant_socket.on('user_disconnected',()=>{
          closeVoice();
        });
      })
     
      siteSocketObjectRef.current =sites_scokets;

      return ()=>{
        //Delete all socket events - for each connected site
        Object.values(sites_scokets).forEach((socket)=>{
          socket.off('user_disconnected');
          socket.off('connect');
          socket.off('onCallWithUser');
          socket.off('serviceAdminSocket');
          socket.off('adminAvailability');
          socket.off('disconnect');
          socket.off('close_call');
        })
      }
    }
  },[peerId])

  // send to all servers sites the admin availability - true if available for call and false if unavailable 
  const sendAdminAvalability = (p_isAvailable) => {
    if(p_isAvailable && voiceCallSocketRef.current){
      voiceCallSocketRef.current = null;
    }
    if(siteSocketObjectRef.current)
    {
      if(Object.keys(siteSocketObjectRef.current).length > 0) {
        Object.values(siteSocketObjectRef.current).forEach((relevant_socket)=>{
            relevant_socket.emit('adminAvailability',p_isAvailable)
        })
      }
    }
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
      console.log(currentUserVideoRef.current.srcObject.getTracks())
      if(currentUserVideoRef.current.srcObject.getTracks()[0].kind ==='audio'){
        currentUserVideoRef.current.srcObject.getTracks()[0].enabled = !micOn;
        setMicOn(!micOn)
      }else{
        currentUserVideoRef.current.srcObject.getTracks()[1].enabled = !micOn;
        setMicOn(!micOn)
      }
    }
  }

  // validate the visibility of vide container
  useEffect(()=>{
    const videoContainer = document.getElementById('video-container')
    if(onCall){
      videoContainer.style.visibility="visible"
      videoContainer.style.color="white"
    }else{
      videoContainer.style.visibility="hidden"
    }
  },[onCall])

  // TODO: create admin call function 
  const call =  (id) => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function(stream) {
      currentUserVideoRef.current.srcObject = stream;
      currentUserVideoRef.current.play();
      const call = peerInstance.current.call(id, stream)
      
      call.on('stream', function(remoteStream) { 
        console.log ("stream " + remoteStream)
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
      })
    })
    .catch(function(err) {
      console.log("error: " + err);
    })
  }

  return (
    <div className="App">
      <h1>Voice Call test</h1>
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
              <h5>
                Me
              </h5> 
                <video
                  width={'150px'} 
                  height={'150x'} 
                  style={{
                    margin:'5px',
                    width:'150px',
                    height:'150px'
                  }} 
                 
                  ref={currentUserVideoRef}
                  autoPlay  
                  playsInline
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
              <h5>
                {userData?.name ? userData.name :'Client'}
              </h5> 
                <video
                  onClick={()=>{
                    setFocousOnVideo(!focousOnVideo)
                  }} 
                  width={'150px'} 
                  height={'150x'} 
                  style={{
                    margin:'5px',
                    width:'150px',
                    height:'150px'
                  }} 
                 
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline  
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
          
          {/* </Resizable> */}
        </Draggable> 
    </div>
  );
}

export default VoiceCall;