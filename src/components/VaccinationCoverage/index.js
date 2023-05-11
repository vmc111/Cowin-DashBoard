// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const BarComponent = props => {
  const {data} = props

  const DataFormatter = number => `${number.toString()} K`

  return (
    <div className="container">
      <h1 className="text">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            iconType="rect"
            iconSize={30}
            wrapperStyle={{
              padding: 40,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="10%" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="10%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarComponent
