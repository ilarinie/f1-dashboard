import { getSeasonDetails } from '../../services/seasonService'
import { constructSeasonQueryHandler } from '../../utils/constructSeasonQueryHandler'

export default constructSeasonQueryHandler(getSeasonDetails)
