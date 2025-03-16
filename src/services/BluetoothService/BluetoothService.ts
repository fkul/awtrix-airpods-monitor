import { Command, CommandExecutor } from '@effect/platform'
import type { PlatformError } from '@effect/platform/Error'
import { Array, Context, Effect, Layer, Option, pipe } from 'effect'

import type { BluetoothDevice } from '~/types'

import {
  mergeDevices,
  parseBluetoothDevicesStdOut,
} from './BluetoothService.utils'

export class BluetoothService extends Context.Tag('BluetoothService')<
  BluetoothService,
  {
    readonly getBluetoothDevices: () => Effect.Effect<
      BluetoothDevice[],
      PlatformError
    >

    readonly getBluetoothDeviceByAddress: (
      address: string,
    ) => Effect.Effect<Option.Option<BluetoothDevice>, PlatformError>

    readonly getBluetoothDeviceByName: (
      address: string,
    ) => Effect.Effect<Option.Option<BluetoothDevice>, PlatformError>
  }
>() {}

export const BluetoothLive = Layer.effect(
  BluetoothService,
  Effect.gen(function* () {
    const commandExecutor = yield* CommandExecutor.CommandExecutor

    const getBluetoothDevices = () =>
      Effect.provideService(
        pipe(
          Command.make('system_profiler', 'SPBluetoothDataType'),
          Command.string,
          Effect.flatMap(parseBluetoothDevicesStdOut),
        ),
        CommandExecutor.CommandExecutor,
        commandExecutor,
      )

    return {
      getBluetoothDevices,

      getBluetoothDeviceByAddress: (address: string) =>
        pipe(
          getBluetoothDevices(),
          Effect.map(Array.filter(device => device['Address'] === address)),
          Effect.map(mergeDevices),
          Effect.map(Option.fromNullable),
        ),

      getBluetoothDeviceByName: (name: string) =>
        pipe(
          getBluetoothDevices(),
          Effect.map(Array.filter(device => device.name === name)),
          Effect.map(mergeDevices),
          Effect.map(Option.fromNullable),
        ),
    }
  }),
)
