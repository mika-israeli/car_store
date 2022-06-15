import CarFeed from "./components/CarFeed";
import { useState, useEffect } from "react";
//import data from "./mockData";
function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, []);
  return data && <CarFeed items={data} />;
}

export default App;
