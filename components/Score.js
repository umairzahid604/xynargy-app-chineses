import React from 'react'
import { useState, useEffect } from 'react'
import { Mask } from './Mask'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Score = ({ name, AreaResults, algo_tech_name, imageData }) => {
    const [value, setvalue] = useState(0)
    const [expand, setexpand] = useState(false)
    const [ShowMatrics, setShowMatrics] = useState(false)
    const [Matrics, setMatrics] = useState({})
    
    function ScoreColor(value) {
        if (value >= 90) {
            return "#28c401"
        }

        if (value >= 80) {
            return "#48ff00"
        }


        if (value >= 65) {
            return "#8bff48"
        }


        if (value >= 50) {
            return "#fffb00"
        }

        if (value >= 30) {
            return "#bdba09"
        }

        if (value >= 0) {
            return "#ff0000"
        }
    }


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
        <div className='singleAlgoResult' onClick={(e) => {
            // console.log()
            if (!e.target.classList.contains("matric")) {
                setShowMatrics(false)
            }
        }}>
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
                <div className='matricWrapper'>

                    {AreaResults.filter((result) => result?.area_name !== "left_eye_area" && result?.area_name !== 'right_eye_area' && result?.area_name !== "left_eye_corner" && result?.area_name !== 'right_eye_corner').map((result, i) => {
                        return (
                            <>
                                <div className={`matric ${result?.area_name}`} key={i} onClick={(e) => {
                                    console.log(e.target)
                                    setShowMatrics(true)

                                    // else {
                                    //     setShowMatrics(true)
                                    // }
                                    setMatrics({ name: result?.area_name, value: result?.main_metric.value, algoName: name, pathColor: `${ScoreColor(result?.main_metric.value)}`, textColor: `${ScoreColor(result?.main_metric.value)}`, condition: ScorePosition(result?.main_metric.value) })
                                }} onMouseEnter={() => {
                                    setMatrics({
                                        name: result?.area_name, value: result?.main_metric.value, algoName: name, pathColor: `${ScoreColor(result?.main_metric.value)}`, textColor: `${ScoreColor(result?.main_metric.value)}`, condition: ScorePosition(result?.main_metric.value)
                                    })
                                    setShowMatrics(true)


                                }}>
                                    {/* <span>{result?.main_metric.value}</span> */}

                                    <span className={`dot ${ScorePosition(result?.main_metric.value)}`}></span>{result?.area_name}
                                </div>

                            </>
                        )
                    })}

                </div>
                <div className={`MatricsWrapper ${ShowMatrics ? "showMatricsWrapper" : ""}`} >
                    <div className="area">{Matrics.name}</div>
                    <div className="line"></div>
                    <div className="algorithm">{Matrics.algoName}</div>
                    <div className="line"></div>
                    <div className="condition">OverAll Condition {Matrics.condition}</div>
                    <div className="line"></div>
                    <div className="circleWrapper">

                        <div className="circle" style={{ width: 50, height: 50 }}>
                            <CircularProgressbar styles={buildStyles({ pathColor: Matrics.pathColor, textColor: Matrics.textColor, textSize: '23px', })} value={Matrics.value} text={`${Matrics.value}%`} />
                        </div>
                    </div>
                </div>
                <div className='mask'>
                    <Mask algo_tech_name={algo_tech_name} imageData={imageData} />
                </div>
            </div>

        </div>
    )
}
