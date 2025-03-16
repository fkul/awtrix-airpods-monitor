import { Effect, Option } from 'effect'
import type { AirPods } from '../types'
import { AppConfig } from '../config'
import { setApp } from '../actions/setApp'

export const onUpdated = (airPods: AirPods) =>
  AppConfig.pipe(
    Effect.tap(() => Effect.log(`AirPods state updated [${airPods.name}]`)),
    Effect.andThen(
      config =>
        Option.isSome(
          Option.all([
            airPods.leftBatteryLevel,
            airPods.caseBatteryLevel,
            airPods.rightBatteryLevel,
          ]),
        ) && setApp(config, airPods),
    ),
  )
