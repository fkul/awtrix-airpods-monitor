import axios, {
  type AxiosRequestConfig,
  type Method as AxiosMethod,
  isAxiosError,
  AxiosError,
} from "axios";
import { Effect, pipe, Schema, Option } from "effect";
import { ParseError } from "effect/ParseResult";

type Method = Extract<AxiosMethod, Uppercase<AxiosMethod>>;
export type HttpClientError = AxiosError | ParseError;

interface RequestConfig<T> extends AxiosRequestConfig {
  schema?: Schema.Schema<T>;
}

interface HttpClient {
  get: <T>(
    url: string,
    config: RequestConfig<T> & { schema: Schema.Schema<T> }
  ) => Effect.Effect<T, HttpClientError>;
  post: <T = void, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig<T>
  ) => Effect.Effect<T, HttpClientError>;
  put: <T = void, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig<T>
  ) => Effect.Effect<T, HttpClientError>;
  patch: <T = void, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig<T>
  ) => Effect.Effect<T, HttpClientError>;
  delete: <T = void>(
    url: string,
    config?: RequestConfig<T>
  ) => Effect.Effect<T, HttpClientError>;
}

const mapUnknownException = (error: unknown): AxiosError =>
  isAxiosError(error)
    ? error
    : new AxiosError(`Unexpected error: ${String(error)}`);

export const createHttpClient = (baseURL: string): HttpClient => {
  const client = axios.create({ baseURL });

  const request = <T, D>(
    method: Method,
    url: string,
    config?: RequestConfig<T>,
    data?: D
  ): Effect.Effect<T, HttpClientError> =>
    pipe(
      Effect.tryPromise(() =>
        client.request({
          method,
          url,
          data,
          ...config,
        })
      ),
      Effect.mapError(mapUnknownException),
      Effect.flatMap(({ data }) =>
        Option.match(Option.fromNullable(config?.schema), {
          onSome: (schema) => Schema.decodeUnknown(schema)(data),
          onNone: () => Effect.succeed(undefined as T),
        })
      )
    );

  return {
    get: (url, config) => request("GET", url, config),
    post: (url, data, config) => request("POST", url, config, data),
    put: (url, data, config) => request("PUT", url, config, data),
    patch: (url, data, config) => request("PATCH", url, config, data),
    delete: (url, config) => request("DELETE", url, config),
  };
};
