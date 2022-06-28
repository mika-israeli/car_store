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

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">CarsLogo</span>
        </div>
        <div className="center">
        <ul>
            <p className="title">MAIN</p>
            <li>
                <GridViewIcon className="icon"/>
                <span>DashBoard</span>
            </li>
            <p className="title">Lists</p>
            <li>
                <PeopleAltIcon className="icon" />
                <span>Users</span>
            </li>
            <li>
                <TimeToLeaveIcon className="icon"/>
                <span>Products</span>
            </li>
            <li>
                <BorderColorIcon className="icon"/>
                <span>Orders</span>
            </li>
            <li>
                <LocalPostOfficeIcon className="icon"/>
                <span>Delivery</span>
            </li>
            <p className="title" >USEFUL</p>
            <li>
                <QueryStatsIcon className="icon"/>
                <span>Stats</span>
            </li>
            <li>
                <NotificationsActiveIcon className="icon"/>
                <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
                <LogoDevIcon className="icon"/>
                <span>logs</span>
            </li>
            <li>
                <SettingsIcon className="icon"/>
                <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
                <AccountBoxIcon className="icon"/>
                <span>Profile</span>
            </li>
            <li>
                <LogoutIcon className="icon"/>
                <span>Logout</span>
            </li>
        </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
            
        </div>
    </div>
  )
}

export default Sidebar