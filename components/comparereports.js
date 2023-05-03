import React from 'react'
import { useState,useEffect } from 'react'
import { Score } from './Score'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AreasScores } from './AreasScores';
export const CompareReports = ({ Results }) => {


  const [FirstSelectedResult, setFirstSelectedResult] = useState({})
  const [SecondSelectedResult, setSecondSelectedResult] = useState({})
  const [ShowCompareResults, setShowCompareResults] = useState(false)
  const [FirstImageData, setFirstImageData] = useState('');
  const [SecondImageData, setSecondImageData] = useState('');
  const [Loading, setLoading] = useState(false)


  const techNames = ['translucency_score', 'uniformness_score', 'hydration_score', 'lines_score', 'redness_score', 'ita_score', 'image_quality_score', 'eye_area_condition',
    'acne_score', 'pigmentation_score', 'Pores_score', 'perceived_age', 'eye_age']

  const FaceAreas = ["face","forehead","nose","right_cheek","left_cheek","chin"]

  const [FirstReportData, setFirstReportData] = useState([
    // {name:"face",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[0]),techValues:[...techNames.map(techName=>ExtractTechValuess(FirstSelectedResult,FaceAreas[0],techName))].filter(el=>el!=undefined)},
    {name:"forehead",value:"",techValues:[]},
    {name:"nose",value:"",techValues:[]},
    {name:"left cheek",value:"",techValues:[]},
    {name:"right cheek",value:"",techValues:[]},
    {name:"chin",value:"",techValues:[]},

  ])
  

useEffect(() => {
  // ExtractAreaValue(Results[0],"chin","translucency_score")

}, [])

function ExtractAreaValue(Result,areaName){
  let results = Result.maskedData[0]
  let value = 0
  results = results.filter((el) => el.result?.area_results != undefined && el.result?.area_results.length != 0)
  results = results.map(el=> el.result?.area_results?.find(el=>el.area_name === areaName)).filter((el=> el!=undefined))
  results.map((el)=> {value += el?.main_metric?.value})
  // let result = results.find(el=>el.main_metric.tech_name === techName)
  console.log(parseInt(value/results.length))
  // if(result?.main_metric.name) return undefined
  return parseInt(value/results.length)
 
}


function ExtractTechValues(Result,areaName,techName){
  let results = Result.maskedData[0]
  results = results.filter((el) => el.result?.area_results != undefined && el.result?.area_results.length != 0)
  results = results.map(el=> el.result?.area_results?.find(el=>el.area_name === areaName)).filter((el=> el!=undefined))
  let result = results.find(el=>el.main_metric.tech_name === techName)
  console.log(result?.main_metric.name)
  if(!result?.main_metric.name || result?.main_metric?.name === "Image Quality Score") return undefined
  return {name:result?.main_metric.name,value:result?.main_metric?.value}
 
}


  // const FaceAreas = ["face","forehead","nose","right_cheek","left_cheek","chin"]
  // function ExtractTechValues(Result, techName) {
  //   // console.log(techName)
  //   let results = Result.maskedData[0]
  //   results = results.filter((el) => el.result?.area_results != undefined && el.result?.area_results.length != 0)
  //   let requiredResult = results.find(el => el.result.area_results[0]?.main_metric?.tech_name == techName)
  //   // let requiredResult = results.map(el=>el.result.area_results[0]?.main_metric?.tech_name )
  //   return requiredResult
  //   // console.log(requiredResult)

  // }



  function isRequired(score) {
    const notRequired = [
      "Image Quality Score",
    ];
    if (score == notRequired[0]) return false
    return true
  }

  function GetFullyear(date) {
    let dateobj = new Date(date)
    return `${dateobj.getFullYear()}/${dateobj.getMonth()+1}/${dateobj.getDate()}`
  }

  function extractTime(dateString) {
    const date = new Date(dateString);
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${hour}:${minute}:${second}`;
  }

  function isDatelater(a, b) {
    return new Date(a) > new Date(b);
  }




  return (
    <>
      {!ShowCompareResults &&

        <div className='singleReport'>
          <>
            <div className="heading">举报历史</div>
            <div className="historyWrapper">
              {Results.map((result, i) => {
                return (
                  <div className={`resultHistory ${FirstSelectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setFirstSelectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
                )
              })}
            </div>

            <>
              <div className="heading">与之比较</div>
              <div className="historyWrapper">
                {Results.map((result, i) => {
                  if (isDatelater(result.createdAt, FirstSelectedResult.createdAt)) {

                    return (
                      <>
                        <div className={`resultHistory ${SecondSelectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setSecondSelectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
                      </>
                    )
                  }

                })}
                {Results.filter((result) => isDatelater(result.createdAt, FirstSelectedResult.createdAt)).length == 0 ? <div>所选日期必须早于比较日期</div> : ""}

              </div>
            </>


            <button onClick={() => {
              setLoading(true)
              if (!isDatelater(SecondSelectedResult.createdAt, FirstSelectedResult.createdAt)) {
                setSecondSelectedResult({})
                setShowCompareResults(false)
                setLoading(false)

                // alert("date must be greater than")
                return
              }

              fetch(FirstSelectedResult.imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    setFirstImageData(base64data);
                    setFirstSelectedResult({ 
                      email: FirstSelectedResult.email, 
                      createdAt: FirstSelectedResult.createdAt, 
                      techs: [
                      {name:"face",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[0]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[0],techName))].filter(el=>el!=undefined)},
                      {name:"forehead",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[1]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[1],techName))].filter(el=>el!=undefined)},
                      {name:"nose",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[2]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[2],techName))].filter(el=>el!=undefined)},
                      {name:"left cheek",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[3]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[3],techName))].filter(el=>el!=undefined)},
                      {name:"right cheek",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[4]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[4],techName))].filter(el=>el!=undefined)},
                      {name:"chin",value:ExtractAreaValue(FirstSelectedResult,FaceAreas[5]),techValues:[...techNames.map(techName=>ExtractTechValues(FirstSelectedResult,FaceAreas[5],techName))].filter(el=>el!=undefined)},
                    ] })

                    // second image
                    fetch(SecondSelectedResult.imageUrl)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {
                          const base64data = reader.result;
                          setSecondImageData(base64data);
                          setSecondSelectedResult({ email: SecondSelectedResult.email, createdAt: SecondSelectedResult.createdAt, techs: [...techNames.map((techname) => ExtractTechValues(SecondSelectedResult, techname))] })
                          setSecondSelectedResult({ 
                            email: SecondSelectedResult.email, 
                            createdAt: SecondSelectedResult.createdAt, 
                            techs: [
                            {name:"face",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[0]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[0],techName))].filter(el=>el!=undefined)},
                            {name:"forehead",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[1]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[1],techName))].filter(el=>el!=undefined)},
                            {name:"nose",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[2]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[2],techName))].filter(el=>el!=undefined)},
                            {name:"left cheek",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[3]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[3],techName))].filter(el=>el!=undefined)},
                            {name:"right cheek",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[4]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[4],techName))].filter(el=>el!=undefined)},
                            {name:"chin",value:ExtractAreaValue(SecondSelectedResult,FaceAreas[5]),techValues:[...techNames.map(techName=>ExtractTechValues(SecondSelectedResult,FaceAreas[5],techName))].filter(el=>el!=undefined)},
                          ] })

                          setShowCompareResults(true)
                          setLoading(false)

                        };
                      });

                  };
                });

            }}>{Loading ? "..." : "查看报告"}</button>
          </>


        </div>
      }

      {ShowCompareResults &&
        <div className='CompareReports'>
          {Object.keys(FirstSelectedResult).length != 0 &&
            <div className='ResultBox'>
              <h3 className='date'>{FirstSelectedResult.email} {GetFullyear(FirstSelectedResult.createdAt)} {extractTime(FirstSelectedResult.createdAt)}</h3>


              <div className="scoreWrapper">

                {FirstSelectedResult.techs.map((result, i) => {
                  
                  return(
                    <>
                    <AreasScores key={i} imageData={FirstImageData} algo_tech_name={""} name={result.name} nameValue={result.value} techValues={result?.techValues} currentResult={false} previousResult={FirstSelectedResult.techs[i]} previousDate={FirstSelectedResult.createdAt} currentDate={SecondSelectedResult.createdAt}/>
                    
                    </>
                  )

                })}

                

                
              </div>

            </div>
          }

          {Object.keys(SecondSelectedResult).length != 0 &&
            <div className='ResultBox'>
              <h3 className='date'>{SecondSelectedResult.email} {GetFullyear(SecondSelectedResult.createdAt)} {extractTime(SecondSelectedResult.createdAt)}</h3>

              <div className="scoreWrapper">

                {SecondSelectedResult.techs.map((result, i) => {
                  
                    
                  return(
                    <>
                    <AreasScores key={i} imageData={SecondImageData} algo_tech_name={""} name={result.name} nameValue={result.value} techValues={result?.techValues} currentResult={true} previousResult={FirstSelectedResult.techs[i]} previousDate={FirstSelectedResult.createdAt} currentDate={SecondSelectedResult.createdAt} />
                    </>
                  )
                  
                })}
              </div>

            </div>
          }

        </div>

      }
      {ShowCompareResults &&
        <button className='backTocompare' onClick={() => {
          setShowCompareResults(false)

        }}>返回报告</button>
      }
    </>

  )
}
