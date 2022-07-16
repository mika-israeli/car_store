import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";


const Featured = ({inputs}) => {
    let incomePrecent = (inputs.dailySales.total / inputs.target) * 100;
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={incomePrecent} text={incomePrecent.toString()+ "%"} strokeWidth={5}/>
            </div>
            <p className="title"> Total sales made today</p>
            <p className="amount">$ {inputs.dailySales.total}</p>
            <p className="desc">
            Previous transactions processing. Last payments may not be included.
            </p>
            <div className="summary">

                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult positive">
                        <div className="resultAmount">${inputs.target}</div>
                    </div>
                </div>

                <div className="item">
                    <div className="itemTitle">last Week</div>
                    <div className="itemResult negative">
                        <div className="resultAmount">${inputs.erningsAmount}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Featured