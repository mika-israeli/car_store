import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Nevbar from "../../components/nevbar/Nevbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { matchRoutes, useLocation } from "react-router-dom"







const Single = ({inputs}) => {

    const location = useLocation();
    const locationArr = location.pathname.split("/");
    const id = locationArr[locationArr.length -1];
    let user;
    let orders = []
    
    for (let i=0; i<inputs.userRows.length ; i++){
       if (inputs.userRows[i]._id == id){
            user = inputs.userRows[i];
       }
    }

    for (let i=0; i<inputs.orderRows.length ; i++){
      if (inputs.orderRows[i].userid == id){
          orders.push(inputs.orderRows[i]);
      }
   }

    // console.log(orders);


  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Nevbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">
                    {user.createdAt}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{user._id}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" inputs={inputs}/>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;