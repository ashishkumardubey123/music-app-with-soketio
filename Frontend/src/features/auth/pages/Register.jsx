import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router";

function OrbitMark() {
  return (
    <div className="relative h-9 w-9 shrink-0">
      <style>{`
        @keyframes electronOrbitA { to { transform: rotate(360deg); } }
        @keyframes electronOrbitB { to { transform: rotate(-360deg); } }
        @keyframes nucleusPulse { 0%, 100% { transform: scale(.84); opacity: .7; } 50% { transform: scale(1.15); opacity: 1; } }
        .electron-a { animation: electronOrbitA 7s linear infinite; transform-origin: 20px 20px; }
        .electron-b { animation: electronOrbitB 10s linear infinite; transform-origin: 20px 20px; }
        .electron-c { animation: electronOrbitA 13s linear infinite; transform-origin: 20px 20px; }
        .nucleus-pulse { animation: nucleusPulse 2.4s ease-in-out infinite; transform-origin: 20px 20px; }
        @media (prefers-reduced-motion: reduce) {
          .electron-a, .electron-b, .electron-c, .nucleus-pulse { animation: none; }
        }
      `}</style>
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <circle cx="20" cy="20" r="18" fill="#1a1512" stroke="#573824" strokeWidth="1" />
        <g fill="none" stroke="#9a5b32" strokeWidth=".7">
          <circle cx="20" cy="20" r="6.5" />
          <circle cx="20" cy="20" r="10.5" />
          <circle cx="20" cy="20" r="15" />
        </g>
        <g className="electron-a"><circle cx="20" cy="13.5" r="1.5" fill="#fb923c" /><circle cx="20" cy="26.5" r="1.15" fill="#fdba74" /></g>
        <g className="electron-b"><circle cx="20" cy="9.5" r="1.25" fill="#f97316" /><circle cx="20" cy="30.5" r="1.55" fill="#fb923c" /></g>
        <g className="electron-c"><circle cx="20" cy="5" r="1.1" fill="#fdba74" /><circle cx="20" cy="35" r="1.3" fill="#f97316" /></g>
        <circle className="nucleus-pulse" cx="20" cy="20" r="5" fill="#f97316" fillOpacity=".22" />
        <circle cx="20" cy="20" r="2.6" fill="#f97316" /><circle cx="19.2" cy="19.2" r=".8" fill="#fff7ed" />
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <OrbitMark />
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-xl tracking-tight text-white">Perplexity</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">AI</span>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type = "text", placeholder, name, autoComplete, toggle, show, onToggle, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-400">{label}</span>
      <div className="relative flex items-center">
        <Icon size={17} className="pointer-events-none absolute left-3.5 text-neutral-500" />
        <input
          type={toggle ? (show ? "text" : "password") : type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-[#4a3427] bg-[#11100e] py-3 pl-11 pr-11 text-sm text-stone-100 placeholder-neutral-600 outline-none transition-colors focus:border-orange-500"
        />
        {toggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 text-neutral-500 transition-colors hover:text-neutral-300"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </label>
  );
}

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Wire this up to your backend call (e.g. axios.post('/api/register', formData))
    console.log("Register submitted:", formData);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#11100f] text-stone-100">

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Hero */}
        <div className="hidden flex-col justify-between p-12 md:flex">
          <Logo />
          <div className="max-w-md">
            <h1 className="font-serif text-5xl font-light leading-tight text-white">
              Every answer
              <br />
              <span className="italic text-amber-300">starts here.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-400">
              Create an account and start exploring what you're curious about.
            </p>
          </div>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Perplexity AI — every answer, sourced.
          </p>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex justify-center md:hidden">
              <Logo />
            </div>

            <div className="rounded-2xl border border-[#4a3427] bg-[#1a1714] p-8 sm:p-9">
              <h2 className="font-serif text-2xl text-stone-100">Create an account</h2>
              <p className="mb-7 mt-1.5 text-sm text-neutral-400">Just a few details to get you started.</p>

              <div className="space-y-5">
                <Field
                  icon={User}
                  label="Username"
                  name="username"
                  autoComplete="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <Field
                  icon={Mail}
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Field
                  icon={Lock}
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  toggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-neutral-600">
                By creating an account, you agree to our Terms and Privacy Policy.
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-sm font-semibold text-[#21130d] transition-colors hover:bg-orange-400"
              >
                Create account
                <ArrowRight size={16} />
              </button>

              <p className="mt-6 text-center text-sm text-neutral-400">
                  Already have an account?{" "}
                      
              <Link to="/login" className="font-medium text-stone-100 transition-colors hover:text-orange-400"> Login</Link>
        
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}