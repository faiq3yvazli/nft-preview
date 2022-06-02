/// <reference types="dayjs/plugin/isBetween" />

import type { BaseProvider } from '@metamask/providers';
import type { compose } from '@reduxjs/toolkit';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: compose;
    ethereum?: BaseProvider;
  }
}

export {};
