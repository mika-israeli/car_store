import Datatable from "../../components/datatable/Datatable"
import Nevbar from "../../components/nevbar/Nevbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Nevbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List