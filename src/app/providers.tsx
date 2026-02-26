"use client"

// src/app/providers.tsx
//
// Client-side provider tree.
// Wraps the app in:
//   1. next-themes ThemeProvider — manages .dark class on <html>
//   2. Redux Provider            — global UI / form / careers state
//
// Both providers must be "use client". Keeping them here lets
// layout.tsx remain a pure Server Component (metadata, JSON-LD, fonts).

import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { store } from "@/store/store"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"       // Applies `class="dark"` to <html>
            defaultTheme="dark"     // Default: dark mode
            enableSystem={false}    // Ignore OS preference — explicit toggle only
            disableTransitionOnChange={false} // Allow smooth CSS transitions
        >
            <Provider store={store}>
                {children}
            </Provider>
        </ThemeProvider>
    )
}
