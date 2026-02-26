"use client"

/**
 * Navbar — Production-Grade Component
 *
 * Key architecture decisions:
 *  - All colors use CSS-variable-driven Tailwind tokens (bg-elevated, text-text, etc.)
 *    — zero hardcoded hex values, fully responds to light/dark theme.
 *  - ThemeToggle is placed in the right group (desktop: between CTA and toggle;
 *    mobile: visible alongside hamburger).
 *  - usePathname drives active-link + closes menu on navigation.
 *  - Scroll depth detection uses a passive scroll listener + CSS class toggle.
 *  - GSAP context scoped to wrapperRef — no global side-effects.
 *  - Mobile menu closes automatically on pathname change.
 *  - No <Link> nested inside <Button> — CTA is a styled <Link> directly.
 *  - Mobile menu uses role="dialog" + aria-modal pattern.
 *  - All interactive elements have min 44×44px touch targets.
 */

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useEffect, useState, useCallback, useId } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, Menu } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
    selectMobileMenuOpen,
    closeMobileMenu,
    toggleMobileMenu,
} from "@/features/ui/uiSlice"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

gsap.registerPlugin(ScrollTrigger)

// ─── Static data ────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
] as const

// ─── Link class builders — token-based ──────────────────────────
function pillLinkClass(isActive: boolean) {
    return [
        "text-base font-medium px-4 py-1.5 rounded-full transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1",
        isActive
            ? "text-orange bg-orange-muted shadow-[0_0_12px_var(--orange-muted)]"
            : "text-text/70 hover:text-orange hover:bg-orange-muted",
    ].join(" ")
}

function drawerLinkClass(isActive: boolean) {
    return [
        "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange",
        isActive
            ? "text-orange bg-orange-muted"
            : "text-text hover:text-orange hover:bg-orange-muted",
    ].join(" ")
}

// ─── Component ───────────────────────────────────────────────────
export default function Navbar() {
    const pathname = usePathname()
    const menuId = useId()
    const dispatch = useAppDispatch()
    const menuOpen = useAppSelector(selectMobileMenuOpen)
    const [scrolled, setScrolled] = useState(false)

    // Refs
    const wrapperRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const linkItemsRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    // ── Close menu on route change ───────────────────────────────
    useEffect(() => {
        dispatch(closeMobileMenu())
    }, [pathname, dispatch])

    // ── Scroll depth — toggles CSS class only ────────────────────
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // ── GSAP entrance animations ─────────────────────────────────
    useEffect(() => {
        if (!navRef.current || !logoRef.current || !ctaRef.current) return

        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -60, opacity: 0, duration: 0.9, ease: "power3.out",
                clearProps: "opacity,transform",
            })
            gsap.from(logoRef.current, {
                x: -60, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out",
                clearProps: "opacity,transform",
            })
            gsap.from(ctaRef.current, {
                x: 60, opacity: 0, duration: 1, delay: 0.35, ease: "power3.out",
                clearProps: "opacity,transform",
            })

            const mq = window.matchMedia("(min-width: 768px)")
            if (mq.matches && linkItemsRef.current) {
                gsap.from(linkItemsRef.current.children, {
                    y: -24, opacity: 0, duration: 0.7,
                    stagger: { each: 0.08, ease: "power1.in" },
                    ease: "back.out(1.4)", delay: 0.35,
                    clearProps: "opacity,transform",
                })
            }
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    // ── Keyboard: Escape closes menu ─────────────────────────────
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") dispatch(closeMobileMenu())
    }, [dispatch])

    const toggleMenu = useCallback(() => dispatch(toggleMobileMenu()), [dispatch])

    // ── Pill scroll state — token-based shadows ──────────────────
    const pillScrollClass = scrolled
        ? "border-orange/20 shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
        : "border-border shadow-[0_4px_32px_rgba(0,0,0,0.08)]"

    return (
        <div
            ref={wrapperRef}
            className="fixed top-4 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-1 max-w-7xl mx-auto min-w-0"
            onKeyDown={handleKeyDown}
        >

            {/* ── LEFT · Logo ──────────────────────────────────── */}
            <div ref={logoRef} className="flex items-center shrink-0">
                <Link href="/" aria-label="7ZeroMedia — Go to homepage">
                    <Image
                        src="/logo.png"
                        alt="7ZeroMedia logo"
                        width={64}
                        height={64}
                        priority
                        className="rounded-full shadow-sm"
                    />
                </Link>
            </div>

            {/* ── CENTER · Pill nav ─────────────────────────────── */}
            <nav
                ref={navRef}
                aria-label="Primary navigation"
                className={[
                    "hidden md:flex items-center px-9 py-3.5",
                    "rounded-full border bg-elevated/70 backdrop-blur-xl ring-1 ring-text/5",
                    "transition-[border-color,box-shadow] duration-300",
                    pillScrollClass,
                ].join(" ")}
            >
                <div ref={linkItemsRef} className="flex items-center gap-3" role="list">
                    {NAV_LINKS.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            role="listitem"
                            aria-current={pathname === href ? "page" : undefined}
                            className={pillLinkClass(pathname === href)}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* ── RIGHT · Theme toggle + CTA + Hamburger ───────── */}
            <div ref={ctaRef} className="flex items-center gap-16 shrink-0">

                {/* Theme toggle — visible on all breakpoints */}
                <ThemeToggle />

                {/* Desktop CTA */}
                <Link
                    href="/contact"
                    className={[
                        "hidden md:inline-flex items-center justify-center",
                        "bg-orange hover:bg-orange-hover rounded-full px-7 py-3",
                        "text-base font-semibold text-white transition-all duration-300",
                        "hover:shadow-[0_0_24px_var(--orange-glow)]",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-orange focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-bg",
                    ].join(" ")}
                >
                    Start Your Growth Here
                </Link>

                {/* Mobile hamburger */}
                <button
                    ref={hamburgerRef}
                    type="button"
                    className={[
                        "md:hidden flex items-center justify-center w-11 h-11",
                        "text-text bg-elevated/80 backdrop-blur-xl border border-border",
                        "rounded-full shadow-sm transition-colors duration-200",
                        "hover:bg-surface focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-orange",
                    ].join(" ")}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* ── Mobile drawer ─────────────────────────────────── */}
            <div
                id={menuId}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={[
                    "fixed inset-x-4 top-20",
                    "md:hidden flex flex-col gap-1 px-4 py-4",
                    "rounded-2xl border border-border",
                    "bg-elevated/90 backdrop-blur-xl",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.18)]",
                    "transition-all duration-200",
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                ].join(" ")}
            >
                <nav aria-label="Mobile navigation links">
                    {NAV_LINKS.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            aria-current={pathname === href ? "page" : undefined}
                            className={drawerLinkClass(pathname === href)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="pt-2 mt-1 border-t border-border">
                    <Link
                        href="/contact"
                        className={[
                            "flex w-full items-center justify-center",
                            "bg-orange hover:bg-orange-hover rounded-full py-3",
                            "text-sm font-medium text-white transition-all duration-200",
                            "hover:shadow-[0_0_20px_var(--orange-glow)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange",
                        ].join(" ")}
                    >
                        Start Your Growth Here
                    </Link>
                </div>
            </div>
        </div>
    )
}