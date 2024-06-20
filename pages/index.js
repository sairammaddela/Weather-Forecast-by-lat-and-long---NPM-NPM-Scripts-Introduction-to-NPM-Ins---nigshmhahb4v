import { useEffect, useState } from "react";

export default function Home() {
  const [response,setresponse]=useState("");
  function submitHandler(e){
    e.preventDefault();
    // console.log(e.currentTarget[0].value);
    
      fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${e.currentTarget[0].value}&lon=${e.currentTarget[1].value}`).then(data=>{
        data.json().then(res=>{
          console.log(res);
          setresponse(res);
        })
      })
    
  }
  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form onSubmit={submitHandler}> 
        <label>Latitude<input className="latitude"/></label>
        <label>Longitude<input className="longitude"/></label>
        <button type="submit">Get Forecast</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {
              response?.properties?.timeseries?.map(val=>{
                return <tr><td>{new Date(val.time).toLocaleString([],{hour12:true})}</td><td>{val.data.instant.details.air_temperature}</td><td>{val.data.next_1_hours?.summary.symbol_code}</td></tr>
              })
            }
          </tbody>
        </table>
        
      </div>
    </>
  );
}
