import { Context, Effect, Layer } from "effect";

import { AppConfig } from "../../config";
import { createHttpClient, type HttpClientError } from "../../utils/httpClient";
import {
  StatsResponseSchema,
  type StatsResponse,
} from "./AwtrixApiService.types";

export class AwtrixApiService extends Context.Tag("AwtrixApiService")<
  AwtrixApiService,
  {
    readonly getStats: () => Effect.Effect<StatsResponse, HttpClientError>;
  }
>() {}

export const AwtrixApiLive = Layer.effect(
  AwtrixApiService,
  Effect.gen(function* () {
    const config = yield* AppConfig;
    const client = createHttpClient(config.awtrixApiBaseUrl);

    const getStats = () =>
      client.get("/stats", { schema: StatsResponseSchema });

    return {
      getStats,
    };
  })
);
