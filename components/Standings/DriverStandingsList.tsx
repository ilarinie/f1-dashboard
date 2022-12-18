import React, { useEffect, useState } from 'react'
import styles from './StandingsList.module.scss'
import { constructorColors } from '../../utils'
import { Driver } from '../../services/driverService'
import { MappedType } from '../../types'
import { DriverStanding } from '../../services/standingService'
import { ConstructorType } from '../../services/constructorService'
import Image from 'next/image'
import { constructorLogos } from '../../utils/constructorLogos'

type DriverStandingsList = {
  standings: DriverStanding[]
  drivers: MappedType<Driver>
  constructors: MappedType<ConstructorType>
  setHoveredDriverId: (driverId: string) => void
}

export const DriverStandingsList = ({ standings, drivers, constructors }: DriverStandingsList) => {
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
            <th className={styles.driverNameCell}>Driver</th>
            <th>Points</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((value, index) => (
            <ListItem key={index} standing={value} leaderPoints={leaderPoints ?? 0} driver={drivers.map[value.driverId]} constructorMeta={constructors.map[drivers.map[value.driverId].constructorId]} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ListItem = ({ standing, leaderPoints, driver, constructorMeta }: { standing: DriverStanding; leaderPoints: number; driver: Driver; constructorMeta: ConstructorType }) => {
  if (!driver) {
    return null
  }
  return (
    <tr>
      <td
        className={styles.driverNumberCell}
        style={{
          background: constructorColors[driver.constructorId] || 'white',
        }}
      >
        <Image height={30} width={30} objectFit={'contain'} src={`/f1logos/${constructorLogos[constructorMeta.constructorRef]}`} alt='' />
      </td>
      <td className={styles.driverNameCell}>
        <a href={driver.url}>{`${driver.forename} ${driver.surname}`}</a>
      </td>
      <td>{standing.points}</td>
      <td>-{leaderPoints - standing.points}</td>
    </tr>
  )
}
