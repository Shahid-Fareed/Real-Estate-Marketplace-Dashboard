import React from "react"
import ReactApexChart from "react-apexcharts"

const LineChart = ({ arryData }) => {
  const options = {
    chart: {
      id: "line-chart",
      Animation: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 2000
        }
      }
    },
    xaxis: {
      categories: arryData.map(item => item._id)
    },
    yaxis: {
      title: {
        text: "Total Properties (Last 30 Days)"
      }
    },
    colors: ["#6c5c8d"]
  }

  const series = [
    {
      name: "Total Properties",
      data: arryData.map(item => item.count)
    }
  ]

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  )
}

export default LineChart
