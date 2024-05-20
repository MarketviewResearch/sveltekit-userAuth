import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
import type { LayoutLoad } from "./$types";

export const ssr = false; // if you want server side rendering for Auth, set this to true and we will need much more complex code...

export const load: LayoutLoad = async ({ fetch, data, depends }: any) => {
  depends("supabase:auth");

  const supabase = createBrowserClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      // client we talk to in order to speak to Supabase
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          // if server, something else
          if (!isBrowser()) {
            return JSON.stringify(data.session);
          }

          // is we are on the browser, do something
          const cookie = parse(document.cookie);
          return cookie[key];
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session };
};
