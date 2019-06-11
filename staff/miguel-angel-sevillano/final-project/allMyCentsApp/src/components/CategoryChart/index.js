import React, { PureComponent, Component } from 'react';
import {
    BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';





function CategoryChart({ data }) {

    let { cat, res } = data

    



    let date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let totalP = 0
    let width = 0
    

    if (res.length < 5) width = 300
    else width = 300


    if (typeof (res) != "string") {
       
        res.forEach(item => {
           debugger
            let fixed = item.Euro
          
            fixed = Number(fixed.toFixed(2))
            item.Euro = fixed
            
            if (item.date) {
                date = item.date
            }
            else if (item.Euro) totalP += item.Euro

        })
    } else res = false

    return <>

        {res && <div class="box">



            <span class="tag is-warning is-large">{cat}</span>



            <BarChart
                width={width}
                height={300}
                data={res}
                margin={{ top: 50, right: 30, left: 50, bottom: 15 }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize="0.8em" />
                <Tooltip />

               
                <Brush dataKey='name' height={30} stroke="#8884d8" />
                <Bar dataKey="Euro" fill="blue" stackOffset="expnad" />

            </BarChart>

            <span class="tag is-warning is-medium">Overall consumption = {totalP.toFixed(2)} €</span>
        </div>}

    </>

}
export default CategoryChart
