import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

function Chart({analogData}) {

  return <>
      <LineChart
        width={420}
        height={320}
        data={analogData}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="7 7" />
        <XAxis dataKey="date" tick={false}/>
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
  </>
}

export default Chart
