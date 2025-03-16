import { Data, Effect, Equal, Match, Option, Ref, Schema } from 'effect'

import { AppConfig } from './config'
import { onConnected, onDisconnected, onUpdated } from './events'
import { BluetoothService } from './services/BluetoothService'
import { StateService } from './services/StateService'
import { AirPodsSchema, type AirPods } from './types'

const areEqual = Option.getEquivalence<AirPods>((a, b) =>
  Equal.equals(Data.struct(a), Data.struct(b)),
)

export const monitor = Effect.gen(function* () {
  const stateRef = yield* StateService
  const bluetoothService = yield* BluetoothService
  const config = yield* AppConfig
  const state = yield* stateRef

  const airPods = (yield* bluetoothService.getBluetoothDeviceByName(
    config.airPodsName,
  )).pipe(Option.map(Schema.decodeUnknownSync(AirPodsSchema)))

  if (areEqual(airPods, state.airPods)) {
    return
  }

  yield* Match.value({ prev: state.airPods, curr: airPods }).pipe(
    // Connected
    Match.when(
      ({ prev, curr }) =>
        (Option.isNone(prev) || !prev.value.isConnected) &&
        Option.isSome(curr) &&
        curr.value.isConnected,
      ({ curr }) => onConnected(Option.getOrThrow(curr)),
    ),
    // Disconnected
    Match.when(
      ({ prev, curr }) =>
        Option.isSome(prev) &&
        prev.value.isConnected &&
        (Option.isNone(curr) || !curr.value.isConnected),
      ({ curr }) => onDisconnected(Option.getOrThrow(curr)),
    ),
    // Updated
    Match.when(
      ({ prev, curr }) =>
        Option.isSome(prev) &&
        prev.value.isConnected &&
        Option.isSome(curr) &&
        curr.value.isConnected,
      ({ curr }) => onUpdated(Option.getOrThrow(curr)),
    ),
    // Other state change
    Match.orElse(() => Effect.succeed(Option.getOrNull(airPods))),
  )

  yield* Ref.set(stateRef, { airPods })
})
