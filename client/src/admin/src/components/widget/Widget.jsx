import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from "react-router-dom";

const Widget = ({type, inputs}) => {
    let data;


    //temporery
    const amount = 100;
    const diff = 20;

    switch(type){
        case "user":
            data={
                title:"USERS",
                isMoney: false,
                link: <Link to="/admin/users" style={{textDecoration: "none"}}>See all users</Link>,
                amount: inputs.userAmount,
                icon:<PersonOutlineIcon className="icon" style={
                    {color:"crimson",
                    backgroundColor: "rgba(255,0,0,0.2)"
            }}/>
            }
            break;
        default:
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: <Link to="/admin/orders" style={{textDecoration: "none"}}>See all orders</Link>,
                amount: inputs.orderAmount,
                icon:<ShoppingCartIcon className="icon" style={
                    {color:"goldenrod",
                    backgroundColor: "rgba(218,165,32,0.2)"
            }}/>
            }
           break;
        case "earning":
            data = {
            title: "EARNINGS",
            isMoney: true,
            amount: inputs.erningsAmount,
            icon: <AttachMoneyIcon className="icon" style={
                {color:"green",
                backgroundColor: "rgba(0,128,0,0.2)"
        }}/>
            }
            break;
    }
  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"} {data.amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
         {data.icon}
        </div>
    </div>
  )
}

export default Widget