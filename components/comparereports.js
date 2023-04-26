import React from 'react'
import { useState } from 'react'
import { Score } from './Score'

export const CompareReports = ({ Results }) => {


  const [FirstSelectedResult, setFirstSelectedResult] = useState({})
  const [SecondSelectedResult, setSecondSelectedResult] = useState({})
  const [ShowCompareResults, setShowCompareResults] = useState(false)



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
    <div className='singleReport'>
      {!ShowCompareResults && 
        <>
          <div className="heading">Report History</div>
          <div className="historyWrapper">
            {Results.map((result, i) => {
              return (
                <div className={`resultHistory ${FirstSelectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setFirstSelectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
              )
            })}
          </div>

          {!ShowCompareResults &&
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
                {Results.filter((result)=> isDatelater(result.createdAt,FirstSelectedResult.createdAt)).length == 0 ? <div>Selected Date must be earlier than compare Date</div>:""}
                
              </div>
            </>

          }

          <button onClick={() => {
            if(!isDatelater(SecondSelectedResult.createdAt,FirstSelectedResult.createdAt)){
              setSecondSelectedResult({})
              setShowCompareResults(false)
              // alert("date must be greater than")
              return
            }
            setShowCompareResults(true)


           }}>View Report</button>
        </>
      }

      
    </div>

    {ShowCompareResults && 
      <div className='CompareReports'>
         <div className="singleReport">
      
          </div>

      </div>
      }
    </>

  )
}
