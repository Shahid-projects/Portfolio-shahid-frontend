import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

// ─── GOOGLE COLOR SYSTEM ─────────────────────────────────────────────────────
// Blue: #4285F4 | Red: #EA4335 | Yellow: #FBBC05 | Green: #34A853
// ─────────────────────────────────────────────────────────────────────────────

const portfolioData = {
    name: "Shahid Fakir",
    title: "Software Development Engineer",
    contact: {
        email: "shahidfakir48@gmail.com",
        phone: "+91 7499316285",
        linkedin: "https://www.linkedin.com/in/shahidFakir/",
        github: "https://github.com/Shahid-projects",
        instagram: "https://www.instagram.com/__shahid_28/"
    },
    about: "A passionate and driven Software Development Engineer with experience in building and optimizing scalable web applications and services. Proficient in full-stack development, with a strong foundation in data structures, algorithms, and cloud technologies. Eager to contribute to challenging projects and grow with a dynamic team.",
    skills: [
        { name: "Java", level: 90, color: "#EA4335" },
        { name: "DSA", level: 95, color: "#4285F4" },
        { name: "LLM Models", level: 85, color: "#34A853" },
        { name: "React", level: 95, color: "#4285F4" },
        { name: "Node.js", level: 90, color: "#34A853" },
        { name: "Spring Boot", level: 80, color: "#EA4335" },
        { name: "AWS", level: 75, color: "#FBBC05" },
        { name: "Databases", level: 85, color: "#4285F4" },
        { name: "HTML/CSS/JS", level: 95, color: "#EA4335" },
        { name: "Git", level: 90, color: "#34A853" },
    ],
    experience: [
        {
            role: "Software Development Engineer Intern",
            company: "Nobel Technology India Pvt Ltd",
            period: "July 2025 – Present",
            description: "Worked on low-level design and implementation for APIs for a redesigned Store Launch Tool. Redesigned an existing API, achieving a 90% reduction in latency. Implemented business and tech metrics in high-traffic micro-services.",
            accent: "#4285F4",
        },
        {
            role: "MERN Stack Intern",
            company: "Inovitrix India Pvt Ltd",
            period: "Feb 2024 – Mar 2025",
            description: "Developed a full-scale online food delivery platform. Integrated backend APIs for real-time data retrieval. Designed a user-friendly interface with real-time notifications and a ratings system.",
            accent: "#34A853",
        },
    ],
    education: [
        {
            degree: "Masters of Computer Application",
            institution: "VPIMSR College Sangli",
            period: "2025 – 2026",
            cgpa: "8.5 CGPA",
            accent: "#EA4335",
        },
        {
            degree: "B.Tech in Computer Science",
            institution: "Willingdon College Sangli",
            period: "2021 – 2024",
            cgpa: "8.7 CGPA",
            accent: "#FBBC05",
        },
    ],
    projects: [
      
    {
        title: "CureConnect – Integrated OPD & Hyperlocal Pharmacy Network",
        thumbnail: "/cureconnect.png",
        description:
            "Built and deployed a full-stack healthcare platform using the MERN stack for OPD queue management and real-time medicine discovery across nearby pharmacies. Implemented geolocation-based medicine search, QR-based reservation system, JWT authentication, and role-based dashboards.",
        stack: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT",
            "REST API",
            "Vercel",
            "Render"
        ],
        link: "https://your-project-link.com",
        accent: "#4285F4",
        label: "Healthcare",
    },
],
    
};

const PROFILE_IMAGE_URL = "/shahid.jpeg";
const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = {
    Mail: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    Linkedin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    Github: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
    Instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
};

// ─── GOOGLE LOGO LETTERS ─────────────────────────────────────────────────────
const GoogleColorName = ({ name }) => {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853", "#EA4335", "#4285F4", "#34A853", "#FBBC05", "#EA4335", "#4285F4", "#34A853"];
    return (
        <span style={{ fontFamily: "'Google Sans', 'Nunito', sans-serif", fontWeight: 700 }}>
            {name.split('').map((char, i) =>
                char === ' ' ? <span key={i}>&nbsp;</span> : (
                    <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
                )
            )}
        </span>
    );
};

// ─── GOOGLE DOTS LOADER ──────────────────────────────────────────────────────
const GoogleDots = () => (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '24px 0' }}>
        {GOOGLE_COLORS.map((color, i) => (
            <motion.div
                key={i}
                style={{ width: 12, height: 12, borderRadius: '50%', background: color }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 0.8, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
            />
        ))}
    </div>
);

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
const SectionTitle = ({ children, subtitle }) => (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{
            fontFamily: "'Google Sans', 'Nunito', sans-serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: '#202124',
            marginBottom: 12,
            letterSpacing: '-0.5px',
        }}>
            {children}
        </h2>
        {subtitle && <p style={{ color: '#5F6368', fontSize: 16, fontFamily: "'Roboto', sans-serif" }}>{subtitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
            {GOOGLE_COLORS.map((c, i) => (
                <motion.div
                    key={i}
                    style={{ height: 4, borderRadius: 2, background: c }}
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                />
            ))}
        </div>
    </div>
);

// ─── ANIMATED SECTION ────────────────────────────────────────────────────────
const AnimatedSection = ({ children, id, style = {} }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px 0px' });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    return (
        <motion.section
            id={id}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                hidden: { opacity: 0, y: 40 },
            }}
            style={{ padding: '80px 0', ...style }}
        >
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
                {children}
            </div>
        </motion.section>
    );
};

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = ["About", "Skills", "Experience", "Projects", "Contact"];
    const scroll = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); };

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: scrolled ? '1px solid #E8EAED' : '1px solid transparent',
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.08)' : 'none',
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <GoogleColorName name="Shahid" />
                </motion.div>

                {/* Desktop nav */}
                <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hide-mobile">
                    {navLinks.map((link, i) => (
                        <motion.button
                            key={link}
                            onClick={() => scroll(link)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '8px 16px', borderRadius: 20,
                                fontFamily: "'Roboto', sans-serif",
                                fontSize: 14, fontWeight: 500,
                                color: '#3C4043',
                                transition: 'all 0.2s',
                            }}
                            whileHover={{ background: '#F1F3F4', color: '#202124' }}
                        >
                            {link}
                        </motion.button>
                    ))}
                    <motion.a
                        href="/Shahid.pdf"
                        download
                        style={{
                            marginLeft: 8,
                            padding: '8px 20px',
                            borderRadius: 20,
                            background: '#4285F4',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "'Roboto', sans-serif",
                            display: 'flex', alignItems: 'center', gap: 6,
                        }}
                        whileHover={{ background: '#3367D6', scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Icon.Download /> Resume
                    </motion.a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="show-mobile"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3C4043' }}
                >
                    {isOpen ? <Icon.X /> : <Icon.Menu />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden', borderTop: '1px solid #E8EAED', background: '#fff' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 24px 16px' }}>
                            {navLinks.map((link) => (
                                <button
                                    key={link}
                                    onClick={() => scroll(link)}
                                    style={{
                                        background: 'none', border: 'none', textAlign: 'left',
                                        padding: '12px 0', cursor: 'pointer',
                                        fontFamily: "'Roboto', sans-serif", fontSize: 15,
                                        color: '#3C4043', borderBottom: '1px solid #F1F3F4',
                                    }}
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 64,
        }}>
            {/* Decorative blobs */}
            {[
                { color: '#4285F4', x: '-5%', y: '10%', size: 320, opacity: 0.07 },
                { color: '#EA4335', x: '80%', y: '5%', size: 280, opacity: 0.06 },
                { color: '#FBBC05', x: '60%', y: '70%', size: 240, opacity: 0.08 },
                { color: '#34A853', x: '5%', y: '75%', size: 200, opacity: 0.06 },
            ].map((blob, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute', borderRadius: '50%',
                        width: blob.size, height: blob.size,
                        background: blob.color,
                        left: blob.x, top: blob.y,
                        opacity: blob.opacity,
                        filter: 'blur(60px)',
                        zIndex: 0,
                    }}
                    animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}

            {/* Grid pattern */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: `
                    linear-gradient(rgba(66,133,244,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(66,133,244,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 800, margin: '0 auto' }}>
                {/* Search bar aesthetic */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: '#fff',
                        border: '1px solid #DFE1E5',
                        borderRadius: 24,
                        padding: '10px 20px',
                        marginBottom: 40,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                >
                    <Icon.Search />
                    <span style={{ fontFamily: "'Roboto', sans-serif", color: '#5F6368', fontSize: 14 }}>
                        shahidfakir48@gmail.com
                    </span>
                    {GOOGLE_COLORS.map((c, i) => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                    ))}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{
                        fontFamily: "'Google Sans', 'Nunito', sans-serif",
                        fontSize: 'clamp(48px, 8vw, 88px)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: 16,
                        letterSpacing: '-2px',
                    }}
                >
                    <GoogleColorName name={portfolioData.name} />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 'clamp(16px, 2.5vw, 22px)',
                        color: '#5F6368',
                        marginBottom: 48,
                        fontWeight: 400,
                        letterSpacing: '0.2px',
                    }}
                >
                    {portfolioData.title}
                </motion.p>

                <GoogleDots />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 32 }}
                >
                    <motion.button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '14px 32px', borderRadius: 24,
                            background: '#4285F4', color: '#fff',
                            border: 'none', cursor: 'pointer',
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: 15, fontWeight: 500,
                            boxShadow: '0 2px 12px rgba(66,133,244,0.35)',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}
                        whileHover={{ background: '#3367D6', y: -2, boxShadow: '0 6px 20px rgba(66,133,244,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        View My Work <Icon.Arrow />
                    </motion.button>
                    <motion.a
                        href="/Shahid.pdf" download="Shahid-Fakir-Resume.pdf"
                        style={{
                            padding: '14px 32px', borderRadius: 24,
                            background: '#fff', color: '#4285F4',
                            border: '1px solid #4285F4',
                            textDecoration: 'none',
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: 15, fontWeight: 500,
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}
                        whileHover={{ background: '#F8F9FF', y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Icon.Download /> Download Resume
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const About = () => (
    <AnimatedSection id="about" style={{ background: '#F8F9FA' }}>
        <SectionTitle subtitle="Get to know me">About Me</SectionTitle>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
            alignItems: 'center',
        }}>
            <motion.div
                style={{ display: 'flex', justifyContent: 'center' }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ position: 'relative' }}>
                    {/* Colored rings */}
                    {GOOGLE_COLORS.map((c, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                inset: -(i * 6 + 8),
                                borderRadius: '50%',
                                border: `3px solid ${c}`,
                                opacity: 0.25 - i * 0.04,
                                zIndex: 0,
                            }}
                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                        />
                    ))}
                    <img
                        src={PROFILE_IMAGE_URL}
                        alt={portfolioData.name}
                        style={{
                            width: 200, height: 200,
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '4px solid #fff',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            position: 'relative', zIndex: 1,
                        }}
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <p style={{
                    fontFamily: "'Google Sans', 'Nunito', sans-serif",
                    fontSize: 22, fontWeight: 700,
                    color: '#4285F4', marginBottom: 16,
                }}>
                    Hello, I'm {portfolioData.name}! 👋
                </p>
                <p style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 16, lineHeight: 1.75,
                    color: '#3C4043',
                }}>
                    {portfolioData.about}
                </p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                    {[
                        { label: 'Projects', value: '3+', color: '#4285F4' },
                        { label: 'CGPA', value: '8.7', color: '#34A853' },
                        { label: 'Latency Cut', value: '90%', color: '#EA4335' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: '#fff',
                            border: `2px solid ${stat.color}20`,
                            borderRadius: 16,
                            padding: '16px 24px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, fontFamily: "'Google Sans', 'Nunito', sans-serif" }}>{stat.value}</div>
                            <div style={{ fontSize: 12, color: '#5F6368', fontFamily: "'Roboto', sans-serif", marginTop: 4 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    </AnimatedSection>
);

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const Skills = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px 0px' });

    return (
        <AnimatedSection id="skills" style={{ background: '#fff' }}>
            <SectionTitle subtitle="Technologies I work with">Technical Skills</SectionTitle>
            <div ref={ref} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 20,
            }}>
                {portfolioData.skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        style={{
                            background: '#fff',
                            border: `1.5px solid #E8EAED`,
                            borderRadius: 16,
                            padding: '20px 20px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            transition: 'all 0.2s',
                        }}
                        whileHover={{
                            y: -4,
                            borderColor: skill.color,
                            boxShadow: `0 8px 24px ${skill.color}20`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <span style={{
                                fontFamily: "'Roboto', sans-serif",
                                fontSize: 14, fontWeight: 500, color: '#202124',
                            }}>{skill.name}</span>
                            <span style={{
                                fontSize: 13, fontWeight: 600,
                                color: skill.color,
                                fontFamily: "'Google Sans', 'Nunito', sans-serif",
                            }}>{skill.level}%</span>
                        </div>
                        <div style={{ background: '#F1F3F4', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', borderRadius: 4, background: skill.color }}
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${skill.level}%` } : {}}
                                transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatedSection>
    );
};

// ─── EXPERIENCE & EDUCATION ───────────────────────────────────────────────────
const TimelineCard = ({ accent, period, title, subtitle, description, icon }) => (
    <motion.div
        style={{
            position: 'relative',
            paddingLeft: 28,
            paddingBottom: 36,
        }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        {/* Line */}
        <div style={{
            position: 'absolute', left: 10, top: 32, bottom: 0,
            width: 2, background: '#E8EAED',
        }} />
        {/* Dot */}
        <div style={{
            position: 'absolute', left: 0, top: 6,
            width: 22, height: 22, borderRadius: '50%',
            background: accent, boxShadow: `0 0 0 4px ${accent}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#fff',
        }}>
            {icon}
        </div>

        <div style={{
            background: '#fff',
            border: '1.5px solid #E8EAED',
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginLeft: 8,
        }}>
            <span style={{
                display: 'inline-block',
                background: `${accent}15`,
                color: accent,
                borderRadius: 12,
                padding: '3px 12px',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Roboto', sans-serif",
                marginBottom: 10,
            }}>{period}</span>
            <h3 style={{
                fontFamily: "'Google Sans', 'Nunito', sans-serif",
                fontSize: 17, fontWeight: 700, color: '#202124', marginBottom: 4,
            }}>{title}</h3>
            <p style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 14, color: accent, fontWeight: 500, marginBottom: 10,
            }}>{subtitle}</p>
            <p style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 14, color: '#5F6368', lineHeight: 1.6,
            }}>{description}</p>
        </div>
    </motion.div>
);

const Experience = () => (
    <AnimatedSection id="experience" style={{ background: '#F8F9FA' }}>
        <SectionTitle subtitle="My journey so far">Experience & Education</SectionTitle>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
        }}>
            <div>
                <h3 style={{
                    fontFamily: "'Google Sans', 'Nunito', sans-serif",
                    fontSize: 20, fontWeight: 700, color: '#202124',
                    marginBottom: 28,
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{
                        background: '#4285F415', color: '#4285F4',
                        borderRadius: 10, padding: '6px 14px', fontSize: 14,
                    }}>💼 Work</span>
                </h3>
                {portfolioData.experience.map((item, i) => (
                    <TimelineCard
                        key={i}
                        accent={item.accent}
                        period={item.period}
                        title={item.role}
                        subtitle={item.company}
                        description={item.description}
                        icon="●"
                    />
                ))}
            </div>
            <div>
                <h3 style={{
                    fontFamily: "'Google Sans', 'Nunito', sans-serif",
                    fontSize: 20, fontWeight: 700, color: '#202124',
                    marginBottom: 28,
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{
                        background: '#34A85315', color: '#34A853',
                        borderRadius: 10, padding: '6px 14px', fontSize: 14,
                    }}>🎓 Education</span>
                </h3>
                {portfolioData.education.map((item, i) => (
                    <TimelineCard
                        key={i}
                        accent={item.accent}
                        period={item.period}
                        title={item.degree}
                        subtitle={item.institution}
                        description={item.cgpa}
                        icon="●"
                    />
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => (
    <motion.div
        style={{
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1.5px solid #E8EAED',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
            y: -6,
            borderColor: project.accent,
            boxShadow: `0 16px 40px ${project.accent}20`,
        }}
    >
        {/* Thumbnail */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: `${project.accent}10` }}>
            {project.thumbnail ? (
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    className="project-img"
                />
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <GoogleColorName name={project.title} />
                </div>
            )}
            <span style={{
                position: 'absolute', top: 12, right: 12,
                background: project.accent, color: '#fff',
                borderRadius: 12, padding: '4px 12px',
                fontSize: 11, fontWeight: 600,
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: '0.5px',
            }}>
                {project.label}
            </span>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
                fontFamily: "'Google Sans', 'Nunito', sans-serif",
                fontSize: 18, fontWeight: 700, color: '#202124',
                marginBottom: 10,
            }}>{project.title}</h3>
            <p style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 14, color: '#5F6368', lineHeight: 1.65,
                marginBottom: 16, flex: 1,
            }}>{project.description}</p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {project.stack.map((tech, i) => (
                    <span key={i} style={{
                        background: `${GOOGLE_COLORS[i % 4]}12`,
                        color: GOOGLE_COLORS[i % 4],
                        borderRadius: 12,
                        padding: '4px 12px',
                        fontSize: 12, fontWeight: 500,
                        fontFamily: "'Roboto', sans-serif",
                    }}>
                        {tech}
                    </span>
                ))}
            </div>

            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: project.accent,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 14, fontWeight: 600,
                    textDecoration: 'none',
                }}
            >
                View Project <Icon.Arrow />
            </a>
        </div>
    </motion.div>
);

