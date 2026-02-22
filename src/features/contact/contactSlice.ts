// src/features/contact/contactSlice.ts

/**
 * Contact Slice — async form submission state for /api/contact.
 *
 * The thunk posts the payload and normalises success / error into slice state.
 * The Contact component stays responsible for:
 *   - Client-side field validation (per-field errors — component-local)
 *   - Form field values (component-local useState — not global)
 *   - Honeypot reading from DOM
 *   - GSAP submit-button micro-animation (ref-based, local)
 *
 * Redux owns:
 *   - loading / success / error lifecycle (global — could be read by a
 *     future toast system, analytics middleware, or a dashboard widget)
 *   - API-level error message
 *
 * The separation keeps form UX logic local while centralising the network
 * lifecycle, which is the right boundary for a marketing site.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website: string; // honeypot — always included, API ignores if empty
}

interface ContactState {
  status: "idle" | "loading" | "success" | "error";
  apiError: string | null;
}

/* ─── Async thunk ────────────────────────────────────────────────────────── */

export const submitContact = createAsyncThunk<
  void, // fulfilled value (nothing returned on success)
  ContactPayload, // argument type
  { rejectValue: string } // rejected value type
>("contact/submit", async (payload, { rejectWithValue }) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    // Surface a human-readable API error for the banner
    return rejectWithValue(
      data?.errors?.api ??
        data?.message ??
        "Something went wrong. Please try again or email us directly.",
    );
  }
});

/* ─── Slice ──────────────────────────────────────────────────────────────── */

const initialState: ContactState = {
  status: "idle",
  apiError: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Call this when the user clicks "Send another message" to reset the form
    resetContactState(state) {
      state.status = "idle";
      state.apiError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.status = "success";
        state.apiError = null;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = "error";
        state.apiError = action.payload ?? "An unexpected error occurred.";
      });
  },
});

export const { resetContactState } = contactSlice.actions;

// Selectors
export const selectContactStatus = (state: RootState) => state.contact.status;
export const selectContactApiError = (state: RootState) =>
  state.contact.apiError;

export default contactSlice.reducer;
