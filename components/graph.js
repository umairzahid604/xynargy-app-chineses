import React from 'react'
import { useState, useEffect } from 'react'


import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,defaults } from 'chart.js/auto';

export const Graph = ({name,Data}) => {
   
    const [Dataset, setDataset] = useState({
        lebels:Data.map((data)=>data[0]),
        datasets:[{
            label:name,
            data:[...Data.map((data)=>[data[0],data[1]])],
            backgroundColor:["green"],
            borderColor:"black",
            borderWidth:2
        },
        
    
    ]
    })
    
    return (
        <div className='graph'>
        {/* <div>{name}</div> */}
        <Line data={Dataset}/>
        </div>
    )
}
