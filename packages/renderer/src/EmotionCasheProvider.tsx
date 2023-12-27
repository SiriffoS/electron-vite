import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React, { PropsWithChildren, ReactElement } from "react";

type EmotionCacheProviderProps = PropsWithChildren<unknown> & {
  nonce: string;
};

export const EmotionCacheProvider = ({
  nonce,
  children,
}: EmotionCacheProviderProps): ReactElement => {
  const cache = createCache({ key: "contentsecuritypolicy", nonce });
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
