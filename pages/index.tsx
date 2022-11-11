import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ConstructorStandingsList } from '../components/Standings/ConstructorStandingsList'
import { DriverStandingsList } from '../components/Standings/DriverStandingsList'
import { getConstructorsForSeason } from '../services/constructorService'
import { Driver, getDriversForSeason } from '../services/driverService'
import {
  getConstructorStandingsForSeason,
  getDriverStandingsForSeason,
} from '../services/standingService'
import styles from '../styles/Home.module.scss'
import { MappedType } from '../types'
import { makeSerializable } from '../utils/makeSerializable'

const Home: NextPage<PropsType> = (props) => {
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
        <div className={styles.belowChart}></div>
        <div className={styles.standings}>
          <DriverStandingsList
            constructors={props.constructors}
            standings={props.driverStandings}
            drivers={props.drivers}
            setHoveredDriverId={() => {}}
          />
        </div>
        <div className={styles.standings}>
          <ConstructorStandingsList
            standings={props.constructorStandings}
            constructors={props.constructors}
          />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const drivers = await getDriversForSeason(2022)
  const constructors = await getConstructorsForSeason(2022)
  const driverStandings = await getDriverStandingsForSeason(2022)
  const constructorStandings = await getConstructorStandingsForSeason(2022)
  return {
    props: {
      drivers: makeSerializable(drivers),
      driverStandings: makeSerializable(driverStandings),
      constructorStandings: makeSerializable(constructorStandings),
      constructors: makeSerializable(constructors),
    },
  }
}

type PropsType = Awaited<ReturnType<typeof getServerSideProps>>['props']

export default Home
