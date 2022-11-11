import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns'
import { SeasonDetailsType } from '../../services/seasonService'

type NextRacePanelProps = {
  race: SeasonDetailsType['nextRace']
}

export const NextRacePanel = ({ race }: NextRacePanelProps) => {
  if (!race) {
    return <div>-</div>
  }

  return (
    <div>
      <h2>FP1</h2>
      <h3>{format(new Date(race.fp1_time ?? 0), 'EEEEEEE dd.MM.yyyy HH:mm:ss')}</h3>
      <h2>FP2</h2>
      <h3>{format(new Date(race.fp2_time ?? 0), 'EEEEEEE dd.MM.yyyy HH:mm:ss')}</h3>
      <h2>FP3</h2>
      <h3>{format(new Date(race.fp3_time ?? 0), 'EEEEEEE dd.MM.yyyy HH:mm:ss')}</h3>
      <h2>Qualification</h2>
      <h3>{format(new Date(race.quali_time ?? 0), 'EEEEEEE dd.MM.yyyy HH:mm:ss')}</h3>
      <h2>Race</h2>
      <h3>{format(new Date(race.time ?? 0), 'EEEEEEE dd.MM.yyyy HH:mm:ss')}</h3>
    </div>
  )
}
