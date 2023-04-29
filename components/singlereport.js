import React from 'react'
import { useState, useEffect } from 'react'
import { Score } from './Score'
export const SingleReport = ({ Results }) => {

    const [selectedResult, setselectedResult] = useState({})
    const [ViewResult, setViewResult] = useState({})

    
    const techNames = ['translucency_score', 'uniformness_score', 'hydration_score', 'lines_score', 'redness_score', 'ita_score', 'image_quality_score', 'eye_area_condition', 
    'acne_score', 'pigmentation_score', 'Pores_score', 'perceived_age', 'eye_age']

   function ExtractTechValues(Result,techName){
    console.log(techName)
    let results = Result.maskedData[0]
    results = results.filter((el)=>el.result?.area_results != undefined && el.result?.area_results.length != 0)
    let requiredResult = results.find(el=>el.result.area_results[0]?.main_metric?.tech_name == techName)
    // let requiredResult = results.map(el=>el.result.area_results[0]?.main_metric?.tech_name )
    return requiredResult
    // console.log(requiredResult)

    } 
   
//    useEffect(() => {
//      ExtractTechValues(techNames[4])
   
//    }, [])
   
    const [imageData, setImageData] = useState('');






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

    return (
        <div className='singleReport'>
            {Object.keys(ViewResult).length == 0 &&
                <>
                    <div className="heading">Report History</div>
                    <div className="historyWrapper">
                        {Results.map((result, i) => {
                            return (
                                <div className={`resultHistory ${selectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setselectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => {
                        fetch(selectedResult.imageUrl)
                            .then((response) => response.blob())
                            .then((blob) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(blob);
                                reader.onloadend = () => {
                                    const base64data = reader.result;
                                    setImageData(base64data);
                                    // setViewResult(selectedResult)
                                    setViewResult({email:selectedResult.email,createdAt:selectedResult.createdAt, techs:[...techNames.map((techname)=>ExtractTechValues(selectedResult,techname))]})
                                    console.log(ViewResult)

                                };
                            });
                    }}>View Report</button>
                </>
            }

            {Object.keys(ViewResult).length != 0 &&
                <div className='ResultBox'>
                    <h3 className='date'>{ViewResult.email} {GetFullyear(ViewResult.createdAt)} {extractTime(ViewResult.createdAt)}</h3>
                    {ViewResult.techs.map((result, i) => {
                        if (result?.result?.area_results?.length != undefined && result?.result?.area_results?.length != 0) {

                            if (isRequired(result?.result?.area_results[0]?.main_metric?.name)) {
                                return (
                                    <>
                                        <Score key={i} imageData={imageData} algo_tech_name={result?.result?.algorithm_tech_name} name={result?.result?.area_results[0]?.main_metric?.name} AreaResults={result?.result?.area_results} />

                                    </>
                                )
                            }

                        }

                        //    
                    })}
                    <button onClick={() => { setViewResult({}) }}>Back to Reports</button>

                </div>

            }

        </div>

    )
}
