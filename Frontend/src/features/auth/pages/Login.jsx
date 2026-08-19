import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


function OrbitMark() {
  return (
    <div className="relative h-8 w-8 shrink-0">
      <style>{`
        @keyframes orbitSpinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitSpinB { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .orbit-a { animation: orbitSpinA 16s linear infinite; transform-origin: 50% 50%; }
        .orbit-b { animation: orbitSpinB 22s linear infinite; transform-origin: 50% 50%; }
        .orbit-c { animation: orbitSpinA 28s linear infinite; transform-origin: 50% 50%; }
        @media (prefers-reduced-motion: reduce) {
          .orbit-a, .orbit-b, .orbit-c { animation: none; }
        }
      `}</style>
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <circle cx="20" cy="20" r="2.2" className="fill-amber-400" />
        <g className="orbit-a text-teal-400">
          <ellipse cx="20" cy="20" rx="17" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="26 60" transform="rotate(18 20 20)" />
        </g>
        <g className="orbit-b text-amber-400/60">
          <ellipse cx="20" cy="20" rx="17" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="18 74" transform="rotate(-40 20 20)" />
        </g>
        <g className="orbit-c text-white/30">
          <ellipse cx="20" cy="20" rx="17" ry="8.5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="10 84" transform="rotate(70 20 20)" />
        </g>
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
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">AI</span>
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
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-teal-400"
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

export default function Login() {
 

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  const {handelLogin} = useAuth()
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {

  

    e.preventDefault();

    
     try {
       const payload = {
      email: formData.email,
      password: formData.password, 
     }

      const data = await handelLogin(payload)
       
    console.log(data)
     
    
     if(data.success== true) {
            toast.success("Login successful!");
        navigate("/")
     
    }
       
     }catch (err) {
      
      
      toast.error(err.message||"Login failed!" );
     }
    
       

        
   
  };
      
  if(!loading && user){
    return navigate("/")
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Hero */}
        <div className="hidden flex-col justify-between p-12 md:flex">
          <Logo />
          <div className="max-w-md">
            <h1 className="font-serif text-5xl font-light leading-tight text-white">
              Curiosity,
              <br />
              <span className="italic text-teal-300">answered.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-400">
              Sign in to pick up right where your questions left off.
            </p>
          </div>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Perplexity AI  every answer, sourced.
          </p>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex justify-center md:hidden">
              <Logo />
            </div>

            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl sm:p-9">
              <h2 className="font-serif text-2xl text-white">Welcome back</h2>
              <p className="mb-7 mt-1.5 text-sm text-neutral-400">Enter your details to continue.</p>

              <div className="space-y-5">
                <Field
                  icon={Mail}
                  label="Email or username"
                  name="email"
                  autoComplete="username"
                  placeholder="you@example.com or username"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Field
                  icon={Lock}
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  toggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
               
                <a href="#" className="text-teal-300 transition-colors m-auto hover:text-teal-200">
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-amber-400 py-3 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-90"
              >
                Sign in
                <ArrowRight size={16} />
              </button>

              <p className="mt-6 text-center text-sm text-neutral-400">
                New to Perplexity?{" "}
                <Link to="/register" className="font-medium text-white transition-colors hover:text-teal-300">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}