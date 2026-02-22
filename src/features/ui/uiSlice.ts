// src/features/ui/uiSlice.ts

/**
 * UI Slice — global UI state.
 *
 * Scope: only state that is truly global (i.e. needed by multiple
 * unrelated components, or persisted across route changes).
 *
 * Current state:
 *   - mobileMenuOpen: drives Navbar drawer visibility.
 *     Previously was useState inside Navbar — moved here because in future
 *     other UI elements (e.g. a floating CTA, a sidebar overlay) may need
 *     to read or close the menu without prop drilling.
 *
 * NOT stored here:
 *   - Form field values (component-local)
 *   - GSAP animation state (ephemeral, DOM-only)
 *   - Hover/focus states (component-local)
 */

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

interface UIState {
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu } =
  uiSlice.actions;

// Selectors — co-located with the slice for discoverability
export const selectMobileMenuOpen = (state: RootState) =>
  state.ui.mobileMenuOpen;

export default uiSlice.reducer;
