import { circuits, races } from '@prisma/client'
import { prisma } from '../prisma/prisma'
import { getCountryCode } from './countryCodeService'

const getRacesBySeason = async (season: number) => {
  const races = await prisma.races.findMany({
    where: {
      year: season,
    },
  })

  const results = await prisma.results.findMany({
    where: {
      raceId: {
        in: races.map((r) => r.raceId),
      },
    },
    orderBy: {
      raceId: 'asc',
    },
  })

  const circuits = await prisma.circuits.findMany({
    where: {
      circuitId: {
        in: races.map((r) => r.circuitId),
      },
    },
  })

  return { races, results, circuits }
}

type ResultMetaData = {
  timestamp: string
  circuitId: string
  raceName: string
  circuitCountryCode: string
}

type ResultMetaDataMap = {
  [raceId: string]: ResultMetaData
}

const generateMetaDataItems = async (races: races[], circuits: circuits[]): Promise<ResultMetaDataMap> => {
  const map: ResultMetaDataMap = {}
  for (let race of races) {
    const circuit = circuits.find((c) => c.circuitId === race.circuitId)
    let countryCode = ''
    if (circuit) {
      try {
        countryCode = await getCountryCode(circuit.lat, circuit.lng)
      } catch (err) {}
    }
    map[race.raceId] = { timestamp: race.date.toISOString(), circuitId: race.circuitId.toString(), raceName: race.name, circuitCountryCode: countryCode }
  }
  return map
}

export const getDriverStandingChartData = async (season: number) => {
  const { races, results, circuits } = await getRacesBySeason(season)

  const map: {
    [raceId: string]: ResultMetaData & { [driverId: string]: string }
  } = await generateMetaDataItems(races, circuits)

  results.forEach((result) => {
    const previousResult = map[result.raceId]
    map[result.raceId] = {
      ...previousResult,
      [result.driverId]: result.points,
    }
  })

  const finalArray: Array<ResultMetaData & { [driverId: string]: string }> = []

  Object.keys(map).forEach((key, index) => {
    const currentItem = map[key]
    if (index === 0) {
      finalArray.push(currentItem)
    } else {
      const previousItem = finalArray[index - 1]
      const cumulativePoints: {
        [driverId: string]: string
      } = {}
      Object.keys(previousItem).forEach((key) => {
        if (key !== 'circuitId' && key !== 'timestamp' && key !== 'raceName' && key !== 'circuitCountryCode') {
          cumulativePoints[key] = (parseInt(previousItem[key], 10) + parseInt(currentItem[key], 10)).toString()
        }
      })
      finalArray.push({
        timestamp: currentItem.timestamp,
        circuitId: currentItem.circuitId,
        raceName: currentItem.raceName,
        circuitCountryCode: currentItem.circuitCountryCode,
        ...cumulativePoints,
      })
    }
  })
  console.log(finalArray)
  return finalArray
}

export type DriverStandingChartData = Awaited<ReturnType<typeof getDriverStandingChartData>>
