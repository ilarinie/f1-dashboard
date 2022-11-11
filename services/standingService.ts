import { prisma } from '../prisma/prisma'

import { format, startOfDay }  from 'date-fns' 
import { AsyncArrayElement } from '../types'

export const getCurrentRound = async (season: number) => {
  const round = await prisma.races.aggregate({
    _max: {
      round: true
    },
    where: {
      year: season,
      date: {
        lt: startOfDay(new Date()),
      },
      results: {
        some: {
          driverId: {
            gt: 0
          }
        }
      }
    }
  })
  return round._max.round ?? 0
}

const executeDriverStandingsQuery = async (season: number) => {

  const currentRound = await getCurrentRound(season)

  return prisma.driverStandings.findMany({
    where: {
      race: {
        round: currentRound,
        year: season
      }
    },
    orderBy: {
      points: 'desc'
    }
  })
}

const executeConstructorStandingsQuery = async (season: number) => {

  const currentRound = await getCurrentRound(season)

  return prisma.constructorStandings.findMany({
    where: {
      race: {
        round: currentRound,
        year: season
      }
    },
    orderBy: {
      points: 'desc'
    }
  })
}

export const getDriverStandingsForSeason = async (season: number) => {
  return executeDriverStandingsQuery(season)
}

export const getConstructorStandingsForSeason = async (season: number) => {
  return executeConstructorStandingsQuery(season)
}

export type DriverStanding = AsyncArrayElement<ReturnType<typeof getDriverStandingsForSeason>>

export type ConstructorStanding = AsyncArrayElement<ReturnType<typeof getConstructorStandingsForSeason>>
