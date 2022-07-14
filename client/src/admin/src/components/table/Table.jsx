import "./table.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({inputs, orders}) => {
    const rows = orders;
    // console.log(rows);

      return (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">User Id</TableCell>
                <TableCell className="tableCell">Shipping Address </TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Products Orderd</TableCell>
                {/* <TableCell className="tableCell">Status</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">{row._id}</TableCell>
                  <TableCell className="tableCell">{row.address}</TableCell>
                  <TableCell className="tableCell">{row.date}</TableCell>
                  <TableCell className="tableCell">{row.items.length}</TableCell>
                  {/* <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default List;