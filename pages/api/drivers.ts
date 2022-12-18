import { getDriversForSeason } from '../../services/driverService'
import { constructSeasonQueryHandler } from '../../utils/constructSeasonQueryHandler'

export default constructSeasonQueryHandler(getDriversForSeason)
