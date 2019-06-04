import React, { PureComponent, Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';





function Chart(props) {

    const{data}=props
    let date =new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let totalP = 0

   

    data.forEach(item => {

        if (item.date) {
            date = item.date
            data.splice(data.length - 1, 1)
        }
        else if (item.Euro) totalP += item.Euro


    })



    return <>

        <div>
            <h1>{date}</h1>

            <BarChart
                width={1100}
                height={500}
                data={data}
                margin={{ top: 50, right: 30, left: 50, bottom: 15 }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize="1em" />
                <Tooltip />

                <YAxis label={{ value: '€', angle: 0, position: 'left', fontSize: "2em" }} />

                <Bar dataKey="Euro" fill="#8884d8" stackOffset="expnad" />

            </BarChart>


            <h2>Overall consumption = {totalP.toFixed(2)} €</h2>
        </div>
    </>

}
export default Chart
