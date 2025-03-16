import { Effect, pipe, Schedule } from "effect";

import { AppConfig, ConfigLayer } from "./config";

import { BunContext } from "@effect/platform-bun";
import { BluetoothLive } from "./services/BluetoothService";

import { initialState, StateService } from "./services/StateService";
import { monitor } from "./monitor";
import { AwtrixApiLive } from "./services/AwtrixApiService";

const program = pipe(
  Effect.log("Starting AWTRIX AirPods Monitor..."),
  Effect.andThen(() =>
    Effect.flatMap(AppConfig, (config) =>
      Effect.repeat(monitor, Schedule.spaced(config.updateIntervalMs))
    )
  ),
  Effect.catchAll((err) =>
    Effect.logError(`Unhandled error caught: ${String(err)}`)
  ),
  Effect.provide(AwtrixApiLive),
  Effect.provide(BluetoothLive),
  Effect.provide(ConfigLayer),
  Effect.provide(BunContext.layer),
  Effect.provideServiceEffect(StateService, initialState)
);

Effect.runPromise(program).catch(console.error);
