import { Array, Effect } from 'effect'
import type { BluetoothDevice } from '../../types'
import { parse } from 'yaml'

const prepareValidYaml = (input: string): Effect.Effect<string> =>
  Effect.sync(() => {
    let deviceIndex = 0

    return input
      .split('\n')
      .map(line => {
        if (/^\s*[^:\n]+:\s*$/.test(line)) {
          const name = line.trim().slice(0, -1)
          const id = `${deviceIndex++}#${name
            .toLowerCase()
            .replaceAll(' ', '-')}`
          return `${id}:\n  name: ${name}`
        }
        return line
      })
      .join('\n')
      .replace(/ {2,}/g, '  ')
  })

export const parseBluetoothDevicesStdOut = (
  stdOut: string,
): Effect.Effect<BluetoothDevice[]> =>
  Effect.gen(function* () {
    const [rest, notConnected] = stdOut.split('Not Connected:')
    const [_, connected] = rest.split('Connected:')

    const preparedConnected = yield* prepareValidYaml(connected.trim())
    const preparedNotConnected = yield* prepareValidYaml(notConnected.trim())

    return [
      ...Object.values<BluetoothDevice>(parse(preparedConnected)).map(
        device => ({
          ...device,
          isConnected: true,
        }),
      ),
      ...Object.values<BluetoothDevice>(parse(preparedNotConnected)).map(
        device => ({
          ...device,
          isConnected: false,
        }),
      ),
    ]
  })

export const mergeDevices = Array.reduce<
  BluetoothDevice | null,
  BluetoothDevice
>(null, (acc, device) => ({
  ...acc,
  ...device,
}))
