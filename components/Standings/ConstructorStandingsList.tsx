import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ConstructorType } from '../../services/constructorService'
import { ConstructorStanding } from '../../services/standingService'
import { MappedType } from '../../types'
import { constructorColors } from '../../utils'
import { constructorLogos } from '../../utils/constructorLogos'
import styles from './StandingsList.module.scss'

type ConstructorStandingsListProps = {
  standings: ConstructorStanding[]
  constructors: MappedType<ConstructorType>
}
export const ConstructorStandingsList = ({ standings, constructors }: ConstructorStandingsListProps) => {
  const [leaderPoints, setLeaderPoints] = useState(0)

  useEffect(() => {
    if (standings[0]) {
      setLeaderPoints(standings[0].points)
    }
  }, [standings])

  return (
    <div className={styles.standingsList}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr style={{ width: '100%', textAlign: 'left' }}>
            <th></th>
            <th className={styles.driverNameCell}>Team</th>
            <th>Points</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((value, index) => (
            <ListItem key={index} standing={value} leaderPoints={leaderPoints ?? 0} constructorMeta={constructors.map[value.constructorId]} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ListItem = ({ standing, leaderPoints, constructorMeta }: { standing: ConstructorStanding; leaderPoints: number; constructorMeta: ConstructorType }) => {
  if (!constructorMeta) {
    return null
  }
  return (
    <tr>
      <td
        className={styles.driverNumberCell}
        style={{
          background: constructorColors[constructorMeta.constructorId] || 'none',
        }}
      >
        <Image alt='' width={40} height={40} objectFit={'contain'} src={`/f1logos/${constructorLogos[constructorMeta.constructorRef]}`} />
      </td>
      <td className={styles.driverNameCell}>
        <a href={constructorMeta.url}>{`${constructorMeta.name}`}</a>
      </td>
      <td>{standing.points}</td>
      <td>-{leaderPoints - standing.points}</td>
    </tr>
  )
}
