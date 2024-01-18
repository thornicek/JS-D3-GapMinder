import { select } from "d3"
import { useEffect, useRef } from "react"
import { drawChart } from "./drawChart"
import data from "./gapminder_data.json"
import "./index.css"

// https://observablehq.com/@uwdata/introduction-to-d3-part-2

const margin = { left: 50, right: 20, top: 30, bottom: 50 }

function Circles({ width, height, data, year, colorScale, selectedContinent }) {
  const chartData = data.filter((d) => d.year === year)

  const svgRef = useRef()

  useEffect(() => {
    const SVG = select(svgRef.current)
    drawChart(
      SVG,
      chartData,
      data,
      height,
      width,
      margin,
      colorScale,
      selectedContinent
    )
  }, [chartData, data, height, width, colorScale, selectedContinent])
  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
    <line stroke="lightgrey" strokeDasharray={"10 2"} className="life-avg" />
    <line stroke="lightgrey" strokeDasharray={"10 2"} className="gdp-avg" />
  
    {chartData.map(d => (
      <circle key={d.country + d.year} fill="#FFF" />
    ))}
    <text 
      fontSize="48px" 
      x ={width - margin.right - 150}
      y={height - margin.bottom - 50}  
    >
      {year}
    </text>
    <text y={height - 20} x={20} fill="grey">
      GDP per Capita
    </text>
    <text
      transform={`translate(${20}, ${margin.top + 100}) rotate(-90)`}
    >
      Life Expectancy
    </text>
  </svg>
}

export default Circles
