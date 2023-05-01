import React from 'react'
import { useState, useEffect } from 'react'


import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,defaults } from 'chart.js/auto';

export const Graph = ({name,Data}) => {
   
    const [Dataset, setDataset] = useState({
        lebels:Data.map((data)=>data[0]),
        datasets:[{
            label:TranslateToChinese(name),
            data:[...Data.map((data)=>[data[0],data[1]])],
            backgroundColor:["brown"],
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


const Names = ["Translucency score","Uniformness score","Hydration score","Redness score","ITA score",
"Eye Area Condition","Acne score","Pigmentation score","Pores score","Perceived Age","Eye Age"]


function TranslateToChinese(text){
  if(text === Names[0]){
    return "半透明度分数"
  }  

  if(text === Names[1]){
    return "均匀度得分"
  } 

  if(text === Names[2]){
    return "水化分数"
  } 

  if(text === Names[3]){
    return "发红评分"
  } 
   
  if(text === Names[4]){
    return "ITA分数"
  } 

  if(text === Names[5]){
    return "眼部状况"
  } 
    
  if(text === Names[6]){
    return "痘痘评分"
  } 

  if(text === Names[7]){
    return "色素沉着评分"
  } 

  if(text === Names[9]){
    return "毛孔评分"
  } 

  if(text === Names[10]){
    return "感知年龄"
  } 

  if(text === Names[11]){
    return "眼龄"
  } 

}