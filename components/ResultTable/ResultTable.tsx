import { results } from '@prisma/client'
import Image from 'next/image'
import { ConstructorType } from '../../services/constructorService'
import { Driver } from '../../services/driverService'
import { MappedType } from '../../types'
import { constructorColors } from '../../utils'
import { constructorLogos } from '../../utils/constructorLogos'

type ResultTableProps = {
  drivers: MappedType<Driver>
  constructors: MappedType<ConstructorType>
  results: results[]
}

export const ResultTable = ({ drivers, constructors, results }: ResultTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '30px' }}></th>
          <th>Driver</th>
          <th>Points</th>
          <th>Fastest lap</th>
          <td>Grid position</td>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => {
          const driver = drivers.map[result.driverId]
          const constructorMeta = constructors.map[result.constructorId]

          const positionDiff = result.position ? result.grid - result.position : result.grid - results.length
          return (
            <tr key={result.resultId}>
              <td
                style={{
                  background: constructorColors[driver.constructorId] || 'none',
                  textAlign: 'center',
                }}
              >
                <Image alt='' objectFit={'contain'} height={20} width={20} src={`/f1logos/${constructorLogos[constructorMeta.constructorRef]}`} />
              </td>
              <td>{`${driver.forename} ${driver.surname}`}</td>
              <td
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                {result.position ? result.points : 'DNF'}
              </td>
              <td
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                {result.fastestLapTime}
              </td>
              <td
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                {result.grid} (
                <span
                  style={{
                    color: positionDiff === 0 ? 'gray' : positionDiff < 0 ? 'white' : 'white',
                  }}
                >
                  {positionDiff === 0 ? '-' : positionDiff > 0 ? `+${positionDiff}` : positionDiff}
                </span>
                )
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
