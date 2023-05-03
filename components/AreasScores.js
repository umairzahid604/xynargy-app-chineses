import React from 'react'
import { useState, useEffect } from 'react'
// import { FaceMask } from './masks/FaceMask'
import { FaceMask } from './masks/FaceMask';
import { ForeheadMask } from './masks/ForeheadMask';
import { NoseMask } from './masks/NoseMask';
import { RightCheekMask } from './masks/RightCheek';
import { LeftCheekMask } from './masks/LeftCheek';
import { ChinMask } from './masks/Chin';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const AreasScores = ({ name, nameValue, techValues, algo_tech_name, imageData, currentResult, previousResult,previousDate,currentDate }) => {
    // const [value, setvalue] = useState(0)
    const [expand, setexpand] = useState(false)
    const [ShowMatrics, setShowMatrics] = useState(false)
    const [Matrics, setMatrics] = useState({})
    const [TechCompare, setTechCompare] = useState("")
    

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

    function Improved(previous,current){
        if(current-previous < 0){
            return `- 受损的 ${current-previous}`
        }
        else if(current-previous >= 0){
            return `- 改进 +${current-previous}`
        }

    }



    return (
        <div className='singleAlgoResult' onClick={(e) => {
            // console.log()
            if (!e.target.classList.contains("techBox")) {
                setShowMatrics(false)
            }
        }}>
            <style jsx>
                {`
            .scoreline{
                width:${nameValue}%;
            }
            `}
            </style>

            <div className="algoName"> <div className='name'> <div className='button' onClick={MatricsHandler}> + </div> {ChineseAreas(name)}</div> <span className={`${ScorePosition(nameValue)} tag`}>{ChineseTag(ScorePosition(nameValue))} {nameValue} {currentResult? Improved(previousResult.value,nameValue):""} </span></div>
            <div className={`scoreline ${ScorePosition(nameValue)}`}></div>
            <div className={`submatrics ${expand ? "show" : ""}`}>
                <div className='matricWrapper'>

                    <Swiper
                        spaceBetween={5}
                        slidesPerView={2}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >

                        {techValues.map((tech) => {
                            return (
                                <SwiperSlide>
                                    <div className="techBox"  onClick={(e) => {
                                    console.log(e.target)
                                    setShowMatrics(true)
                                    console.log("techname" + name)
                                    setTechCompare(Improved(previousResult.techValues.find((el)=>el.name === tech.name).value,tech.value))
                                    
                                    setMatrics({ name: name, techName: tech.name,value:tech.value, pathColor: `${ScoreColor(tech.value)}`, textColor: `${ScoreColor(tech.value)}`, condition: ScorePosition(tech.value) })
                                }}>{TranslateToChinese(tech.name)}</div>
                                </SwiperSlide>

                            )

                        })}

                    </Swiper>



                </div>
                <div className={`MatricsWrapper ${ShowMatrics ? "showMatricsWrapper" : ""}`} >
                    <div className="area">{ChineseAreas(Matrics.name)}</div>
                    <div className="line"></div>
                    <div className="algorithm">{TranslateToChinese(Matrics.techName)}</div>
                    <div className="line"></div>
                    <div className="condition">整体状况 {ChineseTag(Matrics.condition)}</div>
                    <div className="line"></div>
                    {currentResult &&
                    <>
                    <div className="condition">{TechCompare}</div>
                    <div className="line"></div>
                    <div className="condition">之间 {new Date(previousDate).getDate()}/{new Date(previousDate).getMonth()} 到 {new Date(currentDate).getDate()}/{new Date(currentDate).getMonth()} </div>
                    <div className="line"></div>
                    </>
                    }
                    <div className="circleWrapper">
                        <div className="circle" style={{ width: 50, height: 50 }}>
                            <CircularProgressbar styles={buildStyles({ pathColor: Matrics.pathColor, textColor: Matrics.textColor, textSize: '23px', })} value={Matrics.value} text={`${Matrics.value}%`} />
                        </div>
                    </div>
                </div>

                <div className='mask'>
                    {name == "face" &&
                        <FaceMask algo_tech_name={algo_tech_name} imageData={imageData} />
                    }

                    {name == "forehead" &&
                        <ForeheadMask algo_tech_name={algo_tech_name} imageData={imageData} />
                    }

                    {name === "nose" &&
                        <NoseMask algo_tech_name={algo_tech_name} imageData={imageData} />
                    }

                    {name === "left cheek" &&
                        <LeftCheekMask algo_tech_name={algo_tech_name} imageData={imageData} />
                    }

                    {name === "right cheek" &&
                        <RightCheekMask algo_tech_name={algo_tech_name} imageData={imageData} />

                    }
                    {name == "chin" &&
                        <ChinMask algo_tech_name={algo_tech_name} imageData={imageData} />
                    }


                    {/* <ChinMask algo_tech_name={algo_tech_name} imageData={imageData} /> */}
                    {/* <ForeheadMask algo_tech_name={algo_tech_name} imageData={imageData} /> */}
                    {/* <RightCheekMask algo_tech_name={algo_tech_name} imageData={imageData} /> */}
                    {/* <NoseMask algo_tech_name={algo_tech_name} imageData={imageData} /> */}

                    {/* <FaceMask algo_tech_name={algo_tech_name} imageData={imageData} /> */}

                </div>

            </div>

        </div>
    )
}










const Names = ["Translucency score","Uniformness Score","Hydration Score","Redness Score","ITA score",
"Eye Area Condition","Acne score","Pigmentation score","Pores Score","Perceived Age","Eye Age","Lines Score"]


function TranslateToChinese(text){
  console.log(text)
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

  if(text === Names[8]){
    return "毛孔评分"
  } 

  if(text === Names[9]){
    return "感知年龄"
  } 

  if(text === Names[10]){
    return "眼龄"
  } 

  if(text === Names[11]){
    return "线条分数"
  } 

}


function ChineseTag(tag){
    if(tag === "Excellent"){
        return "出色的"
    }

    if(tag === "Great"){
        return "伟大的"

    }

    if(tag === "Good"){
        return "好的"
        
    }
    if(tag === "Average"){
        return "平均的"
        
    }
    if(tag === "Rather Bad"){
        return "相当糟糕"

    }
    if(tag === "Bad"){
        return "坏的"

    }

}

const Areas = ["chin","face","forehead","left cheek","right cheek","nose","forehead_n_bridge"]

function ChineseAreas(area){
    if(area === Areas[0]){
        return "下巴"
    }

    if(area === Areas[1]){
        return "脸"
    }
    if(area === Areas[2]){
        return "前额"
    }
    if(area === Areas[3]){
        return "左脸颊"
    }
    if(area === Areas[4]){
        return "右脸颊"
    }
    if(area === Areas[5]){
        return "鼻子"
    }
    if(area === Areas[6]){
        return "额头和鼻梁"
    }

}