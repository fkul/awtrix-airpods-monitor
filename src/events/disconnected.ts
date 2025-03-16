import { Effect } from 'effect'

import { deleteApp } from '~/actions'
import { AppConfig } from '~/config'
import type { AirPods } from '~/types'

export const onDisconnected = (airPods: AirPods) =>
  AppConfig.pipe(
    Effect.tap(() => Effect.log(`AirPods disconnected [${airPods.name}]`)),
    Effect.andThen(config => deleteApp(config.appName)),
  )
