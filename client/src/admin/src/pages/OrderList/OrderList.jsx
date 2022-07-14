import "./OrderList.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderList = ({order}) => {
    const rows = order;
    console.log(rows);

      return (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Product Id</TableCell>
                <TableCell className="tableCell">Manufacturer</TableCell>
                <TableCell className="tableCell">Model</TableCell>
                <TableCell className="tableCell">Description</TableCell>
                <TableCell className="tableCell">price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.items.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">{row._id}</TableCell>
                  <TableCell className="tableCell">{row.manufacturer}</TableCell>
                  <TableCell className="tableCell">{row.model}</TableCell>
                  <TableCell className="tableCell">{row.description}</TableCell>
                  <TableCell className="tableCell">{row.price}</TableCell>
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

export default OrderList;