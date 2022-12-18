import { getConstructorStandingsForSeason } from '../../../services/standingService'
import { constructSeasonQueryHandler } from '../../../utils/constructSeasonQueryHandler'

export default constructSeasonQueryHandler(getConstructorStandingsForSeason)
