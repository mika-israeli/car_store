import "./sidebar.scss"
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <Link to="/" style={{textDecoration: "none"}}>
            <span className="logo">CarsLogo</span>
            </Link>
        </div>
        <div className="center">
        <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{textDecoration: "none"}}>
            <li>
                <GridViewIcon className="icon"/>
                <span>DashBoard</span>
            </li>
            </Link>
            <p className="title">Lists</p>
            <Link to="/users" style={{textDecoration: "none"}}>
            <li>
                <PeopleAltIcon className="icon" />
                <span>Users</span>
            </li>
            </Link>
            <Link to="/products" style={{textDecoration: "none"}}>
            <li>
                <TimeToLeaveIcon className="icon"/>
                <span>Products</span>
            </li>
            </Link>
            <Link to="/orders" style={{textDecoration: "none"}}>
            <li>
                <BorderColorIcon className="icon"/>
                <span>Orders</span>
            </li>
            </Link>
        </ul>
        </div>
    </div>
  )
}

export default Sidebar