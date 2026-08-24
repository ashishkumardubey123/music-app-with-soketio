import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#11100f] text-stone-100">

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Hero */}
        <div className="hidden flex-col justify-between p-12 md:flex">
          <Logo />
          <div className="max-w-md">
            <h1 className="font-serif text-5xl font-light leading-tight text-white">
              Curiosity,
              <br />
              <span className="italic text-orange-400">answered.</span>
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

            <div className="rounded-2xl border border-[#4a3427] bg-[#1a1714] p-8 sm:p-9">
              <h2 className="font-serif text-2xl text-stone-100">Welcome back</h2>
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
               
                <a href="#" className="text-orange-400 transition-colors m-auto hover:text-orange-300">
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-sm font-semibold text-[#21130d] transition-colors hover:bg-orange-400"
              >
                Sign in
                <ArrowRight size={16} />
              </button>

              <p className="mt-6 text-center text-sm text-neutral-400">
                New to Perplexity?{" "}
                <Link to="/register" className="font-medium text-stone-100 transition-colors hover:text-orange-400">
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