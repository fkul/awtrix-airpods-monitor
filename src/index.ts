import { Effect, pipe, Schedule } from "effect";

import { AppConfig, ConfigLayer } from "./config";

import { BunContext } from "@effect/platform-bun";
import { BluetoothLive } from "./services/BluetoothService";

import { initialState, StateService } from "./services/StateService";
import { monitor } from "./monitor";

const program = pipe(
  Effect.log("Starting AWTRIX AirPods monitor..."),
  Effect.andThen(() =>
    Effect.flatMap(AppConfig, (config) =>
      Effect.repeat(monitor, Schedule.spaced(config.updateIntervalMs))
    )
  ),
  // Effect.catchAll((err) => {
  //   console.log("just sum erorr");
  //   return Effect.succeed("OK!");
  // }),
  Effect.provide(BluetoothLive),
  Effect.provide(ConfigLayer),
  Effect.provide(BunContext.layer),
  Effect.provideServiceEffect(StateService, initialState)
);

Effect.runPromise(program).catch(console.error);
