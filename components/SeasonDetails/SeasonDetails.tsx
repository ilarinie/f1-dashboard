import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns'
import Image from 'next/image'
import { ConstructorType } from '../../services/constructorService'
import { Driver } from '../../services/driverService'
import { SeasonDetailsType } from '../../services/seasonService'
import { MappedType } from '../../types'
import { constructorColors } from '../../utils'
import { constructorLogos } from '../../utils/constructorLogos'
import { NextRacePanel } from '../NextRacePanel/NextRacePanel'
import { ResultTable } from '../ResultTable/ResultTable'
import styles from './SeasonDetails.module.scss'

type SeasonDetailsProps = {
  seasonDetails: SeasonDetailsType
  drivers: MappedType<Driver>
  constructors: MappedType<ConstructorType>
}

export const SeasonDetails = ({ seasonDetails, constructors, drivers }: SeasonDetailsProps) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.headers}>
        <div className={styles.headerContainer}>
          <h3>Last Race</h3>
          <h3>{seasonDetails.lastRace?.name}</h3>
          <h3>{seasonDetails.lastRace?.circuit.name}</h3>
        </div>
        <div className={styles.headerContainer}></div>
        <div className={styles.headerContainer}>
          <h3>Next race</h3>
          <h3>{seasonDetails.nextRace?.name}</h3>
          <h3>{seasonDetails.nextRace?.circuit.name}</h3>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.lastRaceContainer}>
          <ResultTable results={seasonDetails.lastRaceResults} {...{ drivers, constructors }} />
        </div>
        <div className={styles.details}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Image alt='' height={100} width={200} src='/f1logos/f1.png' objectFit={'contain'} />
            <h3>
              Round {seasonDetails.currentRound} of {seasonDetails.totalRounds.length}
            </h3>
          </div>
        </div>
        <div className={styles.nextRaceContainer}>
          <NextRacePanel race={seasonDetails.nextRace} />
        </div>
      </div>
    </div>
  )
}
