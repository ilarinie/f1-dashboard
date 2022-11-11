import { find } from 'geo-tz'
import moment from 'moment-timezone'
import { prisma } from '../prisma/prisma'
import { getCurrentRound } from './standingService'

const converUTCTimeToUTCDate = (raceDate: Date | null, raceTime: Date | null): Date | null => {
  if (!raceTime || !raceDate) {
    return null
  }

  const time = raceTime

  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()

  const newDate = new Date(raceDate)
  newDate.setUTCHours(hours)
  newDate.setUTCMinutes(minutes)
  newDate.setUTCSeconds(0)
  newDate.setUTCMilliseconds(0)

  return newDate
}


export const getSeasonDetails = async (season: number) => {
  const currentRound = await getCurrentRound(season)
  const lastRound = currentRound - 1
  const nextRound = currentRound + 1

  const seasonDetails = await prisma.seasons.findFirst({ where: { year: season }})
  
  if (!seasonDetails) {
    throw new Error(`Invalid season: ${season}`)
  }

  const totalRounds = await prisma.races.findMany({ where: { 
    year: season
  }})

  const nextRace = await prisma.races.findFirst({ where: { year: season, round: nextRound }, include: { circuit: true }})

  if (nextRace) {
    nextRace.time = converUTCTimeToUTCDate(nextRace.date, nextRace.time)
    nextRace.fp1_time = converUTCTimeToUTCDate(nextRace.fp1_date, nextRace.fp1_time)
    nextRace.fp2_time = converUTCTimeToUTCDate(nextRace.fp2_date, nextRace.fp2_time)
    nextRace.fp3_time = converUTCTimeToUTCDate(nextRace.fp3_date, nextRace.fp3_time)
    nextRace.quali_time = converUTCTimeToUTCDate(nextRace.quali_date, nextRace.quali_time)
  }



  const lastRaceResults = await prisma.results.findMany({ where: { race: { year: season, round: currentRound }}, orderBy: { position: 'asc' }})

  lastRaceResults.sort((a, b) => { 
    if (!a.position) {
      return 1
    }
    if (!b.position) {
      return -1
    }
    return a.position - b.position 
  })

  const lastRace = await prisma.races.findFirst({ where: { year: season, round: currentRound }, include: { circuit: true }}) 

  return {
    currentRound,
    seasonDetails,
    totalRounds,
    nextRace,
    lastRaceResults,
    lastRace
  }
}

export type SeasonDetailsType = Awaited<ReturnType<typeof getSeasonDetails>>