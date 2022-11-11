import type { NextApiRequest, NextApiResponse } from "next"

import { Driver, getDriversForSeason } from '../../services/driverService'
import { MappedType } from '../../types'

/**
 * 
 * @param req SELECT drivers.driverId as id, position, positionText, round, drivers.driverId, forename, surname, points FROM driverStandings
    RIGHT JOIN races ON races.raceId = driverStandings.raceId
		RIGHT JOIN drivers ON drivers.driverId = driverStandings.driverId
    WHERE races.round = (SELECT MAX(round) FROM races WHERE races.year = ${CURRENT_YEAR} AND races.date <= CURDATE()) AND races.year = ${CURRENT_YEAR} AND driverStandings.driverId IS NOT NULL
		ORDER BY position
 * @param res 
 */

// export type StandingsType = DriverStandings & { raceId: Races }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ drivers: MappedType<Driver> }>
) {
  // const drivers = await getDriversForSeason(2022)

  // const CURRENT_YEAR = new Date().toISOString().substring(0, 4)

  // const dataSource = await DataBase.getDataSource()
  // const standings = await dataSource.createQueryBuilder<StandingsType>(DriverStandings, 'standing')
  // // .select('driverId')
  // .innerJoin('standing.raceId', 'race')
  // // .select('standing.position')´
  // .where((qb) => {
  //   const round = qb.subQuery()
  //                   .select('MAX(round)')
  //                   .from(Races, 'race')
  //                   .where(`race.year = ${CURRENT_YEAR}`)
  //                   .andWhere("`race`.`date` <= CURDATE()")
  //                   .getQuery()

  //   return "race.round = " + round
  // })
  // .andWhere('race.year = :year', { year: CURRENT_YEAR })
  // .orderBy('position')
  // .getMany()

  // res.send({ standings, drivers })
  }
