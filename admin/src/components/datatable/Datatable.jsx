import "./datatable.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { userColumns, userRows, productColumns, productRows } from "../../datatablesource";
import { Link } from "react-router-dom";

const Datatable = ({inputs}) => {

  const actionColumn=[
    {field: "action", headerName:"Action", width: 200, renderCell:()=>{
      return(
        <div className="cellAction">
          <Link to="/users/test" style={{textDecoration: "none"}}>
          <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton">Delete</div> 
          {/* need to add funcionality */}
        </div>
      );
    } }

  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {inputs === "users"? "User" : "Product"}
        <Link to={inputs === "users"? "/users/new" : "/products/new"} className="link">
          Add New
        </Link>
      </div>
 <DataGrid
        rows={inputs === "users"? userRows : productRows}
        columns={inputs === "users"? userColumns.concat(actionColumn) : productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable