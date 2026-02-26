"use client"

/**
 * Footer — Production-Grade Component
 *
 * Colors: fully token-based (bg-surface, text-text, text-orange, border-border, etc.)
 * GSAP logic is unchanged — animations use opacity/transform only.
 */

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CURRENT_YEAR = new Date().getFullYear()

const QUICK_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
] as const

const SERVICES = [
    { name: "Branding & Marketing", href: "/services" },
    { name: "Strategic Social Media Growth", href: "/services" },
    { name: "Content Creation & Production", href: "/services" },
    { name: "Paid Ads & Performance Marketing", href: "/services" },
    { name: "Web Development & UX Systems", href: "/services" },
] as const

const SOCIAL_LINKS = [
    { name: "Instagram", href: "https://www.instagram.com/7zero.media?igsh=MTh0cDNjNmE0eTU1Yg==" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/7zeromedia/" },
    { name: "Website", href: "https://www.7zero.media" },
] as const

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const columnsRef = useRef<(HTMLDivElement | null)[]>([])
    const bottomBarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return
        if (!footerRef.current) return

        const ctx = gsap.context(() => {
            const columns = columnsRef.current.filter(Boolean)

            if (columns.length) {
                gsap.from(columns, {
                    y: 50, opacity: 0, stagger: 0.12, duration: 0.8,
                    ease: "power3.out",
                    clearProps: "transform,opacity,willChange",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 88%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                })
            }

            if (bottomBarRef.current) {
                gsap.from(bottomBarRef.current, {
                    y: 20, opacity: 0, duration: 0.7, delay: 0.55,
                    ease: "power2.out",
                    clearProps: "transform,opacity,willChange",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                })
            }
        }, footerRef)

        return () => ctx.revert()
    }, [])

    const colRef = (i: number) => (el: HTMLDivElement | null) => {
        columnsRef.current[i] = el
    }

    return (
        <footer
            ref={footerRef}
            aria-label="Site footer"
            className="relative border-t border-border bg-surface px-6 md:px-12 lg:px-20 py-12 md:py-16"
        >
            {/* Top accent line */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-orange/40 to-transparent pointer-events-none"
            />

            {/* ── Main grid ─────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                {/* Brand column */}
                <div ref={colRef(0)} className="sm:col-span-2 lg:col-span-1">
                    <Link
                        href="/"
                        aria-label="7ZeroMedia — Go to homepage"
                        className="inline-block mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded"
                    >
                        <span className="flex items-center gap-3 font-bold text-2xl text-text">
                            <Image
                                src="/logo.png"
                                alt="7ZeroMedia logo"
                                width={100}
                                height={100}
                                className="w-auto h-10 rounded-full"
                            />
                        </span>
                    </Link>

                    <p className="text-text-soft text-sm leading-relaxed mb-6">
                        AI-powered media marketing for modern brands. Transform your growth with intelligent automation.
                    </p>

                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-orange hover:text-orange-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded"
                    >
                        Let&apos;s Connect
                        <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>

                    {/* Social links */}
                    <div className="flex flex-wrap gap-3 mt-6" role="list" aria-label="Social media links">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                role="listitem"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${social.name} — opens in a new tab`}
                                className="text-xs border border-border text-text-soft hover:text-orange hover:border-orange/40 px-3 py-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div ref={colRef(1)}>
                    <h3 className="text-xs tracking-widest uppercase text-text-soft mb-5">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        {QUICK_LINKS.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-text-soft hover:text-orange text-sm transition-colors duration-300 hover:pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div ref={colRef(2)}>
                    <h3 className="text-xs tracking-widest uppercase text-text-soft mb-5">
                        Services
                    </h3>
                    <ul className="space-y-3">
                        {SERVICES.map((service) => (
                            <li key={service.name}>
                                <Link
                                    href={service.href}
                                    className="text-text-soft hover:text-orange text-sm transition-colors duration-300 hover:pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                                >
                                    {service.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div ref={colRef(3)}>
                    <h3 className="text-xs tracking-widest uppercase text-text-soft mb-5">
                        Contact Info
                    </h3>
                    <ul className="space-y-4 text-sm text-text-soft">
                        <li className="flex items-center gap-2.5">
                            <Mail size={14} aria-hidden="true" className="shrink-0 text-orange" />
                            <a
                                href="mailto:info@7zero.media"
                                aria-label="Email us at info@7zero.media"
                                className="hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                            >
                                info@7zero.media
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Phone size={14} aria-hidden="true" className="shrink-0 text-orange" />
                            <a
                                href="tel:+919961348942"
                                aria-label="Call us at +91 9961348942"
                                className="hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                            >
                                +91 9961348942
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ── Bottom bar ───────────────────────────────────── */}
            <div
                ref={bottomBarRef}
                className="flex border-t border-border pt-6 mt-4 flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-soft"
            >
                <p>© {CURRENT_YEAR} 7ZeroMedia. All rights reserved.</p>
                <nav aria-label="Legal links">
                    <div className="flex gap-4">
                        <Link
                            href="/privacy"
                            className="hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 rounded"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    )
}