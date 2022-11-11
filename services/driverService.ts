import { AsyncArrayElement, MappedType } from '../types'
import { omit } from '../utils/omit'
import { prisma } from '../prisma/prisma'

const execGetDriversForSeasonQuery = async (season: number) => {
  const foo = await prisma.results.findMany({
    distinct: 'driverId',
    select: {
      constructorId: true,
      driver: {
        select: {
          dob: true,
          driverId: true,
          driverRef: true,
          url: true,
          forename: true,
          surname: true,
          code: true,
          nationality: true,
          number: true
        }
      }
    },
    where: {
      race: {
        year: season
      }
    }
  })
  return foo
}

export const getDriversForSeason = async (season: number): Promise<MappedType<Driver>> => {
  const driverResult = await execGetDriversForSeasonQuery(season)

  const result: MappedType<Driver> = { map: {}, ids: [] }
  driverResult.forEach((currentValue) => {
    result.ids.push(currentValue.driver.driverId)
    result.map[currentValue.driver.driverId] = { ...omit(currentValue, 'driver'), ...currentValue.driver }
  })

  return result
}

export type Driver = Omit<AsyncArrayElement<ReturnType<typeof execGetDriversForSeasonQuery>>, 'driver'> & AsyncArrayElement<ReturnType<typeof execGetDriversForSeasonQuery>>['driver']
