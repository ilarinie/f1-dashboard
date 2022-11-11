import { prisma } from '../prisma/prisma'
import { AsyncArrayElement, MappedType } from '../types'

const execGetConstructorsForSeasonQuery = async (season: number) => {
  const foo = await prisma.constructorResults.findMany({
    distinct: 'constructorId',
    select: {
      constructor: {
        select: {
          constructorId: true,
          constructorRef: true,
          name: true,
          nationality: true,
          url: true,
        }
      }
    },
    where: {
      race: {
        year: season
      }
    }
  })

  return foo.map((bar) => ({...bar.constructor}) )

}

export const getConstructorsForSeason = async (season: number): Promise<MappedType<ConstructorType>> => {
  const constructorResult = await execGetConstructorsForSeasonQuery(season)

  const result: MappedType<ConstructorType> = { map: {}, ids: [] }
  constructorResult.forEach((currentValue) => {
    result.ids.push(currentValue.constructorId)
    result.map[currentValue.constructorId] = { ...currentValue }
  })

  return result
}

export type ConstructorType = AsyncArrayElement<ReturnType<typeof execGetConstructorsForSeasonQuery>>
