"use client"

// src/app/providers.tsx

/**
 * ReduxProvider — wraps the app in the Redux <Provider>.
 *
 * This must be a "use client" component because Redux store relies on
 * browser-side React context. It is intentionally separate from layout.tsx
 * so that layout.tsx can remain a pure Server Component (keeping metadata,
 * JSON-LD, and font optimisations intact).
 *
 * Usage: wrap only what needs Redux access — in this project that's the
 * entire <body> subtree, so we wrap it here at the layout level.
 */

import { Provider } from "react-redux"
import { store } from "@/store/store"

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}
