import { getDriverStandingsForSeason } from '../../../services/standingService'
import { constructSeasonQueryHandler } from '../../../utils/constructSeasonQueryHandler'

export default constructSeasonQueryHandler(getDriverStandingsForSeason)
