import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutState = {
  navbarIsOpen: boolean;
};

export interface LayoutActions {
  NavbarToggled: PayloadAction;
  NavbarOpened: PayloadAction;
  NavbarClosed: PayloadAction;
}

export type LayoutCaseReducer = {
  navbarToggled: CaseReducer<LayoutState, LayoutActions['NavbarToggled']>;
  navbarOpened: CaseReducer<LayoutState, LayoutActions['NavbarOpened']>;
  navbarClosed: CaseReducer<LayoutState, LayoutActions['NavbarClosed']>;
};

export const layoutSlice = createSlice<LayoutState, LayoutCaseReducer, 'layout'>({
  name: 'layout',
  initialState: {
    navbarIsOpen: false,
  },
  reducers: {
    navbarToggled: (state) => {
      state.navbarIsOpen = !state.navbarIsOpen;
    },
    navbarOpened: (state) => {
      state.navbarIsOpen = true;
    },
    navbarClosed: (state) => {
      state.navbarIsOpen = false;
    },
  },
});
