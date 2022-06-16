import CarFeed from "./components/CarFeed";
import { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import SelectableList from "./components/SelectableList";
import LeftBar from "./components/LeftBar";
//import data from "./mockData";
function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <Box>{data && <CarFeed items={data} />}</Box> */}
      {/* <SelectableList />
      <SelectableList /> */}
      <CssBaseline enableColorScheme />
      {data && <LeftBar items={data} />}
    </div>
  );
}

export default App;
