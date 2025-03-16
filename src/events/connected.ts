import { Effect } from 'effect'

import { notifyConnected, setApp, switchApp } from '~/actions'
import { AppConfig } from '~/config'
import type { AirPods } from '~/types'

export const onConnected = (airPods: AirPods) =>
  AppConfig.pipe(
    Effect.tap(() => Effect.log(`AirPods connected [${airPods.name}]`)),
    Effect.andThen(config =>
      Effect.all([
        notifyConnected(config, airPods),
        setApp(config, airPods),
        switchApp(config.appName),
      ]),
    ),
  )
