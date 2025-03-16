import { Effect } from "effect";
import { AwtrixApiService } from "../services/AwtrixApiService";

export const deleteApp = (appName: string) =>
  AwtrixApiService.pipe(
    Effect.andThen((api) =>
      Effect.all([
        api.deleteCustomApp(`${appName}L`),
        api.deleteCustomApp(`${appName}C`),
        api.deleteCustomApp(`${appName}R`),
      ])
    )
  );
