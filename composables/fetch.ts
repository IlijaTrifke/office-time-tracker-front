import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";
import { TOKEN_KEY } from "~/constants";

export function useApi<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const userAuth = useCookie(TOKEN_KEY);
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase,
    // set user token if connected
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},

    onRequest(context) {
      if (userAuth.value) {
        context.options.headers = {
          ...context.options.headers,
          Authorization: `Bearer ${userAuth.value}`,
        };
      }
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}

export const api = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE,
  onRequest: ({ options }) => {
    let token;
    try {
      token = useCookie(TOKEN_KEY);
    } catch (err) {
      console.error("Failed to get cookie");
    }

    if (token) {
      options.headers = options.headers ?? {};
      options.headers.authorization = `Bearer ${token.value}`;
    }
  },
});
