import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import './chartjsbar.css'

Chart.Tooltip.positioners.custom = function(elements, eventPosition) {
  /** @type {Chart.Tooltip} */
  const tooltip = this
  return {
      x: eventPosition.x,
      y: eventPosition.y
  }
}
const ChartjsBarChart = ({ tooltipShadow, gridLineColor, labelColor, primaryColorShade, filteredArr }) => {
  // filter users on teams tags
  // const filtered = []
  // for (const user in totalUsers) {
  //   const el_user = totalUsers[user]
  //   const teams = el_user.teams
  //   for (const team in teams) {
  //       for (const filter in Teams) {
  //           if (teams[team].id === Teams[filter].value) {
  //             if (el_user.score !== null) {
  //               const fullName = `${el_user.firstName} ${el_user.lastName}`
  //               const obj = { id: el_user.id, fullName, email: el_user.email, score: el_user.score }
  //               filtered.push(obj)
  //             }
  //           }
  //       }
  //   }
  // }
  // Get unique data from above array
  // const uniqueArr = filtered.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.email === v.email)) === i)

  // sort array from highest score to lowest
  const sortedArr = filteredArr.sort(function (a, b) {
    return b.score - a.score
  })

  const scores = []
  sortedArr.map(el => {
    scores.push(el.score)
  })
  const labels = []
  sortedArr.map(el => {
    const fullName = [el.firstName, el.lastName]
    labels.push(fullName)
  })
  const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      tooltips: {
        // Updated default tooltip UI
        position : 'custom',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: 'rgb(0,0,0, 0.75)',
        titleFontColor: '#fff',
        bodyFontColor: '#fff',
        callbacks: {
          title:(tooltipItem, data) => {
            const name = data.labels[tooltipItem[0].index]
            const namet = name.toString()
            const names = namet.replaceAll(',', ' ')
              return names
          },
          // beforeLabel:(tooltipItem, data) => {
          //   return `$ ${data.labels[tooltipItem[0]]}`
          // }
          label: (tooltipItem, data) => {
            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            value = value.toString()
            value = value.split(/(?=(?:...)*$)/)
            // Convert the array to a string and format the output
            value = value.join(',')
            return  ` $ ${value}`
          }
      }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: gridLineColor,
              zeroLineColor: gridLineColor
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              fontColor: labelColor
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: gridLineColor,
              zeroLineColor: gridLineColor
            },
            ticks: {
              // stepSize: (scores[0] < 100) ? 10 : (scores[0] < 1000) ? 100 : (scores[0] < 5000) ? 1000 : (scores[0] < 10000) ? 4000 : "",
              stepSize: Math.round(scores[0] / 5),
              min: 0,
              max: scores[0] + Math.round(scores[0] / 5),
              fontColor: labelColor,
              userCallback: (value, index, values) => {
                // Convert the number to a string and splite the string every 3 charaters from the end
                value = value.toString()
                value = value.split(/(?=(?:...)*$)/)
                // Convert the array to a string and format the output
                value = value.join(',')
                return `$ ${value}`
               }
            }
          }
        ]
      }
    },
    data = {
      labels,
      datasets: [
        {
          data: scores,
          backgroundColor: primaryColorShade,
          borderColor: 'transparent',
          barThickness: 25
        }
      ]
    }

  return (
    <Card>
      <CardBody className='wraper' >
        <div className='inside-wraper'>
          <Bar data={data} options={options} height={215}  />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsBarChart
