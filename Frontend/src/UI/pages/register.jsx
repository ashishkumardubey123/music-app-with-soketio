import { useState } from "react";

/* ─────────────────────────────────────────────
   SyncPlay – Premium Register Page
   Stack : React + Tailwind CSS  (UI only)
   Design: Google Stitch / SyncPlay DS
────────────────────────────────────────────── */

// ── SVG Icons ─────────────────────────────────

const MusicNoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

// ── Reusable glass input with icon ─────────────

function GlassInput({ type = "text", placeholder, autoComplete, icon, rightSlot, animClass = "" }) {
  return (
    <div className={animClass}>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[#958da1]/70">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            w-full rounded-xl border border-white/10
            bg-white/5 py-3.5 pl-11 pr-4
            text-sm font-normal text-[#e4e1e9]
            placeholder:text-[#ccc3d8]/45
            outline-none transition-all duration-200
            focus:border-violet-600/70 focus:bg-violet-600/[0.06]
            focus:ring-2 focus:ring-violet-600/15
            focus:shadow-[0_0_12px_rgba(124,58,237,0.1)]
          "
          style={rightSlot ? { paddingRight: "3rem" } : {}}
        />
        {rightSlot && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Register Page ──────────────────────────────

export default function RegisterPage() {
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const EyeToggle = ({ show, onToggle, label }) => (
    <button
      type="button"
      aria-label={label}
      onClick={onToggle}
      className="
        flex items-center bg-transparent p-1
        text-[#958da1]/70 transition-colors duration-200
        hover:text-[#d2bbff] cursor-pointer border-none outline-none
      "
    >
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    /* ── Page wrapper ── */
    <div
      className="
        font-inter relative flex min-h-screen flex-col
        items-center justify-center overflow-hidden
        bg-[linear-gradient(135deg,#0a0a0f_0%,#0e0e1a_20%,#120d1f_40%,#0a0a0f_60%,#0d0d1a_80%,#0a0a0f_100%)]
        [background-size:400%_400%] animate-gradient-shift px-6 py-10
      "
    >
      {/* ── Aurora ambient blobs ── */}

      {/* Blob 1 – top-left violet */}
      <div
        className="
          pointer-events-none absolute -top-28 -left-20
          h-[520px] w-[520px] rounded-full
          bg-[radial-gradient(circle,rgba(124,58,237,0.28)_0%,transparent_70%)]
          blur-[60px] animate-glow-pulse
        "
      />

      {/* Blob 2 – bottom-right pink */}
      <div
        className="
          pointer-events-none absolute -bottom-20 -right-20
          h-[400px] w-[400px] rounded-full
          bg-[radial-gradient(circle,rgba(236,72,153,0.22)_0%,transparent_70%)]
          blur-[60px] animate-glow-pulse-slow
        "
      />

      {/* Blob 3 – mid-right blue */}
      <div
        className="
          pointer-events-none absolute top-[40%] right-[10%]
          h-[300px] w-[300px] rounded-full
          bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)]
          blur-[50px] animate-glow-pulse-slower
        "
      />

      {/* Card glow – centred halo */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2
          h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(124,58,237,0.15)_0%,transparent_65%)]
          blur-[80px] animate-glow-pulse
        "
      />

      {/* ── Glass Register Card ── */}
      <div
        className="
          relative z-10 w-full max-w-[460px] rounded-3xl
          border border-white/[0.11]
          bg-white/[0.06] px-10 pb-9 pt-10
          shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.06)]
          backdrop-blur-2xl
          animate-card-reveal
        "
      >
        {/* ── Logo & Tagline ── */}
        <div className="mb-6 flex flex-col items-center gap-2 text-center">

          {/* Logo row */}
          <div className="flex items-center gap-2.5">
            {/* Icon badge */}
            <span
              className="
                flex items-center justify-center rounded-xl p-2 text-white
                bg-gradient-to-br from-violet-600 to-pink-500
                shadow-[0_4px_16px_rgba(124,58,237,0.4)]
              "
            >
              <MusicNoteIcon />
            </span>

            {/* Brand name shimmer */}
            <span
              className="
                text-[28px] font-extrabold tracking-tight
                bg-[linear-gradient(90deg,#d2bbff,#7c3aed,#ec4899,#d2bbff)]
                [background-size:200%_auto]
                bg-clip-text text-transparent
                animate-shimmer
              "
            >
              SyncPlay
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[13px] font-normal tracking-wide text-[#ccc3d8]/65">
            Your music, perfectly in sync
          </p>
        </div>

        {/* ── Section heading ── */}
        <h1
          className="
            mb-6 text-center text-[20px] font-semibold tracking-tight text-white/90
          "
        >
          Create your account
        </h1>

        {/* ── Username ── */}
        <div className="mb-3.5 animate-fade-up">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[#958da1]/70">
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="Choose a username"
              autoComplete="username"
              className="
                w-full rounded-xl border border-white/10
                bg-white/5 py-3.5 pl-11 pr-4
                text-sm font-normal text-[#e4e1e9]
                placeholder:text-[#ccc3d8]/45
                outline-none transition-all duration-200
                focus:border-violet-600/70 focus:bg-violet-600/[0.06]
                focus:ring-2 focus:ring-violet-600/15
                focus:shadow-[0_0_12px_rgba(124,58,237,0.1)]
              "
            />
          </div>
        </div>

        {/* ── Email ── */}
        <div className="mb-3.5 animate-fade-up">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[#958da1]/70">
              <EmailIcon />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="
                w-full rounded-xl border border-white/10
                bg-white/5 py-3.5 pl-11 pr-4
                text-sm font-normal text-[#e4e1e9]
                placeholder:text-[#ccc3d8]/45
                outline-none transition-all duration-200
                focus:border-violet-600/70 focus:bg-violet-600/[0.06]
                focus:ring-2 focus:ring-violet-600/15
                focus:shadow-[0_0_12px_rgba(124,58,237,0.1)]
              "
            />
          </div>
        </div>

        {/* ── Password ── */}
        <div className="mb-3.5 animate-fade-up-delay">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[#958da1]/70">
              <LockIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className="
                w-full rounded-xl border border-white/10
                bg-white/5 py-3.5 pl-11 pr-12
                text-sm font-normal text-[#e4e1e9]
                placeholder:text-[#ccc3d8]/45
                outline-none transition-all duration-200
                focus:border-violet-600/70 focus:bg-violet-600/[0.06]
                focus:ring-2 focus:ring-violet-600/15
                focus:shadow-[0_0_12px_rgba(124,58,237,0.1)]
              "
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((p) => !p)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                flex items-center bg-transparent p-1 border-none outline-none
                text-[#958da1]/70 transition-colors duration-200
                hover:text-[#d2bbff] cursor-pointer
              "
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* ── Confirm Password ── */}
        <div className="mb-6 animate-fade-up-delay">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[#958da1]/70">
              <ShieldCheckIcon />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="
                w-full rounded-xl border border-white/10
                bg-white/5 py-3.5 pl-11 pr-12
                text-sm font-normal text-[#e4e1e9]
                placeholder:text-[#ccc3d8]/45
                outline-none transition-all duration-200
                focus:border-violet-600/70 focus:bg-violet-600/[0.06]
                focus:ring-2 focus:ring-violet-600/15
                focus:shadow-[0_0_12px_rgba(124,58,237,0.1)]
              "
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                flex items-center bg-transparent p-1 border-none outline-none
                text-[#958da1]/70 transition-colors duration-200
                hover:text-[#d2bbff] cursor-pointer
              "
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* ── Create Account Button ── */}
        <button
          type="button"
          className="
            mb-6 w-full cursor-pointer rounded-full border-none
            bg-[linear-gradient(90deg,#7c3aed,#a855f7,#ec4899)]
            [background-size:200%_auto]
            px-5 py-[15px]
            text-[15px] font-bold tracking-wide text-white
            shadow-[0_4px_20px_rgba(124,58,237,0.35)]
            transition-all duration-300
            hover:[background-position:right_center]
            hover:-translate-y-px hover:scale-[1.025]
            hover:shadow-[0_8px_30px_rgba(124,58,237,0.55),0_0_20px_rgba(236,72,153,0.2)]
            active:scale-[0.98]
          "
        >
          Create Account
        </button>

        {/* ── Already have account ── */}
        <p className="m-0 text-center text-[13px] text-[#958da1]/80">
          Already have an account?{" "}
          <a
            href="#"
            className="
              font-semibold text-[#d2bbff] no-underline
              transition-colors duration-200 hover:text-violet-400
            "
          >
            Login
          </a>
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-5">
        <a href="#" className="text-xs text-[#ccc3d8]/70 no-underline transition-colors duration-200 hover:text-[#d2bbff]">Privacy</a>
        <span className="text-xs text-white/15">·</span>
        <a href="#" className="text-xs text-[#ccc3d8]/70 no-underline transition-colors duration-200 hover:text-[#d2bbff]">Terms</a>
        <span className="text-xs text-white/15">·</span>
        <a href="#" className="text-xs text-[#ccc3d8]/70 no-underline transition-colors duration-200 hover:text-[#d2bbff]">Support</a>
        <span className="text-xs text-white/15">·</span>
        <span className="text-xs text-[#958da1]/40">© 2026 SyncPlay Audio. All rights reserved.</span>
      </div>
    </div>
  );
}
