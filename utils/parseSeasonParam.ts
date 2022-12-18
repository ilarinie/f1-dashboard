import { getYear } from 'date-fns'
import { parseNumberParam } from './parseNumberParam'

export const parseSeasonParam = (req: { query: { season?: string | string[] | number | undefined } }): number => {
  let season = getYear(new Date())
  if (req.query['season']) {
    season = parseNumberParam(req.query['season'])
  }
  return season
}
