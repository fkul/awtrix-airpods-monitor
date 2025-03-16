import { Effect } from 'effect'
import { AwtrixApiService } from '../services/AwtrixApiService'

export const switchApp = (appName: string) =>
  AwtrixApiService.pipe(Effect.andThen(api => api.switchApp(`${appName}L`)))
