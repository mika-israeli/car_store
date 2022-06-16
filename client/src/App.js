import CarFeed from "./components/CarFeed";
import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { Box } from "@mui/material";
//import data from "./mockData";
function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, []);
  
  return <div>
    <Box>
    
    {data && <CarFeed items={data} />}
    </Box>
    
  </div>;
}

export default App;
