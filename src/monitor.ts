import { Data, Effect, Equal, Match, Option, Ref } from "effect";

import { AppConfig } from "./config";

import { BluetoothService } from "./services/BluetoothService";
import type { BluetoothDevice } from "./types";
import { StateService } from "./services/StateService";

const areEqual = Option.getEquivalence<BluetoothDevice>((a, b) =>
  Equal.equals(Data.struct(a), Data.struct(b))
);

export const monitor = Effect.gen(function* () {
  const stateRef = yield* StateService;
  const bluetoothService = yield* BluetoothService;
  const config = yield* AppConfig;
  const state = yield* stateRef;

  const airPods = yield* bluetoothService.getBluetoothDeviceByAddress(
    config.airPodsAddress
  );

  if (areEqual(airPods, state.airPods)) {
    return;
  }

  Match.value({ prev: state.airPods, curr: airPods }).pipe(
    Match.when(
      ({ prev, curr }) =>
        (Option.isNone(prev) || !prev.value.isConnected) &&
        Option.isSome(curr) &&
        curr.value.isConnected,
      ({ curr }) => console.log(Option.getOrThrow(curr))
    ),
    Match.when(
      ({ prev, curr }) =>
        Option.isSome(prev) &&
        prev.value.isConnected &&
        (Option.isNone(curr) || !curr.value.isConnected),
      () => console.log("Disconnected!")
    ),
    Match.orElse(() => console.log("Unhandled change!"))
  );

  yield* Ref.set(stateRef, { airPods });
});
