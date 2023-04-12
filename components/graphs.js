import React from 'react'
import { useState, useEffect } from 'react'
import { Graph } from './graph'

export const Graphs = ({ Results }) => {
    
    const Names = ["Translucency score","Uniformness score","Hydration score","Redness score","ITA score",
                    "Eye Area Condition","Acne score","Pigmentation score","Pores score","Perceived Age","Eye Age"]
   
    const [Graphs, setGraphs] = useState([...Names.map((name)=>extractValues(name))])

    console.log(Graphs)


    function GetFullyear(date) {
        let dateobj = new Date(date)
        return `${dateobj.getFullYear()}-${dateobj.getMonth()}-${dateobj.getDate()}`
    }

    function extractTime(dateString) {
        const date = new Date(dateString);
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        const second = String(date.getSeconds()).padStart(2, "0");

        return `${hour}:${minute}:${second}`;
    }



    function extractValues(name) {
        let timeStampsArr = []
        let values = []
        for (let i = 0; i < Results.length; i++) {
            timeStampsArr.push(`${GetFullyear(Results[i].createdAt)} ${extractTime(Results[i].createdAt)}`)
            
            Results[i].maskedData[0].map((data) => {


                let OneTimeStampValues = data.result.area_results?.map((areaResult) => {
                    if (isSimilar(areaResult.main_metric?.name, name)) {
                        return areaResult.main_metric?.value
                    }
                }).filter((data) => data != undefined)

                if (OneTimeStampValues != undefined && OneTimeStampValues.length != 0) {
                    const sum = OneTimeStampValues.reduce((acc, val) => acc + val, 0);
                    const ratio = parseInt(sum / OneTimeStampValues.length)
                    values.push(ratio)
                    // console.log(Results[i].createdAt, ratio)
                }

            })
        }
        let GraphValues = timeStampsArr.map(function (e, i) {
            return [e, values[i]];
        });

        // console.log(name, GraphValues)
        return {name,GraphValues}
    }


    function isSimilar(text1, text2) {
        
        text1 = text1.trim().replaceAll(" ", "").toLowerCase()
        text2 = text2.trim().replaceAll(" ", "").toLowerCase()

        if (text1 === text2) {
            return true
        } else {
            return false
        }
    }


   
    return (
        <div className='graphs'>
            {Graphs.map((graph,i)=>{
                return(
                    <>
                    <Graph name={graph.name} Data={graph.GraphValues} key={i}/>
                    </>
                )

            })}
        </div>
    )
}
