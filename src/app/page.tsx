'use client'

import { useState } from 'react'

export default function Home() {
  const [creating] = useState(false)

  function handleCreate(type: 'sheet' | 'doc') {
    // Redirect to signup with return intent
    window.location.href = `/signup?then=${type}`
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[hsl(201,100%,13%)] text-white">
      {/* Fullscreen background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div
          className="text-3xl tracking-tight text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          OpenOfficeAI<sup className="text-xs">&#174;</sup>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-white transition-colors">Home</a>
          <a href="/dashboard" className="text-sm text-[hsl(240,4%,66%)] hover:text-white transition-colors">Dashboard</a>
          <a href="/login" className="text-sm text-[hsl(240,4%,66%)] hover:text-white transition-colors">Log in</a>
        </div>

        <a
          href="/signup"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-6 pb-20">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-6xl font-normal animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Spreadsheets & docs,{' '}
          <em className="not-italic text-[hsl(240,4%,66%)]">created by code.</em>
        </h1>

        <p className="text-[hsl(240,4%,66%)] text-sm sm:text-base max-w-lg mt-5 leading-relaxed animate-fade-rise-delay">
          One API call creates a full spreadsheet or document.
          You get a shareable link. Anyone can open and edit it — no signup needed.
          Built for AI agents, automations, and developers.
        </p>

        <div className="flex flex-wrap gap-4 mt-8 animate-fade-rise-delay-2">
          <button
            onClick={() => handleCreate('sheet')}
            disabled={creating}
            className="liquid-glass rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] transition-transform cursor-pointer disabled:opacity-50"
          >
            New Spreadsheet
          </button>
          <button
            onClick={() => handleCreate('doc')}
            disabled={creating}
            className="liquid-glass rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] transition-transform cursor-pointer disabled:opacity-50"
          >
            New Document
          </button>
        </div>

      </section>
    </div>
  )
}
