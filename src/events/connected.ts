import { Effect } from "effect";
import type { AirPods } from "../types";
import { AppConfig } from "../config";
import { notifyConnected } from "../actions/notifyConnected";
import { setApp } from "../actions/setApp";
import { switchApp } from "../actions/switchApp";

export const onConnected = (airPods: AirPods) =>
  AppConfig.pipe(
    Effect.tap(() => Effect.log(`AirPods connected [${airPods.name}]`)),
    Effect.andThen((config) =>
      Effect.all([
        notifyConnected(airPods),
        setApp(config, airPods),
        switchApp(config.appName),
      ])
    )
  );
