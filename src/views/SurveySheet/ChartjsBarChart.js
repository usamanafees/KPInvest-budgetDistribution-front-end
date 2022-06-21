import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ChartjsBarChart = ({ gridLineColor, labelColor, primaryColorShade, allUsers, userData, Teams }) => {
  // filter users on teams tags
  const filtered = []
  for (const user in allUsers) {
      const el_user = allUsers[user]
      const teams = el_user.teams
      for (const team in teams) {
          for (const filter in Teams) {
              if (teams[team].id === Teams[filter].value) {
                if (el_user.score !== null) {
                  const fullName = `${el_user.firstName} ${el_user.lastName}`
                  const obj = { id: el_user.id, fullName, email: el_user.email, score: el_user.score }
                  filtered.push(obj)
                }
              }
          }
      }
  }
  // Get unique data from above array
  const uniqueArr = filtered.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.email === v.email)) === i)

  const sortedArr = uniqueArr.sort(function (a, b) {
      return b.score - a.score
  })

  const dataArr = []
  sortedArr.map(el => {
    dataArr.push(el.score)
  })
  const labels = []
  sortedArr.map(el => {
    labels.push(el.fullName)
  })
  
  // const labels = ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12', '17/12']
  // const dataArr = [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190]
  const myColors = []
  for (let index = 0; index < sortedArr.length; index++) {
    const element = sortedArr[index]
    if (element.id === userData.id) {
      myColors[index] = '#1dcc22'
    } else {
      myColors[index] = primaryColorShade
    }   
  }
 
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
        enabled: false
      },
      scales: {
        xAxes: [
          {
            display: false,
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
              stepSize: Math.round(dataArr[0] / 5),
              min: 0,
              max: dataArr[0] + Math.round(dataArr[0] / 5),
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
          data: dataArr,
          backgroundColor: myColors,
          borderColor: 'transparent',
          barThickness: 25
        }
      ]
    }

  return (
    <Card>
      <CardBody>
        <div style={{ height: '215px' }}>
          <Bar data={data} options={options} height={215} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsBarChart
