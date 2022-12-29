import { format } from 'date-fns'
import ReactCountryFlag from 'react-country-flag'
import { LabelProps, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DriverStandingChartData } from '../../services/cumulativeStandingsService'
import { Driver } from '../../services/driverService'
import { MappedType } from '../../types'
import { constructorColors } from '../../utils'

type DriverStandingChartProps = {
  standings: DriverStandingChartData
  drivers: MappedType<Driver>
  leaderPoints: number
}

const renderLines = (drivers: MappedType<Driver>) => {
  return drivers.ids.map((id) => <Line dot={false} key={id} type='linear' stroke={constructorColors[drivers.map[id].constructorId]} dataKey={id} />)
}

export const DriverStandingChart = ({ standings, drivers, leaderPoints }: DriverStandingChartProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={standings} width={400} height={400}>
        <XAxis
          {...{
            ticks: standings.map((s) => s.circuitCountryCode),
          }}
          tick={<CustomizedAxisTick />}
          interval={0}
          dataKey='raceName'
          tickLine={false}
        />
        <YAxis scale='linear' domain={[0, leaderPoints]} mirror tickLine={false} />
        {renderLines(drivers)}
        <Tooltip
          {...{
            formatter(points: number, driverId: number) {
              return `${drivers.map[driverId].code}: ${points}`
            },
            label: false,
            labelFormatter(label, payload) {
              return ''
            },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const CustomizedAxisTick = (props: LabelProps & { payload?: any }) => {
  const { x, y, stroke, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='end' fill='#666'>
        <ReactCountryFlag
          className='emojiFlag'
          countryCode='US'
          style={{
            fontSize: '2em',
            lineHeight: '2em',
          }}
          aria-label='United States'
        />
      </text>
    </g>
  )
}
