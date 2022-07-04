import Datatable from "../../components/datatable/Datatable"
import Nevbar from "../../components/nevbar/Nevbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"

const List = ({inputs}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Nevbar/>
        <Datatable inputs={inputs}/>
      </div>
    </div>
  )
}

export default List