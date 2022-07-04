
import Datatable from "../../components/datatable/Datatable"
import Nevbar from "../../components/nevbar/Nevbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./orders.scss"

const Orders = ({inputs}) => {
    return (
        <div className="orders">
          <Sidebar/>
          <div className="ordersContainer">
            <Nevbar/>
            <Datatable inputs={inputs}/>
          </div>
        </div>
      )
}

export default Orders