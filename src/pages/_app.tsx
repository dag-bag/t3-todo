import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Navbar } from "@mantine/core";

import "~/styles/globals.css";
import { HeaderTabs } from "~/components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          colors: {
            // Add your color
            // deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
            // // or replace default theme color
            // blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
          },

          shadows: {
            md: "1px 1px 3px rgba(0, 0, 0, .25)",
            xl: "5px 5px 3px rgba(0, 0, 0, .25)",
          },

          headings: {
            fontFamily: "Roboto, sans-serif",
            sizes: {
              h1: { fontSize: "30" },
            },
          },
        }}
      >
        <HeaderTabs tabs={["Notes", "Create Notes"]} />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
