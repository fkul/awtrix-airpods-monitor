import { Effect, Match, Option } from 'effect'
import { AwtrixApiService } from '../services/AwtrixApiService'
import type { PageProps } from '../services/AwtrixApiService/AwtrixApiService.types'
import type { AirPods, AppConfig } from '../types'
import { constant, pipe } from 'effect/Function'

const COLORS = {
  red: 'ff0000',
  yellow: 'fffb00',
  green: '1fff00',
}

const getText = (label: string, level: Option.Option<number>): string =>
  `${label}: ${pipe(
    level,
    Option.map(val => `${val}%`),
    Option.getOrElse(constant('n/a')),
  )}`

const getProgressColor = (level: Option.Option<number>): string | undefined =>
  pipe(
    level,
    Option.map(val =>
      Match.value(val).pipe(
        Match.when(x => x < 10, constant(COLORS.red)),
        Match.when(x => x < 20, constant(COLORS.yellow)),
        Match.orElse(constant(COLORS.green)),
      ),
    ),
    Option.getOrUndefined,
  )

const createLevelPageProps = (
  icon: number,
  duration: number,
  label: string,
  level: Option.Option<number>,
): PageProps => ({
  icon: String(icon),
  duration,
  text: getText(label, level),
  progress: Option.getOrUndefined(level),
  progressC: getProgressColor(level),
})

export const setApp = (
  { appName, icon, duration }: AppConfig,
  airPods: AirPods,
) =>
  AwtrixApiService.pipe(
    Effect.andThen(api =>
      Effect.all([
        api.postCustomApp(
          `${appName}L`,
          createLevelPageProps(icon, duration, 'L', airPods.leftBatteryLevel),
        ),
        api.postCustomApp(
          `${appName}C`,
          createLevelPageProps(icon, duration, 'C', airPods.caseBatteryLevel),
        ),
        api.postCustomApp(
          `${appName}R`,
          createLevelPageProps(icon, duration, 'R', airPods.rightBatteryLevel),
        ),
      ]),
    ),
  )
