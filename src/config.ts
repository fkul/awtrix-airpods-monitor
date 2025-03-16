import { FileSystem, Path } from "@effect/platform";
import { Config, ConfigProvider, Effect, Layer, pipe } from "effect";

const CONFIG_FILE_NAME = "config.json";

export const AppConfig = Config.all({
  appName: Config.string("appName"),
  airPodsName: Config.string("airPodsName"),
  awtrixApiBaseUrl: Config.string("awtrixApiBaseUrl"),
  updateIntervalMs: Config.integer("updateIntervalMs"),
  icon: Config.number("icon"),
  duration: Config.number("duration"),
});

export const ConfigLayer = pipe(
  Effect.all([Path.Path, FileSystem.FileSystem]),
  Effect.flatMap(([path, fs]) =>
    fs.readFileString(
      path.join(
        import.meta.dir.startsWith("/$bunfs/")
          ? path.dirname(process.execPath)
          : ".",
        CONFIG_FILE_NAME
      )
    )
  ),
  Effect.map(JSON.parse),
  Effect.map(ConfigProvider.fromJson),
  Effect.map(Layer.setConfigProvider),
  Layer.unwrapEffect
);
