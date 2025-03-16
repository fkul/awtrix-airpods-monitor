import { Context, Effect, Layer } from 'effect'

import { AppConfig } from '~/config'
import { createHttpClient, type HttpClientError } from '~/utils'

import {
  StatsResponseSchema,
  type PageProps,
  type StatsResponse,
} from './AwtrixApiService.types'

export class AwtrixApiService extends Context.Tag('AwtrixApiService')<
  AwtrixApiService,
  {
    readonly getStats: () => Effect.Effect<StatsResponse, HttpClientError>

    readonly postNotify: (
      props: PageProps,
    ) => Effect.Effect<void, HttpClientError>

    readonly postCustomApp: (
      name: string,
      props: PageProps,
    ) => Effect.Effect<void, HttpClientError>

    readonly deleteCustomApp: (
      name: string,
    ) => Effect.Effect<void, HttpClientError>

    readonly switchApp: (name: string) => Effect.Effect<void, HttpClientError>
  }
>() {}

export const AwtrixApiLive = Layer.effect(
  AwtrixApiService,
  Effect.gen(function* () {
    const config = yield* AppConfig
    const client = createHttpClient(config.awtrixApiBaseUrl)

    return {
      getStats: () => client.get('/stats', { schema: StatsResponseSchema }),

      postNotify: props => client.post('/notify', props),

      postCustomApp: (name, props) =>
        client.post(`/custom?name=${name}`, props),

      deleteCustomApp: name => client.post(`/custom?name=${name}`),

      switchApp: name => client.post('/switch', { name }),
    }
  }),
)
