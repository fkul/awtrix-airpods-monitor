import { Context, Option, Ref } from "effect";
import type { BluetoothDevice } from "../../types";

interface State {
  readonly airPods: Option.Option<BluetoothDevice>;
}

export class StateService extends Context.Tag("StateService")<
  StateService,
  Ref.Ref<State>
>() {}

export const initialState = Ref.make<State>({
  airPods: Option.none(),
});
