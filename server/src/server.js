const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const carData = require("./carsRandomData")
const model = require("./services/carService")
const app = express();
const server = require("http").createServer(app);
const port = 8000;
const socket_port = 9000
dotenv.config();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ credentials: true, origin: ["http://localhost:3001","http://localhost:3000"] , exposedHeaders: "auth-token" }));
app.use(express.json());
app.use(bodyParser.json());
//db connection --------------------------------------------------------------

const uri = 'mongodb+srv://danielohayon:Daniel0544424836@cluster0.txgjo0e.mongodb.net/daniel_db?retryWrites=true&w=majority';
mongoose.connect(uri);
const connection = mongoose.connection;
app.use(express.urlencoded({ extended: false }));

connection.once("open", () => {
  console.log("database connetion established");
  //model.removeByDaysBack(1)
  //model.addAll(carData)
});
//routes------------------------------------------------------
const AuthRouter = require("./routes/authController");
const CarRouter = require("./routes/carsController");
const OrderRouter = require("./routes/orderController");
const UserRouter = require("./routes/userController");
const markerRouter = require("./routes/markerController");
const staisticsRouter = require("./routes/statisticsController");
const carService = require("./services/carService");


app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/cars", CarRouter);
app.use("/orders", OrderRouter);
app.use("/markers", markerRouter);
app.use("/statistics", staisticsRouter);

// Object that represents admin connection .
let AdminService = {
  socket:null,
  connect:false,
  peerId:null,
  available:true,
  name:''
}
// connectedUSers= {userId :[socket,userdetails]};
let connectedUsers ={} 

let adminOnCallWith =null

// chek if socket is exist in connectedUsers then delete the user from dict.
const removeUserIfExists = (socket)=>{
  let containes = false;
  let key_to_delete = null;
  Object.keys(connectedUsers).forEach(key=>{
      if(connectedUsers[key].socket.id==socket.id)
      key_to_delete = key;
  })
  if(key_to_delete){
      delete connectedUsers[key_to_delete]
  }

}
io.on('connection', (socket) => {
  console.log("Some socket connected... (http)" + socket.id);
// service admin is coonect 
socket.on('serviceAdminSocket',(data)=>{
  AdminService.socket = socket.id;
  AdminService.peerId = data[0]
  AdminService.connect= true;
  AdminService.name=data[1];
  //console.log("Service Admin connected ! ! ! " );
  console.log("Info", `Service Admin connected ! ! ! `);
});

socket.on("getAdminService" , ()=>{
  socket.emit("adminService",AdminService)
  console.log("Admin servvice ")
})
socket.on('AdminConnect',(id)=>{
  //console.log("Admin is connected | Admin id : +" + id)
  console.log("Info", `Admin is connected | Admin id:  ${id}`)
})

socket.on("closeVoiceFromUser",()=>{
  io.to(AdminService.socket).emit("close_call")
  adminOnCallWith=null;
})

socket.on("closeVoiceFromAdmin" , (p_id_to_send)=>{
  console.log(p_id_to_send + ' close  ');
  adminOnCallWith=null;
  io.to(p_id_to_send).emit("close_call")
})
socket.on("onCallWithAdmin",(user_data)=>{
  // user_data.socketId= socket;
  adminOnCallWith = socket;
  io.to(AdminService.socket).emit("onCallWithUser",user_data)
})

socket.on("adminNotAvailable" , (p_id_to_send)=>{
  io.to(p_id_to_send).emit("adminNotAvailable")
})

socket.on("adminAvailability",(p_isAvailable)=>{
  AdminService.available = p_isAvailable;
})
socket.on('me',(userDetails)=>{
  connectedUsers[userDetails.userId] = {
      socket:socket,
      userDetails:userDetails
  }
  socket.emit('me', socket.id);
})

socket.once('disconnect', function () {
  if(adminOnCallWith && socket.id === adminOnCallWith.id){
      io.to(AdminService.socket).emit("user_disconnected");
      adminOnCallWith=null;
  }
  if(AdminService.socket  && AdminService.socket === socket.id)
  {
      if(adminOnCallWith){
          console.log("admin disconnected")
          io.to(adminOnCallWith.id).emit("admin_disconnected")
          adminOnCallWith=null;
      }
      AdminService.socket = null;
      AdminService.connect = false
      AdminService.peerId=null;
      console.log("Info", `Admin service disconnect`)
      //console.log("Admin service disconnect")
  }
  else
  {
      //console.log('Socket Disconnected!!! '); 
      removeUserIfExists(socket);
      console.log("Info", `Socket Disconnected!!!`); 
  }
})



});




app.listen(port, () => {
  console.log("server listining on port :" + port);
});
io.listen(socket_port, () => {
  console.log("server socket listining on port :" + socket_port);
});