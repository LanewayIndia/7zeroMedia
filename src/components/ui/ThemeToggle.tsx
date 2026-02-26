"use client"

/**
 * ThemeToggle — Sun / Moon toggle button.
 *
 * Architecture decisions:
 *  - `mounted` guard prevents hydration mismatch: on the server, `theme`
 *    is always undefined; rendering null until after mount ensures the
 *    client and server output match.
 *  - Uses `useTheme()` from next-themes — all theme state lives in
 *    ThemeProvider, not in Redux (themes persist via localStorage).
 *  - Icon transition uses CSS `transition-all` from globals.css, not GSAP,
 *    so it never conflicts with page-level GSAP animations.
 *  - `aria-label` updates dynamically so screen readers announce the action.
 */

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only render after mount — prevents SSR/CSR mismatch
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) {
        // Reserve the exact same space as the rendered button to avoid layout shift
        return <div className="w-10 h-10" aria-hidden="true" />
    }

    const isDark = theme === "dark"

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={[
                "flex items-center justify-center w-10 h-10 rounded-full",
                "bg-elevated border border-border",
                "text-text-soft hover:text-orange",
                "hover:bg-surface hover:border-orange/30",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-orange focus-visible:ring-offset-1",
                "focus-visible:ring-offset-bg",
                "shadow-sm",
            ].join(" ")}
        >
            {isDark ? (
                <Sun
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 rotate-0 hover:rotate-12"
                />
            ) : (
                <Moon
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 rotate-0 hover:-rotate-12"
                />
            )}
        </button>
    )
}
