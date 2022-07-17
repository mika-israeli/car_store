import React, { useEffect, useRef, useState ,useCallback } from "react"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import PhoneIcon from "@material-ui/icons/Phone"
import LinearProgress from '@mui/material/LinearProgress';
import Peer from "simple-peer"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import CircularProgress from '@mui/material/CircularProgress';
import CallIcon from '@mui/icons-material/Call';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import "./Call.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Teams from "../../../assets/teams.mp3";
import { io } from "socket.io-client";
import { message } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
const URL = "http://localhost:9000";
export const socket = io(URL);



function Call(props) {
	const [ me, setMe ] = useState()
	const [ stream, setStream ] = useState(null)
	const [ userStream, setUserStream ] = useState(null)
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const[ tryCall , setTryCall] = useState(false)
    const [ AdminAlive , setAdminAlive] = useState(false)
	const[AdminID , setAdminId] = useState(null)
	const [value, setValue] = React.useState('autoPlay');
	const [deltaPosition , setDeltaPosition] = useState({})
    const [liveSocket, setLiveSocket] = useState({})
	const [stopDrag , setStopDrag] = useState(true)
	const [showCantCallingtoast ,setShowCantCallingtoast ] = useState(false)

	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

    async function getUserMedia () {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream	
			setTryCall(true)
		
		}).catch((err) => {
			console.log(err)
			showCantgetPermission()
		})
    }


	useEffect(()=>{
		if(stream && tryCall){
			callUser()
		}
	},[stream,tryCall])

	useEffect(()=>{
		socket.emit("me")
		socket.on('me', (id) => setMe(id));

		if(window.location.href.includes('admin')){
			socket.emit("serviceAdminSocket")
		}else{
			setInterval(()=>{
				socket.emit('getAdminId');
			},1000)
		}
		
		socket.on("AdminID" , (adminId) =>{
            setAdminId(adminId)
			setAdminAlive(true)
		})
		socket.on('AdminNotAvialbe', ()=>{
			setAdminAlive(false)
			showCantCalling()
		})
		socket.on('EndCall',()=>{
			window.location.reload()
		})
		
		socket.on("EndCalling",()=>{
			window.location.reload();
		})
		socket.on("callUser", (data) => {
			if(receivingCall){
				socket.emit("AdminInUse",data.socketfrom);
			}
			else{
				getUserMedia()
				setReceivingCall(true)
				setCaller(data.from)
				setName(data.name)
				setCallerSignal(data.signal)
			}
		})
	}, [])
	


	useEffect(() => {
		if(showCantCallingtoast && !window.location.href.includes('admin') )
		{
			showCantCalling()
		}
	},[showCantCallingtoast])
	
	const callUser =  () => {
		// console.log("calling")
		// console.log(stream)
		// console.log("Admin Id " + AdminID)
		if(AdminID !== null && AdminAlive){
			setCaller(AdminID)
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream
			})
			peer.on("signal", (data) => {
				socket.emit("callUser", {
					userToCall: AdminID,
					signalData: data,
					from: me,
					name: name
				})
			})
			peer.on("stream", (currentStream) => {	
				userVideo.current.srcObject = currentStream

			})
			socket.on("callAccepted", (signal) => {
				setUserStream(true)
				setTryCall(false)
				setCallAccepted(true)
				console.log("CALL ACCEPTED")
				peer.signal(signal)
			})
			connectionRef.current = peer
			console.log(connectionRef.current)
		}else{
			setTryCall(false)
			setShowCantCallingtoast(true)
			}
	}


	const answerCall = ()=>  { 
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream : stream
		})
		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: caller });
		  });
		setUserStream(true)
		peer.on('stream', (currentStream) => {
			// console.log("CALL ACCEPTED")
		
		  	userVideo.current.srcObject = currentStream;
		});
		peer.signal(callerSignal)
		connectionRef.current = peer
		console.log(connectionRef.current)
	}

	const LeaveCall = () => {
		socket.emit('EndCall',caller);
		if(connectionRef)
			connectionRef.current.destroy()
		setCallEnded(true)
		setUserStream(null)
		setCallAccepted(false)
		window.location.reload(false);
	}
    const showCantCalling = () =>{
		toast.error('Admin Not Availabe!', {
			toastId: 'availabe',
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme:'dark'
			});
			setShowCantCallingtoast(false)
    }
	const showCantgetPermission = () =>{
			toast.error('Permission problem!', {
				toastId: 'error',
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme:'dark'
				});
				
		}

	const ShowPhoneButton = () => { // Call Btn  - 3 different style 
		if(window.location.href.includes('admin') ) // Admin Page - return null 
		{	return(
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button style={{
							position: 'fixed',
							left: '1vw',
							bottom: '3vh',
							zIndex: '1000000',
							textTransform: "none",
							borderRadius: "0px 0px 20px 20px",
							backgroundColor: "red",
							color: "white",
							float: 'left',
							width:'13vw',
							}}
							variant="contained" color="secondary" onClick={LeaveCall}>
							End Call
						</Button>):
					null
				}
				</div>
			)
		}
		else {  // 
			
			return(
			<div className="call-button">
			 
			{callAccepted && !callEnded ? (
				<Button style={{
					position: 'fixed',
					left: '1vw',
					bottom: '3vh',
					zIndex: '1000000',
					textTransform: "none",
					borderRadius: "0px 0px 20px 20px",
					backgroundColor: "red",
					color: "white",
					float: 'left',
					width:'13vw',
				}}
			 variant="contained" color="secondary" onClick={LeaveCall}>
				End Call
			</Button>
			) : !tryCall ?  ( 
			<IconButton style={{
				position: 'fixed',
				left: '1vw',
				bottom: '3vh',
				zIndex: '1000000',
				height:'2em',
				width:'8vw',
				justifyContent:"center",
				textTransform: "none",
				borderRadius: "0px 0px 12px 12px",
				backgroundColor: "#009900",
				color: "white",
				opacity:'0.9',
				fontSize:'16px'
			}} color="primary" aria-label="call" onClick={() => getUserMedia()}>
				<PhoneIcon style={{margin:'2px'}}  fontSize="medium" />
				Call Admin
			</IconButton>
		) : <div onClick={LeaveCall} style={{
			position: 'fixed',
			left: '1.5vw',
			width:'12vw',
			bottom: '3vh',
			height:'2em',
			zIndex: '1000000',
			borderRadius: "10px 10px 0px 0px",
			backgroundColor: "white",
			color: "#009DDC",
			float: 'left',
			cursor: 'pointer'
		}}> 
			try Calling - tap to leave
			<LinearProgress  color="inherit" style={{}}  />
		</div> 
		 }
			</div> )} 
	}

	// 


	const AnswerButton = () =>{
		
		 if(receivingCall && !callAccepted ){
			return (
				<div  style={{ cursor: 'grab' }}  className="AdminAnswer" >
					<audio src={Teams} loop autoPlay />
					<h1 class="animate__animated animate__swing animate__infinite" style={{color:'white', opacity:'1'}} >{name} is calling...</h1>
					 <BottomNavigation className="bottom_nav"  >
					   <BottomNavigationAction  onClick={answerCall} icon={<CallIcon color="success" fontSize="medium" />} />
					   <BottomNavigationAction   onClick={()=>{LeaveCall()}} icon={<PhoneMissedIcon color="error" fontSize="medium"  /> } />
    				</BottomNavigation>
				</div>
			)}
			else if(callAccepted && !callEnded )
				{ 
				return (
                    <div className="AdminAnswer" style={{top:'0',color:'white' }}> 
                        <h1> Alive with : {name} </h1>
                    </div>
				)}else{return<div></div>}
		}
		// 		else {
		// 			return(
		// 				<div  style={{position: 'fixed',
		// 				right: '0',
		// 				top:'30px',
		// 				zIndex: '2',
		// 				marginTop: '10rem'}} >
		// 				{receivingCall && !callAccepted ? (
		// 				<div className="caller">
		// 				<h1 >{name} is calling...</h1>
		// 				<Button variant="contained" color="primary" onClick={answerCall}>
		// 					Answer
		// 				</Button>
		// 			</div> ) : null}
		// 	</div>)}
		// }

	return (
		<>

			<ToastContainer/>
		<div className="container">	
			<ShowPhoneButton />
			<AnswerButton />
			<video autoPlay ref={myVideo} style={{ visibility: callAccepted && !callEnded ? 'visible' : 'hidden' }} />
			{
				callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay/> :
				null
			}
		</div>	
		</>
	)
}

export default Call