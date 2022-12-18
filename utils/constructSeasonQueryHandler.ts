import type { NextApiRequest, NextApiResponse } from 'next'
import { parseSeasonParam } from './parseSeasonParam'

export const constructSeasonQueryHandler = (serviceFunction: (season: number) => Promise<any>) => async (req: NextApiRequest, res: NextApiResponse) => {
  let season = 0
  try {
    season = parseSeasonParam(req)
  } catch (err) {
    res.status(406).send({ message: 'Invalid query param: season' })
    return
  }
  try {
    const result = await serviceFunction(season)
    res.send(result)
  } catch (err) {
    res.status(500).send({ message: 'Database issues or something like that' })
  }
}
