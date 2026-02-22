// src/features/careers/careersSlice.ts

/**
 * Careers Slice — async form submission state for /api/careers.
 *
 * FormData (multipart) cannot be serialised into Redux state, so the
 * thunk receives a pre-built `FormData` object — the component still
 * owns file picking, MIME/size validation, and form field state.
 *
 * Redux owns:
 *   - loading / success / error lifecycle
 *   - API-level error message
 *
 * Same boundary rationale as contactSlice: local = field UX,
 * global = network lifecycle.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface CareersState {
  status: "idle" | "loading" | "success" | "error";
  apiError: string | null;
}

/* ─── Async thunk ────────────────────────────────────────────────────────── */

export const submitCareers = createAsyncThunk<
  void,
  FormData, // native browser FormData (multipart upload)
  { rejectValue: string }
>("careers/submit", async (payload, { rejectWithValue }) => {
  const res = await fetch("/api/careers", {
    method: "POST",
    body: payload,
    // No Content-Type header — browser sets multipart/form-data + boundary
  });

  if (res.status === 422) {
    const data = await res.json().catch(() => ({}));
    return rejectWithValue(
      data?.errors?.api ??
        data?.message ??
        "Validation failed — please check your application and try again.",
    );
  }

  if (!res.ok) {
    return rejectWithValue(
      "Something went wrong. Please try again or email us directly.",
    );
  }
});

/* ─── Slice ──────────────────────────────────────────────────────────────── */

const initialState: CareersState = {
  status: "idle",
  apiError: null,
};

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    // Reset when going back to job list or re-applying
    resetCareersState(state) {
      state.status = "idle";
      state.apiError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCareers.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
      })
      .addCase(submitCareers.fulfilled, (state) => {
        state.status = "success";
        state.apiError = null;
      })
      .addCase(submitCareers.rejected, (state, action) => {
        state.status = "error";
        state.apiError = action.payload ?? "An unexpected error occurred.";
      });
  },
});

export const { resetCareersState } = careersSlice.actions;

// Selectors
export const selectCareersStatus = (state: RootState) => state.careers.status;
export const selectCareersApiError = (state: RootState) =>
  state.careers.apiError;

export default careersSlice.reducer;
