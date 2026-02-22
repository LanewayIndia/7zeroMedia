// src/store/hooks.ts

/**
 * Typed Redux hooks.
 *
 * ALWAYS import from here — never use raw `useDispatch` / `useSelector`
 * from react-redux in components. This gives full TypeScript inference
 * for state shape and dispatch without any casting.
 */

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
