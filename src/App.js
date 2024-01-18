import "./App.css"
import Circles from "./Circles"
import data from './gapminder_data.json'
import Slider from "react-input-slider"
import { scaleOrdinal, schemeTableau10 } from 'd3'
import { useState } from "react"
import Legend from "./Legend"

const width = 960
const height = 500

function App() {
  const [year, setYear] = useState({ x: 1957})
  const [selectedContinent, setSelectedContinent] = useState("all")
  const continents = [...new Set(data.map(d => d.continent))]

  const color = scaleOrdinal().domain(continents).range(schemeTableau10)

  function handleLegendClick(continent) {
    setSelectedContinent((prevState) => 
      prevState === continent ? "all" : continent
      )


      console.log(continent)
  }

  return (
    <div className="App">
      <h1 className="header">Gapminder Chart</h1>
      <div className="slider">
        <p>{year.x}</p>
        <Slider 
          axis="x" 
          xmin={1957} 
          xmax={2007} 
          x={year.x} 
          xstep={5}
          onChange={({x}) => setYear((state) => ({...state, x}))}
        />
        <Legend 
          labels={continents} 
          colorScale={color} 
          continent={selectedContinent} 
          setContinent={handleLegendClick}
        />
      </div>

      <div className="chart">
        <Circles 
          data={data} 
          year={year.x} 
          width={width} 
          height={height} 
          colorScale={color} 
          selectedContinent={selectedContinent}
        />
      </div>
    </div>
  )
}

export default App
