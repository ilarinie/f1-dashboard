import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { ConstructorStandingsList } from '../components/Standings/ConstructorStandingsList'
import { DriverStandingsList } from '../components/Standings/DriverStandingsList'
import { getConstructorsForSeason } from '../services/constructorService'
import { getDriversForSeason } from '../services/driverService'
import { getDriverStandingsForSeason, getConstructorStandingsForSeason } from '../services/standingService'
import { makeSerializable } from '../utils/makeSerializable'
import styles from '../styles/Home.module.scss'
import { getSeasonDetails } from '../services/seasonService'
import { SeasonDetails } from '../components/SeasonDetails/SeasonDetails'

const SeasonView: NextPage<PropsType> = (props) => {
  const [hoveredDriverId, setHoveredDriverId] = useState(null as null | string)

  return (
    <div className={styles.container}>
      <Head>
        <title>F1 Dashboard</title>
        <meta name='description' content='F1 Dashboard woo' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.chartArea}></div>
        <div className={styles.belowChart}>
          <SeasonDetails {...{ ...props }} />
        </div>
        <div className={styles.driverStandings}>
          <DriverStandingsList constructors={props.constructors} standings={props.driverStandings} drivers={props.drivers} setHoveredDriverId={() => {}} />
        </div>
        <div className={styles.constructorStandings}>
          <ConstructorStandingsList standings={props.constructorStandings} constructors={props.constructors} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const year = Number(context.params.year)
  const drivers = await getDriversForSeason(year)
  const constructors = await getConstructorsForSeason(year)
  const driverStandings = await getDriverStandingsForSeason(year)
  const constructorStandings = await getConstructorStandingsForSeason(year)
  const seasonDetails = await getSeasonDetails(year)
  return {
    props: { seasonDetails: makeSerializable(seasonDetails), drivers: makeSerializable(drivers), driverStandings: makeSerializable(driverStandings), constructorStandings: makeSerializable(constructorStandings), constructors: makeSerializable(constructors) },
  }
}

type PropsType = Awaited<ReturnType<typeof getServerSideProps>>['props']

export default SeasonView
