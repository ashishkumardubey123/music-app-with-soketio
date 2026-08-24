import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ArrowUp, ChevronDown, Menu, MoreHorizontal, Plus, Search, Sparkles } from 'lucide-react'
import { useChat } from '../hooks/usechat'

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
        <circle cx="20" cy="20" r="18" fill="#171717" stroke="#404040" strokeWidth="1" />
        <g fill="none" stroke="#333333" strokeWidth=".7">
          <circle cx="20" cy="20" r="6.5" />
          <circle cx="20" cy="20" r="10.5" />
          <circle cx="20" cy="20" r="15" />
        </g>
        <g className="electron-a">
          <circle cx="20" cy="13.5" r="1.5" fill="#2dd4bf" />
          <circle cx="20" cy="26.5" r="1.15" fill="#fcd34d" />
        </g>
        <g className="electron-b">
          <circle cx="20" cy="9.5" r="1.25" fill="#fbbf24" />
          <circle cx="20" cy="30.5" r="1.55" fill="#5eead4" />
        </g>
        <g className="electron-c">
          <circle cx="20" cy="5" r="1.1" fill="#99f6e4" />
          <circle cx="20" cy="35" r="1.3" fill="#f59e0b" />
        </g>
        <circle className="nucleus-pulse" cx="20" cy="20" r="5" fill="#fbbf24" fillOpacity=".22" />
        <circle cx="20" cy="20" r="2.6" fill="#fbbf24" />
        <circle cx="19.2" cy="19.2" r=".8" fill="#fafaf9" />
      </svg>
    </div>
  );
}

const chats = [
  { title: 'Plan a weekend in Delhi', time: 'Just now', active: true },
  { title: 'Healthy breakfast ideas', time: 'Yesterday' },
  { title: 'Explain quantum computing', time: 'Yesterday' },
  { title: 'Best books to read', time: 'Mon' },
  { title: 'Build a morning routine', time: 'Sun' },
  { title: 'Easy pasta recipes', time: 'Sat' },
]

const messages = [
  { role: 'user', text: 'What are some good places to visit in Delhi this weekend?' },
  { role: 'assistant', text: 'Delhi has plenty to explore this weekend. Start with the quiet beauty of Humayun\'s Tomb, then walk through Lodhi Garden before sunset. For food, try Khan Market or the lively lanes of Chandni Chowk.' },
  { role: 'user', text: 'Can you suggest a simple plan for the day?' },
  { role: 'assistant', text: 'A relaxed itinerary could be: breakfast in Old Delhi, a late-morning visit to the Red Fort, an afternoon pause at Lodhi Garden, and dinner around Connaught Place.' },
]

