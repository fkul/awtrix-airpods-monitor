import { Schema } from "effect";

export const StatsResponseSchema = Schema.Struct({
  bat: Schema.Number,
  bat_raw: Schema.Number,
  type: Schema.Number,
  lux: Schema.Number,
  ldr_raw: Schema.Number,
  ram: Schema.Number,
  bri: Schema.Number,
  temp: Schema.Number,
  hum: Schema.Number,
  uptime: Schema.Number,
  wifi_signal: Schema.Number,
  messages: Schema.Number,
  version: Schema.String,
  indicator1: Schema.Boolean,
  indicator2: Schema.Boolean,
  indicator3: Schema.Boolean,
  app: Schema.String,
  uid: Schema.String,
  matrix: Schema.Boolean,
  ip_address: Schema.String,
});

export type StatsResponse = Schema.Schema.Type<typeof StatsResponseSchema>;
