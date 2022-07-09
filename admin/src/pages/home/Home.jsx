import Sidebar from "../../components/sidebar/Sidebar"
import Nevbar from "../../components/nevbar/Nevbar"
import Widget from "../../components/widget/Widget"
import "./home.scss"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"

const Home = ({inputs}) => {
  return (
    <div className='home'>
         <Sidebar />
         <div className="homeContainer">
         <Nevbar/>
         <div className="widgets">
          <Widget type= "user" inputs={inputs}/>
          <Widget type= "order" inputs={inputs}/>
          <Widget type= "earning" inputs={inputs}/>
         </div>
         <div className="charts">
          <Featured/>
          <Chart title="Last 6 Months (Revenue)" aspect={2/1} inputs={inputs}/>
         </div>
         <div className="listContainer">
          <div className="listTitle">Most Sold Products</div>
          <Table inputs={inputs}/>
         </div>
         </div>
        </div>
  )
}

export default Home