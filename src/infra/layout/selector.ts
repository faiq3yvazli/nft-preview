import { createSelector, Selector } from '@reduxjs/toolkit';
import { RootState } from '@root/infra/store/types';

import { LayoutState } from './slice';

const getState = (state: RootState) => state.layout;
const getNavbarIsOpen = (state: LayoutState) => state.navbarIsOpen;

export const layoutSelector = {
  navbarIsOpen: createSelector<[Selector<RootState, LayoutState>], boolean>([getState], getNavbarIsOpen),
};
