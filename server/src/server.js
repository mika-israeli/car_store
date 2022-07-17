const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const port = 5000;
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

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
app.use(express.urlencoded({ extended: false }));

connection.once("open", () => {
  console.log("database connetion established");
});
//routes------------------------------------------------------
const AuthRouter = require("./routes/authController");
const CarRouter = require("./routes/carsController");
const OrderRouter = require("./routes/orderController");
const UserRouter = require("./routes/userController");
const markerRouter = require("./routes/markerController");
const staisticsRouter = require("./routes/statisticsController");
app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/cars", CarRouter);
app.use("/orders", OrderRouter);
app.use("/markers", markerRouter);
app.use("/statistics", staisticsRouter);


io.on('connection', (socket) => {
  console.log("Some socket connected... (http)" + socket.id);
// service admin is coonect 
  socket.on('serviceAdminSocket',(...arg)=>{
      AdminService.socket = socket.id;
      AdminService.connect= true;
      console.log("Service Admin connected ! ! ! " );
  });

  socket.on("getAdminId" , ()=>{
      // socket.emit("AdminID",liveSocket[counter])
      // socket.emit("AdminID",AdminService.socket)
      socket.emit("AdminID",socket.id)
  })

  socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name , socketfrom: socket.id })
  })
  socket.on('EndCall',(callId)=>{
      io.to(callId).emit("EndCalling")
  })
  socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal)
  })

  socket.on("AdminInUse",(user)=>{
      io.to(user).emit("AdminNotAvialbe");
  })
  socket.on('me',()=>{
      socket.emit('me', socket.id);
  })
 
  socket.on('userCallSocket', (id)=>{
      console.log('user Socekt connected ');
  }) 
  socket.on('getLiveUsers',()=>{
      socket.emit('liveSockets',liveSocket)
  })

  socket.once('disconnect', function () {
      socket.broadcast.emit("callEnded")
      if(AdminService.socket  && AdminService.socket === socket.id){
          AdminService.socket = null;
          AdminService.connect = false
          console.log("Admin service disconnect")
      }else{
      console.log('Socket DisCOnnected!!! '); }
  })

});



app.listen(port, () => {
  console.log("server listining on port :" + port);
});
