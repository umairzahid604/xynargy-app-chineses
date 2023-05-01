import React from 'react'
import { useState } from 'react'
import { Score } from './Score'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const CompareReports = ({ Results }) => {


  const [FirstSelectedResult, setFirstSelectedResult] = useState({})
  const [SecondSelectedResult, setSecondSelectedResult] = useState({})
  const [ShowCompareResults, setShowCompareResults] = useState(false)
  const [FirstImageData, setFirstImageData] = useState('');
  const [SecondImageData, setSecondImageData] = useState('');
  const [Loading, setLoading] = useState(false)


  const techNames = ['translucency_score', 'uniformness_score', 'hydration_score', 'lines_score', 'redness_score', 'ita_score', 'image_quality_score', 'eye_area_condition',
    'acne_score', 'pigmentation_score', 'Pores_score', 'perceived_age', 'eye_age']


  function ExtractTechValues(Result, techName) {
    console.log(techName)
    let results = Result.maskedData[0]
    results = results.filter((el) => el.result?.area_results != undefined && el.result?.area_results.length != 0)
    let requiredResult = results.find(el => el.result.area_results[0]?.main_metric?.tech_name == techName)
    // let requiredResult = results.map(el=>el.result.area_results[0]?.main_metric?.tech_name )
    return requiredResult
    // console.log(requiredResult)

  }



  function isRequired(score) {
    const notRequired = [
      "Image Quality Score",
    ];
    if (score == notRequired[0]) return false
    return true
  }

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

  function isDatelater(a, b) {
    return new Date(a) > new Date(b);
  }




  return (
    <>
      {!ShowCompareResults &&

        <div className='singleReport'>
          <>
            <div className="heading">Report History</div>
            <div className="historyWrapper">
              {Results.map((result, i) => {
                return (
                  <div className={`resultHistory ${FirstSelectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setFirstSelectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
                )
              })}
            </div>

            <>
              <div className="heading">Compare With</div>
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
                {Results.filter((result) => isDatelater(result.createdAt, FirstSelectedResult.createdAt)).length == 0 ? <div>Selected Date must be earlier than compare Date</div> : ""}

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
                    setFirstSelectedResult({ email: FirstSelectedResult.email, createdAt: FirstSelectedResult.createdAt, techs: [...techNames.map((techname) => ExtractTechValues(FirstSelectedResult, techname))] })

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


                          setShowCompareResults(true)
                          setLoading(false)

                        };
                      });

                  };
                });





            }}>{Loading ? "..." : "View Report"}</button>
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
                  if (result?.result?.area_results?.length != undefined && result?.result?.area_results?.length != 0) {

                    if (isRequired(result?.result?.area_results[0]?.main_metric?.name)) {
                      return (
                        <>
                          <Score key={i} imageData={FirstImageData} algo_tech_name={result?.result?.algorithm_tech_name} name={result?.result?.area_results[0]?.main_metric?.name} AreaResults={result?.result?.area_results} />

                        </>
                      )
                    }

                  }

                  //    
                })}
              </div>

            </div>
          }

          {Object.keys(SecondSelectedResult).length != 0 &&
            <div className='ResultBox'>
              <h3 className='date'>{SecondSelectedResult.email} {GetFullyear(SecondSelectedResult.createdAt)} {extractTime(SecondSelectedResult.createdAt)}</h3>

              <div className="scoreWrapper">

                {SecondSelectedResult.techs.map((result, i) => {
                  if (result?.result?.area_results?.length != undefined && result?.result?.area_results?.length != 0) {

                    if (isRequired(result?.result?.area_results[0]?.main_metric?.name)) {
                      return (
                        <>
                          <Score key={i} imageData={SecondImageData} algo_tech_name={result?.result?.algorithm_tech_name} name={result?.result?.area_results[0]?.main_metric?.name} AreaResults={result?.result?.area_results} />

                        </>
                      )
                    }

                  }

                  //    
                })}
              </div>

            </div>
          }

        </div>

      }
      {ShowCompareResults &&
        <button className='backTocompare' onClick={() => {
          setShowCompareResults(false)

        }}>Back to Reports</button>
      }
    </>

  )
}