function Dashboard() {

  const { initializeSocketConnection } = useChat()
  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    initializeSocketConnection()
  },[initializeSocketConnection])
   console.log(user)
  return (
    <main className="flex min-h-screen overflow-hidden bg-neutral-950 font-serif text-white">

      <aside className="flex min-h-screen w-[288px] flex-[0_0_288px] flex-col border-r border-white/10 bg-neutral-900 px-[18px] pb-5 pt-[29px] max-[700px]:w-16 max-[700px]:flex-[0_0_64px] max-[700px]:px-2.5 max-[700px]:py-5">
        <div className="flex items-center gap-2.5 px-[11px] pb-[31px] max-[700px]:justify-center max-[700px]:px-0 max-[700px]:pb-6">
          <OrbitMark />
          <div className="flex items-baseline gap-1.5 max-[700px]:hidden">
            <span className="text-xl tracking-tight text-white">Perplexity</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">AI</span>
          </div>
          <button className="ml-auto grid place-items-center bg-transparent text-neutral-500 hover:text-neutral-300 max-[700px]:hidden" aria-label="Open menu"><Menu size={19} /></button>
        </div>

        <button className="flex w-full items-center gap-[9px] rounded-lg border border-white/10 bg-white/5 px-3 py-[11px] text-left font-sans text-[13px] text-white hover:border-teal-400/60 max-[700px]:size-[42px] max-[700px]:justify-center max-[700px]:border-0 max-[700px]:p-0"><Plus size={17} className="text-teal-400" /> <span className="max-[700px]:hidden">New thread</span> <span className="ml-auto text-[11px] text-neutral-500 max-[700px]:hidden">⌘ K</span></button>
        <div className="my-[14px] mb-[27px] flex items-center gap-[9px] px-3 font-sans text-xs text-neutral-500 max-[700px]:hidden"><Search size={16} /><span>Search threads</span><kbd className="ml-auto text-[11px] text-neutral-600">⌘ /</kbd></div>

        <div className="px-[11px] pb-2.5 font-sans text-[11px] uppercase tracking-[.09em] text-neutral-500 max-[700px]:hidden">Your threads</div>
        <nav className="grid gap-[3px]" aria-label="Chat threads">
          {chats.map((chatItem) => (
            <button className={`group flex w-full items-center gap-2 rounded-lg px-[11px] py-2.5 text-left font-sans text-[13px] ${chatItem.active ? 'border border-teal-400/40 bg-white/5 text-white' : 'border border-transparent text-neutral-400 hover:bg-white/5 hover:text-white'} max-[700px]:h-[38px] max-[700px]:justify-center max-[700px]:p-0`} key={chatItem.title}>
              <span className="truncate max-[700px]:hidden">{chatItem.title}</span>
              <span className="ml-auto text-[11px] text-neutral-500 max-[700px]:hidden">{chatItem.time}</span>
              <span className={`hidden size-[7px] rounded-full border border-neutral-600 max-[700px]:block ${chatItem.active ? 'border-teal-400 bg-teal-400' : ''}`} />
            </button>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 px-2.5 pt-4 font-sans max-[700px]:justify-center max-[700px]:px-0">
          <div className="grid size-7 flex-[0_0_auto] place-items-center rounded-full bg-gradient-to-br from-teal-400 to-amber-400 text-xs font-bold text-neutral-950">{user?.username?.charAt(0).toUpperCase() || 'A'}</div>
          <div className="grid min-w-0 gap-[3px] max-[700px]:hidden"><strong className="truncate text-xs text-neutral-200">{user?.username || 'Ashish Kumar'}</strong><span className="text-[11px] text-neutral-500">Personal account</span></div>
          <MoreHorizontal size={18} className="ml-auto text-neutral-500 hover:text-neutral-300 max-[700px]:hidden" />
        </div>
      </aside>

      <section className="relative flex min-w-0 flex-1 flex-col">
        <header className="mx-auto flex w-[min(850px,calc(100%-80px))] items-center justify-between border-b border-white/10 py-[34px] max-[700px]:w-[calc(100%-36px)] max-[700px]:py-6">
          <div><span className="font-sans text-[10px] uppercase tracking-[.12em] text-neutral-500">Thread</span><h1 className="m-0 mt-[7px] text-[21px] font-normal tracking-[-.3px] text-white max-[700px]:text-lg">Plan a weekend in Delhi</h1></div>
          <button className="grid place-items-center bg-transparent text-neutral-500 hover:text-neutral-300" aria-label="More thread options"><MoreHorizontal size={20} /></button>
        </header>

        <div className="mx-auto w-[min(850px,calc(100%-80px))] flex-1 px-0 pb-[135px] pt-7 max-[700px]:w-[calc(100%-36px)] max-[700px]:pb-[145px]">
          <div className="mb-[29px] flex items-center gap-3 font-sans text-[11px] text-neutral-500 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10"><span>Today</span></div>
          {messages.map((message, index) => (
            <article className={`mb-[30px] flex max-w-[710px] gap-[13px] font-sans ${message.role === 'user' ? 'ml-auto max-w-[650px] flex-row-reverse' : ''}`} key={`${message.role}-${index}`}>
              {message.role === 'assistant' && <div className="grid size-7 flex-[0_0_auto] place-items-center rounded-full border border-teal-400/40 bg-white/5 text-teal-300"><Sparkles size={14} /></div>}
              <div className="min-w-0"><span className={`mb-[7px] mt-px block text-[11px] text-neutral-500 ${message.role === 'user' ? 'text-right' : ''}`}>{message.role === 'user' ? 'You' : 'Perplexity'}</span>
                <p className={`m-0 text-sm leading-[1.65] text-neutral-300 ${message.role === 'user' ? 'rounded-[12px_3px_12px_12px] border border-white/10 bg-white/5 px-[15px] py-3 text-white' : ''}`}>{message.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="fixed bottom-0 right-0 left-[288px] bg-neutral-950 px-[max(40px,calc((100%_-_850px)_/_2))] pb-[22px] pt-[18px] max-[700px]:left-16 max-[700px]:px-[18px] max-[700px]:pb-4 max-[700px]:pt-[14px]">
          <div className="flex min-h-[68px] items-end gap-3 rounded-xl border border-white/10 bg-white/5 px-[17px] pb-3 pl-[17px] pt-[14px] shadow-[0_9px_30px_rgba(0,0,0,.45)] transition-colors focus-within:border-teal-400">
            <textarea className="min-h-8 flex-1 resize-none border-0 bg-transparent font-sans text-sm leading-[1.5] text-white outline-none placeholder:text-neutral-600" aria-label="Ask a follow-up question" placeholder="Ask a follow-up question..." rows="1" />
            <div className="flex items-center gap-3.5"><button className="flex items-center gap-1 bg-transparent font-sans text-xs text-neutral-400 hover:text-neutral-200" aria-label="Choose model">Pro <ChevronDown size={14} /></button><button className="grid size-[31px] place-items-center rounded-lg bg-gradient-to-r from-teal-400 to-amber-400 text-neutral-950 hover:opacity-90" aria-label="Send message"><ArrowUp size={17} /></button></div>
          </div>
          <p className="m-[9px_0_0] text-center font-sans text-[10px] text-neutral-600">Perplexity can make mistakes. Check important info.</p>
        </div>
      </section>
    </main>
  )
}

export default Dashboard