import "./datatable.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { userColumns, userRows, productColumns, productRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

// const func = ({params}) => {
//   console.log(params);
// }

const Datatable = ({inputs}) => {

 

  const actionColumn=[
    {field: "action", headerName:"Action", width: 200, renderCell:(params)=>{
      return(
        <div className="cellAction">
          <Link to={`/admin/${inputs.from}/${params.id}`} style={{textDecoration: "none"}}>
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
        {inputs.title}
      </div>
 <DataGrid
        getRowId={(row) => row._id}
        rows={inputs.dataRows}
        columns={inputs.dataColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable