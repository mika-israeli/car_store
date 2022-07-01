
import Datatable from "../../components/datatable/Datatable"
import Nevbar from "../../components/nevbar/Nevbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./orders.scss"

const Orders = () => {
    return (
        <div className="orders">
          <Sidebar/>
          <div className="ordersContainer">
            <Nevbar/>
            <Datatable/>
          </div>
        </div>
      )
}

export default Orders