import React, { PureComponent, Component } from 'react';
import {
    BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';





function Chart(props) {


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    const{data}=props
    let date =new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let totalP = 0
    let color = getRandomColor()

   

    data.forEach(item => {

        if (item.date) {
            date = item.date
        }
        else if (item.Euro) totalP += item.Euro

    })

    return <>

        <div>
            <h1>{date}</h1>

            <BarChart
                width={1600}
                height={500}
                data={data}
                margin={{ top: 50, right: 30, left: 50, bottom: 15 }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize="1em" />
                <Tooltip />

                <YAxis label={{ value: '€', angle: 0, position: 'left', fontSize: "2em" }} />
                <Brush dataKey='name' height={30} stroke="#8884d8"/>
                <Bar dataKey="Euro" fill={color} stackOffset="expnad" />

            </BarChart>


            <h2>Overall consumption = {totalP.toFixed(2)} €</h2>
        </div>
    </>

}
export default Chart
