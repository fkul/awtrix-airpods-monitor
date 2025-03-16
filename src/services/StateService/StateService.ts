import { Context, Option, Ref } from 'effect'

import type { AirPods } from '~/types'

interface State {
  readonly airPods: Option.Option<AirPods>
}

export class StateService extends Context.Tag('StateService')<
  StateService,
  Ref.Ref<State>
>() {}

export const initialState = Ref.make<State>({
  airPods: Option.none(),
})
