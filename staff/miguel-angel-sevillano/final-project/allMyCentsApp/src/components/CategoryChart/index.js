import React, { PureComponent, Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';





function CategoryChart({data,category}) {

   
    let date =new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let totalP = 0

   debugger
    if(data != "string"){

    data.forEach(item => {

        if (item.date) {
            date = item.date
        }
        else if (item.Euro) totalP += item.Euro

    })
}

    return <>

        <div class="box">
            <div class="box">
                {date}
            </div>

            <div class="box">
                {category}
            </div>
            

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
export default CategoryChart
