import { BunContext } from '@effect/platform-bun'
import { Effect, pipe, Schedule } from 'effect'

import { AppConfig, ConfigLayer } from './config'
import { monitor } from './monitor'
import { AwtrixApiLive } from './services/AwtrixApiService'
import { BluetoothLive } from './services/BluetoothService'
import { initialState, StateService } from './services/StateService'

const program = pipe(
  Effect.log('Starting AWTRIX AirPods Monitor...'),
  Effect.andThen(() =>
    Effect.flatMap(AppConfig, config =>
      Effect.repeat(monitor, Schedule.spaced(config.updateIntervalMs)),
    ),
  ),
  Effect.catchAll(err =>
    Effect.logError(`Unhandled error caught: ${String(err)}`),
  ),
  Effect.provide(AwtrixApiLive),
  Effect.provide(BluetoothLive),
  Effect.provide(ConfigLayer),
  Effect.provide(BunContext.layer),
  Effect.provideServiceEffect(StateService, initialState),
)

// eslint-disable-next-line no-console
Effect.runPromise(program).catch(console.error)
