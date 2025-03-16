import { Effect } from "effect";
import type { AirPods } from "../types";
import { AppConfig } from "../config";
import { deleteApp } from "../actions/deleteApp";

export const onDisconnected = (airPods: AirPods) =>
  AppConfig.pipe(
    Effect.tap(() => Effect.log(`AirPods disconnected [${airPods.name}]`)),
    Effect.andThen((config) => deleteApp(config.appName))
  );
