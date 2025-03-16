import { Effect } from "effect";
import { AwtrixApiService } from "../services/AwtrixApiService";
import type { AirPods } from "../types";

export const notifyConnected = (airPods: AirPods) =>
  AwtrixApiService.pipe(
    Effect.andThen((api) =>
      api.postNotify({ text: `Connected: ${airPods.name}` })
    )
  );
