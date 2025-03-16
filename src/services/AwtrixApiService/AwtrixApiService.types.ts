import { Schema } from 'effect'

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
})

export type StatsResponse = Schema.Schema.Type<typeof StatsResponseSchema>

export interface PageProps {
  /** The text to display. The font size is variable, affecting when text starts scrolling. */
  text?: string
  /** Changes the uppercase setting: 0 = global setting, 1 = forces uppercase, 2 = shows as sent. */
  textCase?: number
  /** Draw the text on top of the display. */
  topText?: boolean
  /** Sets an offset for the x position of the starting text. */
  textOffset?: number
  /** Centers a short, non-scrollable text. */
  center?: boolean
  /** The color of the text, bar, or line. Can be a string or an array of integers. */
  color?: string | number[]
  /** Applies a gradient to the text using two given colors. */
  gradient?: (string | number)[]
  /** Makes the text blink at a given interval in milliseconds. Not compatible with gradient or rainbow effects. */
  blinkText?: number
  /** Makes the text fade in and out at a given interval. Not compatible with gradient or rainbow effects. */
  fadeText?: number
  /** Sets a background color. Can be a string or an array of integers. */
  background?: string | number[]
  /** Fades each letter of the text through the RGB spectrum. */
  rainbow?: boolean
  /** The icon ID or filename (without extension) to display. Can also be an 8x8 JPG as a Base64 string. */
  icon?: string
  /** Defines how the icon moves: 0 = static, 1 = moves with text and disappears, 2 = moves with text and reappears when scrolling starts again. */
  pushIcon?: number
  /** Number of times the text should scroll through the matrix before the app ends. */
  repeat?: number
  /** Duration (in seconds) the app or notification should be displayed. */
  duration?: number
  /** If true, the notification stays on screen until manually dismissed. Only applies to notifications. */
  hold?: boolean
  /** The filename of the RTTTL ringtone (without extension) or the 4-digit number of the MP3 file if using a DFPlayer. */
  sound?: string
  /** Allows sending an RTTTL sound string directly in JSON. */
  rtttl?: string
  /** If true, loops the sound or RTTTL while the notification is running. */
  loopSound?: boolean
  /** Draws a bar graph. Maximum of 16 values without an icon, 11 with an icon. */
  bar?: number[]
  /** Draws a line chart. Maximum of 16 values without an icon, 11 with an icon. */
  line?: number[]
  /** Enables or disables autoscaling for bar and line charts. */
  autoscale?: boolean
  /** Background color of the bars in the bar graph. */
  barBC?: string | number[]
  /** Displays a progress bar with values from 0 to 100. */
  progress?: number
  /** The color of the progress bar. */
  progressC?: string | number[]
  /** The background color of the progress bar. */
  progressBC?: string | number[]
  /** Defines the position of a custom page in the loop, starting at 0. Only applies to the first push. Experimental. */
  pos?: number
  /** Array of drawing instructions. Each object represents a drawing command. */
  draw?: object[]
  /** Removes the custom app if no updates are received after the given time (in seconds). */
  lifetime?: number
  /** Defines behavior when the app lifetime expires: 0 = delete, 1 = mark as stale with a red rectangle. */
  lifetimeMode?: number
  /** Defines if notifications stack. If false, the notification replaces the current one immediately. */
  stack?: boolean
  /** If true, wakes up the matrix if it is off for the duration of the notification. */
  wakeup?: boolean
  /** If true, disables text scrolling. */
  noScroll?: boolean
  /** Allows forwarding a notification to other AWTRIX devices via MQTT prefix or HTTP IP addresses. */
  clients?: string[]
  /** Modifies the text scroll speed as a percentage of the default speed. */
  scrollSpeed?: number
  /** Displays an effect as the background. Sending an empty string removes the effect. */
  effect?: string
  /** JSON object that changes the color and speed of the effect. */
  effectSettings?: Record<string, unknown>
  /** If true, saves the custom app into flash memory and reloads it after a reboot. Avoid frequent updates to prevent flash wear. */
  save?: boolean
  /** Sets an effect overlay. Cannot be used with global overlays. */
  overlay?: string
}