const Projects = () => (
    <AnimatedSection id="projects" style={{ background: '#fff' }}>
        <SectionTitle subtitle="Things I've built">Projects</SectionTitle>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
        }}>
            {portfolioData.projects.map((p, i) => (
                <ProjectCard key={i} project={p} index={i} />
            ))}
        </div>
    </AnimatedSection>
);

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ text: '', type: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ text: '', type: '' });
        setLoading(true);
        try {
            const res = await fetch('https://portfolio-shahid-backend.vercel.app/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus({ text: data.msg || "'Message sent! I'll get back to you soon.', type: 'success' "});
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus({ text: data.msg || 'Something went wrong.', type: 'error' });
            }
        } catch {
            setStatus({ text: 'Connection failed. Please try again later.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const socials = [
        { icon: 'Mail', href: `mailto:${portfolioData.contact.email}`, color: '#EA4335' },
        { icon: 'Phone', href: `tel:${portfolioData.contact.phone}`, color: '#34A853' },
        { icon: 'Linkedin', href: portfolioData.contact.linkedin, color: '#4285F4' },
        { icon: 'Github', href: portfolioData.contact.github, color: '#202124' },
        { icon: 'Instagram', href: portfolioData.contact.instagram, color: '#EA4335' },
    ];

    const inputStyle = {
        width: '100%', boxSizing: 'border-box',
        background: '#F8F9FA', border: '1.5px solid #E8EAED',
        borderRadius: 12, padding: '14px 16px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: 15, color: '#202124',
        outline: 'none', transition: 'border-color 0.2s',
    };

    return (
        <AnimatedSection id="contact" style={{ background: '#F8F9FA' }}>
            <SectionTitle subtitle="Let's build something together">Get In Touch</SectionTitle>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 48,
                alignItems: 'start',
            }}>
                {/* Left */}
                <div>
                    <h3 style={{
                        fontFamily: "'Google Sans', 'Nunito', sans-serif",
                        fontSize: 22, fontWeight: 700, color: '#202124', marginBottom: 16,
                    }}>Contact Information</h3>
                    <p style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 15, color: '#5F6368', lineHeight: 1.7, marginBottom: 28,
                    }}>
                        Open to opportunities, collaborations, or just a chat. Feel free to reach out!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                        {[
                            { label: 'Email', value: portfolioData.contact.email, href: `mailto:${portfolioData.contact.email}`, color: '#EA4335' },
                            { label: 'Phone', value: portfolioData.contact.phone, href: `tel:${portfolioData.contact.phone}`, color: '#34A853' },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    background: '#fff', borderRadius: 12, padding: '14px 18px',
                                    border: `1.5px solid ${item.color}20`,
                                    textDecoration: 'none',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                }}
                            >
                                <span style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: `${item.color}15`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: item.color, flexShrink: 0,
                                }}>
                                    {item.label === 'Email' ? <Icon.Mail /> : <Icon.Phone />}
                                </span>
                                <div>
                                    <div style={{ fontSize: 11, color: item.color, fontWeight: 600, fontFamily: "'Roboto', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                                    <div style={{ fontSize: 14, color: '#3C4043', fontFamily: "'Roboto', sans-serif" }}>{item.value}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
                        {socials.map((s, i) => {
                            const I = Icon[s.icon];
                            return (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: 44, height: 44, borderRadius: '50%',
                                        background: '#fff',
                                        border: `1.5px solid ${s.color}25`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: s.color,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    }}
                                    whileHover={{ scale: 1.12, background: `${s.color}10` }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <I />
                                </motion.a>
                            );
                        })}
                    </div>

                    <motion.a
                        href="/Shahid.pdf" download="Shahid-Fakir-Resume.pdf"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            background: '#4285F4', color: '#fff', borderRadius: 12,
                            padding: '14px 24px', textDecoration: 'none',
                            fontFamily: "'Roboto', sans-serif", fontSize: 15, fontWeight: 500,
                            boxShadow: '0 4px 16px rgba(66,133,244,0.3)',
                        }}
                        whileHover={{ background: '#3367D6', y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Icon.Download /> Download Resume
                    </motion.a>
                </div>

                {/* Form */}
                <div style={{
                    background: '#fff', borderRadius: 20, padding: 32,
                    border: '1.5px solid #E8EAED',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}>
                    {status.text && (
                        <div style={{
                            background: status.type === 'success' ? '#34A85315' : '#EA433515',
                            color: status.type === 'success' ? '#34A853' : '#EA4335',
                            borderRadius: 12, padding: '12px 16px',
                            fontFamily: "'Roboto', sans-serif", fontSize: 14,
                            marginBottom: 20,
                        }}>
                            {status.text}
                        </div>
                    )}

                    {[
                        { name: 'name', label: 'Your Name', type: 'text' },
                        { name: 'email', label: 'Email Address', type: 'email' },
                    ].map((field) => (
                        <div key={field.name} style={{ marginBottom: 18 }}>
                            <label style={{
                                display: 'block', fontFamily: "'Roboto', sans-serif",
                                fontSize: 13, fontWeight: 500, color: '#5F6368', marginBottom: 8,
                            }}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                required
                                value={form[field.name]}
                                onChange={handleChange}
                                disabled={loading}
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = '#4285F4'}
                                onBlur={(e) => e.target.style.borderColor = '#E8EAED'}
                            />
                        </div>
                    ))}

                    <div style={{ marginBottom: 24 }}>
                        <label style={{
                            display: 'block', fontFamily: "'Roboto', sans-serif",
                            fontSize: 13, fontWeight: 500, color: '#5F6368', marginBottom: 8,
                        }}>Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            required
                            value={form.message}
                            onChange={handleChange}
                            disabled={loading}
                            style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                            onFocus={(e) => e.target.style.borderColor = '#4285F4'}
                            onBlur={(e) => e.target.style.borderColor = '#E8EAED'}
                        />
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: '100%', padding: '14px',
                            background: loading ? '#ccc' : '#4285F4',
                            color: '#fff', border: 'none', borderRadius: 12,
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}
                        whileHover={!loading ? { background: '#3367D6' } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? (
                            <>
                                <motion.div
                                    style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #fff3', borderTopColor: '#fff' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                />
                                Sending...
                            </>
                        ) : 'Send Message'}
                    </motion.button>
                </div>
            </div>
        </AnimatedSection>
    );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
    <footer style={{
        background: '#202124', padding: '28px 24px',
        textAlign: 'center',
    }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
            {GOOGLE_COLORS.map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
        </div>
        <p style={{
            fontFamily: "'Roboto', sans-serif",
            color: '#9AA0A6', fontSize: 13,
        }}>
            © {new Date().getFullYear()} <GoogleColorName name="Shahid Fakir" />. All rights reserved.
        </p>
    </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
    useEffect(() => {
        document.body.style.background = '#fff';
        document.body.style.margin = '0';
        document.body.style.padding = '0';

        // Load Google Fonts
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&family=Nunito:wght@700;800&display=swap';
        document.head.appendChild(link);

        // Responsive + hover styles
        const style = document.createElement('style');
        style.textContent = `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #fff; }
            .hide-mobile { display: flex; }
            .show-mobile { display: none; }
            @media (max-width: 768px) {
                .hide-mobile { display: none !important; }
                .show-mobile { display: block !important; }
            }
            .project-img:hover { transform: scale(1.08); }
            html { scroll-behavior: smooth; }
        `;
        document.head.appendChild(style);
    }, []);

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif", background: '#fff' }}>
            <Header />
            <main style={{ paddingTop: 0 }}>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
