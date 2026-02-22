// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/features/ui/uiSlice";
import contactReducer from "@/features/contact/contactSlice";
import careersReducer from "@/features/careers/careersSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
    careers: careersReducer,
  },
});

// Infer RootState and AppDispatch from the store itself.
// These are the canonical types — always use these, never infer inline.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
