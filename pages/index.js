import Head from 'next/head'
import Image from 'next/image'
// import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { SingleReport } from '@/components/singlereport'
import { CompareReports } from '@/components/comparereports'
import { Graphs } from '@/components/graphs'




export default function Home() {
  const [Input, setInput] = useState("")
  const [fetchResults, setfetchResults] = useState(false)
  const [Results, setResults] = useState([])
  const [failed, setfailed] = useState(false)
  const [Mode, setMode] = useState("login")
  const [SelectedResult, setSelectedResult] = useState({})
  const [previousResult, setpreviousResult] = useState({})
  const [SelectedpreviousResult, setSelectedpreviousResult] = useState(null)

  const [newResult, setnewResult] = useState({})
  const [SelectednewResult, setSelectednewResult] = useState(null)



  function GetFullyear(date) {
    let dateobj = new Date(date)
    return `${dateobj.getFullYear()}-${dateobj.getMonth()}-${dateobj.getDate()}`
  }

  function ModeHandler(mode) {
    if (Results.length == 0) return
    setMode(mode)
  }



  useEffect(() => {
    if (fetchResults) {
      setfailed(false)
      fetch("./api/getResults",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: Input })
        }).then(data => data.json()).then(data => {
          if (data.status === 200) {
            setResults(data.Results)
            setMode("selectModes")
            setfetchResults(false)
            return
          }
          setfetchResults(false)
          setfailed(true)
        }
        )
    }

  }, [fetchResults])


  function MenuHandler() {
    if (Mode == "singleReport" || Mode == "compareReports" || Mode == "graphReports") {
      setMode("login")
    }

  }

  return (
    <div className="container">

      <h1 className='logo'>Xynargy Scan Reports</h1>
      {Results.length != 0 &&
        <div className="menu">
          <button onClick={MenuHandler}>Email</button>
          <button onClick={() => setMode("singleReport")}>Single Report</button>
          <button onClick={() => setMode("compareReports")}>Compare Reports</button>
          <button onClick={() => setMode("graphReports")}>Graphs</button>
        </div>
      }



      {Mode == "login" &&
        <div className="searchBox">

          {!failed ?
            <>
              {fetchResults ? (
                <h3>Finding Results.....</h3>
              ) : <h3>Please enter your email address to get reports</h3>
              }
            </> :
            <h3>Ooops! Couldn't find any results</h3>

          }

          <div className="actions">
            <input type="text" placeholder='Email Address' onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => { 
              setfailed(false)
              Input == "" ? "" : setfetchResults(true) 
          }}>Find Results</button>
          </div>
        </div>
      }


      {Mode == "selectModes" &&

        <div className="modes">
          {Results.length != 0 &&
            <>
              <button onClick={() => { ModeHandler("singleReport") }}>Single Report</button>
              <button onClick={() => { ModeHandler("compareReports") }}>Compare Reports</button>
              <button onClick={() => { ModeHandler("graphReports") }}>Graph Reports</button>

            </>
          }
        </div>
      }

      {Mode == "singleReport" &&
        <SingleReport Results={Results} />
      }
      {Mode == "compareReports" &&
        <CompareReports />
      }
      {Mode == "graphReports" &&
        <Graphs Results={Results} />
      }





    </div>



  )
}
