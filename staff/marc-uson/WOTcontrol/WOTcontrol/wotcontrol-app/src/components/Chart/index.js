import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Page A', pv: 2400, amt: 0,
  },
  {
    name: 'Page B', pv: 1398, amt: 0,
  },
  {
    name: 'Page C', pv: 9800, amt: 0,
  },
  {
    name: 'Page D', pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', pv: 4300, amt: 2100,
  },
];

function Chart(props) {

  return <>
      <LineChart
        width={420}
        height={320}
        data={data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="7 7" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
  </>
}

export default Chart
