import "./chart.scss"
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import { mergeBreakpointsInOrder } from "@mui/system";




const Chart = ({aspect, title, inputs}) => {
  const data = [];

  //we need to add month data 

  for(let i = 0; i<inputs.yearlySalesPerMonth.length; i++){
    switch(inputs.yearlySalesPerMonth[i]._id){
      case 1: data.push({name: "January", Total: inputs.yearlySalesPerMonth[i].total});break;
      case 2: data.push({ name: "February", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 3: data.push({ name: "January", Total: inputs.yearlySalesPerMonth[i].total }); break;
      case 4: data.push({ name: "March", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 5: data.push({ name: "April", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 6: data.push({ name: "June", Total: inputs.yearlySalesPerMonth[i].total }); break;
      case 7: data.push({ name: "July", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 8: data.push({ name: "August", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 9: data.push({ name: "September", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 10: data.push({ name: "October", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 11: data.push({ name: "November", Total: inputs.yearlySalesPerMonth[i].total });break;
      case 12: data.push({ name: "December", Total: inputs.yearlySalesPerMonth[i].total });break;
      default: break;

    }
  }

  // data.push({ name: "December", Total: 540000 });
  // data.push({ name: "February", Total: 45000});


  return (
    <div className="chart">
    <div className="title">{title}</div>
    <ResponsiveContainer width="100%" aspect={aspect}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default Chart