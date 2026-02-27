/**
 * Hero Section — Production-Grade Component
 *
 * Colors: all token-based (bg-bg, text-text, text-orange, etc.)
 * GSAP: unchanged — animations target opacity/transform only,
 *       which are unaffected by the theme transition on colors.
 */

"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ArrowRight, ChevronRight } from "lucide-react"

const TRUST_BADGES = [
    "AI-Driven Strategy",
    "Full-Stack Execution",
    "ROI-First Systems",
    "Dedicated Growth Team",
] as const

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const headRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return
        if (!headRef.current || !subRef.current || !ctaRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
            tl
                .to(headRef.current, { y: 0, opacity: 1, duration: 1 })
                .to(subRef.current, { y: 0, opacity: 1, duration: 0.85 }, "-=0.6")
                .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.75 }, "-=0.5")
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            aria-label="Hero — 7ZeroMedia"
            className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden
                       px-6 md:px-16 lg:px-24
                       pt-28 pb-12 md:pt-48 lg:pt-40"
        >
            {/* ── Decorative background ─────────────────────────── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none overflow-hidden select-none"
            >
                {/* Grid lines */}
                {/* <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                /> */}
                {/* Orange ambient glow */}
                <div
                    className="absolute top-[-10%] right-[-5%] rounded-full"
                    style={{
                        width: "min(900px, 90vw)",
                        height: "min(900px, 90vw)",
                        background: "radial-gradient(circle, var(--orange-muted) 0%, transparent 95%)",
                        willChange: "transform",
                    }}
                />
            </div>

            {/* ── Content ───────────────────────────────────────── */}
            <div className="relative w-full max-w-5xl 2xl:max-w-6xl">

                {/* H1 */}
                <h1
                    ref={headRef}
                    className="hero-animate
                               text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                               font-bold leading-[1.03] tracking-tight
                               mb-6 md:mb-8 text-text"
                    style={{ transform: "translateY(60px)" }}
                >
                    Media &amp; Marketing Growth
                    <br />
                    <span className="text-text/20" aria-hidden="true">
                        System That
                    </span>
                    <br />
                    <span
                        className="text-gradient"
                        style={{ color: "var(--orange)" }}
                        aria-label="Scale Brands."
                    >
                        Scale Brands.
                    </span>
                </h1>

                {/* Subheading */}
                <p
                    ref={subRef}
                    className="hero-animate
                               text-base md:text-lg xl:text-xl
                               text-text-soft max-w-2xl
                               mb-10 md:mb-12 leading-relaxed"
                    style={{ transform: "translateY(30px)" }}
                >
                    We don&apos;t run campaigns — we build growth infrastructure.
                    Content systems, distribution engines, and performance loops
                    that compound revenue month over month.
                </p>

                {/* CTA Buttons */}
                <div
                    ref={ctaRef}
                    className="hero-animate flex flex-col sm:flex-row flex-wrap
                               items-start sm:items-center gap-3 md:gap-4"
                    style={{ transform: "translateY(20px)" }}
                >
                    {/* Primary CTA */}
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2
                                   px-6 py-3 md:px-7 md:py-3.5
                                   rounded-xl bg-orange text-white
                                   font-semibold text-sm tracking-wide
                                   hover:bg-orange-hover transition-all duration-200
                                   hover:shadow-[0_8px_30px_var(--orange-muted)]
                                   w-full sm:w-auto justify-center sm:justify-start
                                   focus-visible:outline-none focus-visible:ring-2
                                   focus-visible:ring-orange focus-visible:ring-offset-2
                                   focus-visible:ring-offset-bg"
                    >
                        Start Your Growth System
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2
                                   px-6 py-3 md:px-7 md:py-3.5
                                   rounded-xl border border-border
                                   text-text font-medium text-sm
                                   hover:border-border/60 hover:bg-surface
                                   transition-all duration-200
                                   w-full sm:w-auto justify-center sm:justify-start
                                   focus-visible:outline-none focus-visible:ring-2
                                   focus-visible:ring-border focus-visible:ring-offset-2"
                    >
                        Explore Services
                        <ChevronRight size={16} aria-hidden="true" />
                    </Link>
                </div>

                {/* Trust Strip */}
                <ul
                    role="list"
                    aria-label="Our core capabilities"
                    className="flex flex-wrap items-center gap-4 md:gap-6
                               mt-12 md:mt-16 pt-8 md:pt-10
                               border-t border-border
                               list-none p-0 m-0"
                >
                    {TRUST_BADGES.map((item) => (
                        <li
                            key={item}
                            role="listitem"
                            className="flex items-center gap-2
                                       text-xs text-text-soft
                                       font-medium tracking-wide"
                        >
                            <span
                                aria-hidden="true"
                                className="w-1 h-1 rounded-full bg-orange shrink-0"
                            />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}