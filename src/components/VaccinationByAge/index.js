// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const PieByAge = props => {
  const {data} = props

  return (
    <div className="Pie-container">
      <h1 className="text">Vaccination by Age</h1>
      <ResponsiveContainer height={300} width={1000}>
        <PieChart>
          <Pie
            data={data}
            startAngle={0}
            endAngle={360}
            dataKey="count"
            cx="50%"
            cy="50%"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="45-60" fill=" #a3df9f" />
            <Cell name="above 60" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieByAge
