import React from 'react'
import { useState, useEffect } from 'react'
import { Mask } from './Mask'

export const Score = ({ name, AreaResults, algo_tech_name, imageData }) => {
    const [value, setvalue] = useState(0)
    const [expand, setexpand] = useState(false)
   


function ScorePosition(value) {
    if (value >= 90) {
        return "Excellent"
    }

    if (value >= 80) {
        return "Great"
    }


    if (value >= 65) {
        return "Good"
    }


    if (value >= 50) {
        return "Average"
    }

    if (value >= 30) {
        return "Rather Bad"
    }

    if (value >= 0) {
        return "Bad"
    }
}

function MatricsHandler() {
    if (!expand) {
        setexpand(true)
    } else {
        setexpand(false)
    }

}

useEffect(() => {
    let SumOfValues = 0
    for (let index = 0; index <= AreaResults.length; index++) {
        let scoreValue = AreaResults[index]?.main_metric?.value || 0

        SumOfValues += scoreValue
    }
    let ratio = parseInt(SumOfValues / AreaResults.length)
    setvalue(ratio)
}, [name])


return (
    <div className='singleAlgoResult'>
        <style jsx>
            {`
            .scoreline{
                width:${value}%;
            }
            `}
        </style>

        <div className="algoName"> <div className='name'> <div className='button' onClick={MatricsHandler}> + </div> {name}</div> <span className={`${ScorePosition(value)} tag`}>{ScorePosition(value)} {value}</span></div>
        <div className={`scoreline ${ScorePosition(value)}`}></div>
        <div className={`submatrics ${expand ? "show" : ""}`}>
            {AreaResults.map((result, i) => {
                return (
                    <>
                        <div className='matric' key={i}>{result?.area_name} <span>{result?.main_metric.value}</span></div>
                        <Mask key={i * 5} algo_tech_name={algo_tech_name} imageData={imageData} />

                    </>
                )
            })}
        </div>

    </div>
)
}
