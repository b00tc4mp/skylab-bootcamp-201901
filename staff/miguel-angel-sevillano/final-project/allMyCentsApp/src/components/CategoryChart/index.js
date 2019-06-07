import React, { PureComponent, Component } from 'react';
import {
    BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';





function CategoryChart({data}) {

    let{cat,res}=data

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      


    let date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let totalP = 0
    let width = 0
    let color = getRandomColor()

    if(res.length<5)width = 600
    else width=1500


    if (typeof (res) != "string") {
debugger
        res.forEach(item => {

            if (item.date) {
                date = item.date
            }
            else if (item.Euro) totalP += item.Euro

        })
    }else res=false

    return <>

       {res && <div class="box">
            <div class="box">
                <span class="tag is-warning">{date}</span>
            </div>

            <div class="box">
            <span class="tag is-warning">{cat}</span>
            </div>


            <BarChart
                width={width}
                height={500}
                data={res}
                margin={{ top: 50, right: 30, left: 50, bottom: 15 }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize="1em" />
                <Tooltip />

                <YAxis label={{ value: '€', angle: 0, position: 'left', fontSize: "2em" }} />
                <Brush dataKey='name' height={30} stroke="#8884d8"/>
                <Bar dataKey="Euro" fill={color} stackOffset="expnad"  />

            </BarChart>

            <span class="tag is-warning">Overall consumption = {totalP.toFixed(2)} €</span>
        </div>}

    </>

}
export default CategoryChart
