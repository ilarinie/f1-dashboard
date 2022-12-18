import { getConstructorsForSeason } from '../../services/constructorService'
import { constructSeasonQueryHandler } from '../../utils/constructSeasonQueryHandler'

export default constructSeasonQueryHandler(getConstructorsForSeason)
