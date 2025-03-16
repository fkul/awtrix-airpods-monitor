import { Config, Schema } from 'effect'
import type { AppConfig } from './config'

export type AppConfig = Config.Config.Success<typeof AppConfig>

export interface BluetoothDevice {
  name: string
  isConnected: boolean
  [key: string]: string | number | boolean
}

const NumberFromPercentageString = Schema.transform(
  Schema.String,
  Schema.Number,
  {
    decode: val => Number(val.replace('%', '')),
    encode: val => `${val}%`,
  },
)

export const AirPodsSchema = Schema.Struct({
  name: Schema.String,
  isConnected: Schema.Boolean,
  caseBatteryLevel: Schema.optionalWith(NumberFromPercentageString, {
    as: 'Option',
  }).pipe(Schema.fromKey('Case Battery Level')),
  leftBatteryLevel: Schema.optionalWith(NumberFromPercentageString, {
    as: 'Option',
  }).pipe(Schema.fromKey('Left Battery Level')),
  rightBatteryLevel: Schema.optionalWith(NumberFromPercentageString, {
    as: 'Option',
  }).pipe(Schema.fromKey('Right Battery Level')),
  firmwareVersion: Schema.optionalWith(Schema.String, {
    as: 'Option',
  }).pipe(Schema.fromKey('Firmware Version')),
  serialNumber: Schema.optionalWith(Schema.String, {
    as: 'Option',
  }).pipe(Schema.fromKey('Serial Number')),
  serialNumberLeft: Schema.optionalWith(Schema.String, {
    as: 'Option',
  }).pipe(Schema.fromKey('Serial Number (Left)')),
  serialNumberRight: Schema.optionalWith(Schema.String, {
    as: 'Option',
  }).pipe(Schema.fromKey('Serial Number (Right)')),
})

export type AirPods = Schema.Schema.Type<typeof AirPodsSchema>
