import { Effect } from 'effect'

import { AwtrixApiService } from '~/services/AwtrixApiService'
import type { AirPods, AppConfig } from '~/types'

export const notifyConnected = ({ icon }: AppConfig, airPods: AirPods) =>
  AwtrixApiService.pipe(
    Effect.andThen(api =>
      api.postNotify({
        icon: String(icon),
        repeat: 1,
        text: `Connected: ${airPods.name}`,
      }),
    ),
  )
