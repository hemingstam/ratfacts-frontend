import { useState, useEffect, useRef } from "react";

const API = "https://ratfacts-backend-production.up.railway.app/api";

const TICKER_FACTS = [
  "🐀 Rats cannot vomit. They just have to live with it.",
  "🐀 A group of rats is called a mischief.",
  "🐀 Rats can laugh. Ultrasonic. Deeply unsettling.",
  "🐀 Rats are cleaner than cats. Yes, really.",
  "🐀 Rats dream about mazes they ran during the day.",
  "🐀 A rat can tread water for 3 days straight.",
  "🐀 Rats' teeth are harder than platinum.",
  "🐀 Rats can be trained to drive tiny cars.",
  "🐀 Baby rats are called kittens. You're welcome.",
  "🐀 Norway rats are not from Norway. Norway is innocent.",
  "🐀 Rats feel regret. Tiny, furry regret.",
  "🐀 A rat can fit through a hole the size of a 50p coin.",
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0E0E1A;
    --navy2:  #16162A;
    --navy3:  #1E1E38;
    --cream:  #F5F0E8;
    --coral:  #FF4D4D;
    --coral2: #FF2626;
    --yellow: #FFD000;
    --green:  #39E88A;
    --muted:  #7070A0;
    --border: #2A2A4A;
    --text:   #F0EDE8;
    --card:   #16162A;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── TICKER ─────────────────────────────────────────── */
  .ticker-bar {
    background: var(--coral);
    padding: 10px 0;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }
  .ticker-bar::before, .ticker-bar::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 60px;
    z-index: 2;
  }
  .ticker-bar::before { left: 0; background: linear-gradient(to right, var(--coral), transparent); }
  .ticker-bar::after  { right: 0; background: linear-gradient(to left, var(--coral), transparent); }
  .ticker-track {
    display: inline-flex;
    gap: 64px;
    animation: ticker 40s linear infinite;
  }
  .ticker-track:hover { animation-play-state: paused; }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-item {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.3px;
    flex-shrink: 0;
  }

  /* ── HEADER ─────────────────────────────────────────── */
  .header {
    text-align: center;
    padding: 48px 24px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header-eyebrow {
    display: inline-block;
    background: rgba(255,77,77,0.15);
    border: 1px solid rgba(255,77,77,0.4);
    color: var(--coral);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .logo-lockup {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .logo-img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 16px rgba(255,77,77,0.3));
    animation: ratFloat 3s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes ratFloat {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50%       { transform: translateY(-6px) rotate(3deg); }
  }
  .header h1 {
    font-family: 'Bangers', cursive;
    font-size: clamp(64px, 12vw, 100px);
    letter-spacing: 3px;
    line-height: 0.9;
    color: var(--cream);
  }
  .header h1 span { color: var(--coral); }
  .header-sub {
    font-size: 15px;
    color: var(--muted);
    max-width: 360px;
    margin: 14px auto 0;
    line-height: 1.6;
  }

  /* ── MAIN LAYOUT ─────────────────────────────────────── */
  .main {
    max-width: 580px;
    margin: 0 auto;
    padding: 0 20px 80px;
  }

  /* ── CARDS ───────────────────────────────────────────── */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 16px;
  }
  .card-title {
    font-family: 'Bangers', cursive;
    font-size: 28px;
    letter-spacing: 1.5px;
    margin-bottom: 4px;
    color: var(--cream);
  }
  .card-sub {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 20px;
    line-height: 1.5;
  }

  /* ── AUTH CARD ───────────────────────────────────────── */
  .auth-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 32px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }
  .auth-card::before {
    content: '🐀';
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: 48px;
    opacity: 0.15;
    transform: rotate(15deg);
  }
  .auth-card h2 {
    font-family: 'Bangers', cursive;
    font-size: 36px;
    letter-spacing: 2px;
    margin-bottom: 6px;
    color: var(--cream);
  }
  .auth-card p {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 24px;
    line-height: 1.6;
  }

  /* ── INPUTS ──────────────────────────────────────────── */
  .field { margin-bottom: 12px; }
  .field label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .field input {
    width: 100%;
    background: var(--navy);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field input:focus {
    border-color: var(--coral);
    box-shadow: 0 0 0 3px rgba(255,77,77,0.12);
  }
  .field input::placeholder { color: #3A3A5A; }

  /* ── BUTTONS ─────────────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 24px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .btn-coral {
    background: var(--coral);
    color: #fff;
    width: 100%;
  }
  .btn-coral:hover:not(:disabled) {
    background: var(--coral2);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255,77,77,0.35);
  }
  .btn-coral:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-yellow {
    background: var(--yellow);
    color: #000;
    font-weight: 700;
    width: 100%;
  }
  .btn-yellow:hover:not(:disabled) {
    background: #FFE040;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255,208,0,0.35);
  }
  .btn-yellow:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-sm {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 8px;
    width: auto;
  }
  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1.5px solid var(--border);
  }
  .btn-ghost:hover { border-color: var(--muted); color: var(--text); }
  .btn-danger {
    background: transparent;
    color: #FF6B6B;
    border: 1.5px solid rgba(255,77,77,0.25);
  }
  .btn-danger:hover { background: rgba(255,77,77,0.1); }
  .btn-green {
    background: var(--green);
    color: #000;
    font-weight: 700;
  }
  .btn-green:hover:not(:disabled) {
    background: #2FDBA0;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(57,232,138,0.3);
  }
  .btn-green:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── STATS BAR ───────────────────────────────────────── */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .stat {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Bangers', cursive;
    font-size: 40px;
    letter-spacing: 1px;
    line-height: 1;
    color: var(--coral);
    display: block;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
    display: block;
  }

  /* ── VICTIM CARDS ────────────────────────────────────── */
  .victim-list { display: flex; flex-direction: column; gap: 12px; }
  .victim-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: center;
    transition: border-color 0.2s;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .victim-card:hover { border-color: #3A3A5A; }
  .victim-card.inactive { opacity: 0.5; }
  .victim-card.worm-mode { border-color: rgba(57,232,138,0.3); }

  .victim-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--cream);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 3px;
  }
  .victim-phone {
    font-size: 12px;
    color: var(--muted);
    font-family: monospace;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .victim-actions { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }

  /* ── PILL BADGES ─────────────────────────────────────── */
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .pill-active  { background: rgba(57,232,138,0.12); color: var(--green); }
  .pill-paused  { background: rgba(112,112,160,0.15); color: var(--muted); }
  .pill-worm    { background: rgba(57,232,138,0.2); color: var(--green); border: 1px solid rgba(57,232,138,0.3); }
  .pill-free    { background: rgba(255,208,0,0.12); color: var(--yellow); }
  .pill-donor   { background: rgba(255,77,77,0.12); color: var(--coral); }

  /* ── PROGRESS ────────────────────────────────────────── */
  .progress-wrap { margin-top: 8px; }
  .progress-label { font-size: 10px; color: #4A4A6A; margin-bottom: 4px; }
  .progress-bar {
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    width: 100%;
    max-width: 180px;
  }
  .progress-fill {
    height: 100%;
    background: var(--coral);
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  .progress-fill.worm { background: var(--green); }

  /* ── PAYWALL MODAL ───────────────────────────────────── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,5,14,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 32px;
    max-width: 440px;
    width: 100%;
    text-align: center;
    animation: modalIn 0.25s ease;
    position: relative;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .modal-rat {
    font-size: 56px;
    display: block;
    margin-bottom: 16px;
    animation: ratWiggle 2s ease-in-out infinite;
  }
  @keyframes ratWiggle {
    0%,100% { transform: rotate(-6deg); }
    50%      { transform: rotate(6deg); }
  }
  .modal h2 {
    font-family: 'Bangers', cursive;
    font-size: 38px;
    letter-spacing: 2px;
    color: var(--cream);
    margin-bottom: 8px;
  }
  .modal p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .modal-perks {
    background: var(--navy3);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    text-align: left;
  }
  .modal-perk {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--text);
    padding: 6px 0;
  }
  .modal-perk .check { color: var(--green); font-size: 16px; flex-shrink: 0; }
  .modal-close {
    position: absolute;
    top: 16px; right: 16px;
    background: none;
    border: none;
    color: var(--muted);
    font-size: 20px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    line-height: 1;
  }
  .modal-close:hover { color: var(--text); background: var(--border); }

  /* ── SUCCESS BANNER ──────────────────────────────────── */
  .donor-banner {
    background: linear-gradient(135deg, rgba(255,77,77,0.15), rgba(255,208,0,0.1));
    border: 1px solid rgba(255,77,77,0.3);
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    color: var(--text);
  }

  /* ── USER BAR ────────────────────────────────────────── */
  .user-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: var(--navy2);
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--muted);
  }
  .user-bar-left { display: flex; align-items: center; gap: 10px; }
  .user-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 6px rgba(57,232,138,0.5);
  }

  /* ── TOAST ───────────────────────────────────────────── */
  .toast-area {
    position: fixed;
    bottom: 24px; right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 9999;
    max-width: 320px;
  }
  .toast {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--coral);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--text);
    animation: toastIn 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    line-height: 1.5;
  }
  .toast.success { border-left-color: var(--green); }
  .toast.error   { border-left-color: #FF6B6B; }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── EMPTY STATE ─────────────────────────────────────── */
  .empty {
    text-align: center;
    padding: 48px 24px;
    background: var(--card);
    border: 1.5px dashed var(--border);
    border-radius: 16px;
  }
  .empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.6; }
  .empty p { font-size: 15px; color: var(--muted); line-height: 1.6; }

  /* ── SECTION LABEL ───────────────────────────────────── */
  .section-label {
    font-family: 'Bangers', cursive;
    font-size: 22px;
    letter-spacing: 1.5px;
    color: var(--cream);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── FREE LIMIT BAR ──────────────────────────────────── */
  .limit-notice {
    background: rgba(255,208,0,0.08);
    border: 1px solid rgba(255,208,0,0.25);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--yellow);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .limit-notice:hover { background: rgba(255,208,0,0.12); }

  /* ── LINK ────────────────────────────────────────────── */
  .link {
    color: var(--coral);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  .link:hover { text-decoration: underline; }

  /* ── NOTE ────────────────────────────────────────────── */
  .note {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 10px;
  }

  /* ── DIVIDER ─────────────────────────────────────────── */
  .divider {
    height: 1px;
    background: var(--border);
    margin: 24px 0;
  }

  /* ── RESPONSIVE ──────────────────────────────────────── */
  @media (max-width: 560px) {
    .stats-bar { grid-template-columns: repeat(3, 1fr); }
  .header h1 { font-size: 72px; }
    .victim-card { grid-template-columns: 1fr; }
    .victim-actions { flex-wrap: wrap; }
    .modal { padding: 28px 20px; }
    .auth-card { padding: 28px 20px; }
  }
`;

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────



function Ticker() {
  const doubled = [...TICKER_FACTS, ...TICKER_FACTS];
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {doubled.map((f, i) => (
          <span key={i} className="ticker-item">{f}</span>
        ))}
      </div>
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="toast-area">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>
      ))}
    </div>
  );
}

function PaywallModal({ onClose, onDonate, loading }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <span className="modal-rat">🐀</span>
        <h2>Unleash More Rats</h2>
        <p>You've used your free victim. Donate just $1 to unlock unlimited chaos.</p>
        <div className="modal-perks">
          <div className="modal-perk"><span className="check">✓</span> Unlimited victims</div>
          <div className="modal-perk"><span className="check">✓</span> Facts run forever — never stops</div>
          <div className="modal-perk"><span className="check">✓</span> Worm Facts unlocked (reply NO to trigger)</div>
          <div className="modal-perk"><span className="check">✓</span> Smug donor badge</div>
        </div>
        <button className="btn btn-yellow" onClick={onDonate} disabled={loading}>
          {loading ? "Redirecting..." : "🐀 Donate $1 and unleash the rats"}
        </button>
        <p className="note" style={{ marginTop: 12 }}>Pay what you want — minimum $1. No subscription, ever.</p>
      </div>
    </div>
  );
}

function VictimCard({ victim, onToggle, onDelete, onSendNow, sending, isDonor }) {
  const totalFacts = 30;
  const isWorm = victim.wormMode;
  const pct = isWorm
    ? Math.round((victim.wormFactIndex / 10) * 100)
    : Math.round((victim.factIndex / totalFacts) * 100);

  return (
    <div className={`victim-card ${!victim.active && !isWorm ? "inactive" : ""} ${isWorm ? "worm-mode" : ""}`}>
      <div>
        <div className="victim-name">
          {isWorm ? "🪱" : "🐀"} {victim.name}
          <span className={`pill ${isWorm ? "pill-worm" : victim.active ? "pill-active" : "pill-paused"}`}>
            {isWorm ? "Worm mode" : victim.active ? "Active" : "Paused"}
          </span>
          {!isDonor && <span className="pill pill-free">Free</span>}
        </div>
        <div className="victim-phone">{victim.phone}</div>
        <div className="progress-wrap">
          <div className="progress-label">
            {isWorm
              ? `Worm fact ${victim.wormFactIndex}/10`
              : `Rat fact ${victim.factIndex}/${totalFacts} · Day ${victim.daysSent}`}
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${isWorm ? "worm" : ""}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
        {victim.lastSentAt && (
          <div style={{ fontSize: 11, color: "#4A4A6A", marginTop: 6 }}>
            Last sent {new Date(victim.lastSentAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
            })}
          </div>
        )}
      </div>
      <div className="victim-actions">
        <button
          className="btn btn-sm btn-green"
          onClick={() => onSendNow(victim.id, victim.name)}
          disabled={sending[victim.id]}
        >
          {sending[victim.id] ? "..." : isWorm ? "🪱 Send" : "🐀 Send"}
        </button>
        {!isWorm && (
          <button className="btn btn-sm btn-ghost" onClick={() => onToggle(victim.id)} title={victim.active ? "Pause" : "Resume"}>
            {victim.active ? "⏸" : "▶️"}
          </button>
        )}
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(victim.id, victim.name)}>
          🗑
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function RatFacts() {
  const [screen, setScreen] = useState("login"); // login | magic-sent | app
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [victims, setVictims] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);
  const [sending, setSending] = useState({});
  const [showPaywall, setShowPaywall] = useState(false);
  const [toasts, setToasts] = useState([]);

  // On mount: check for stored session
  useEffect(() => {
    const stored = localStorage.getItem("rf_user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setScreen("app");
      fetchVictims(u.userId);
    }
  }, []);

  function toast(msg, type = "success") {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4500);
  }

  async function requestMagicLink() {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setScreen("magic-sent");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchVictims(userId) {
    try {
      const res = await fetch(`${API}/victims`, {
        headers: { "x-user-id": userId },
      });
      const data = await res.json();
      if (res.ok) setVictims(data);
    } catch {}
  }

  async function addVictim() {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/victims`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user.userId },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (data.upgradeRequired) { setShowPaywall(true); return; }
      if (!res.ok) throw new Error(data.error || "Failed");
      setVictims(p => [data, ...p]);
      setName(""); setPhone("");
      toast(`🐀 ${data.name} is enrolled. The rats are ready.`);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteVictim(id, vName) {
    try {
      const res = await fetch(`${API}/victims/${id}`, {
        method: "DELETE",
        headers: { "x-user-id": user.userId },
      });
      if (!res.ok) throw new Error("Failed");
      setVictims(p => p.filter(v => v.id !== id));
      toast(`${vName} has been spared. For now.`);
    } catch { toast("Failed to remove", "error"); }
  }

  async function toggleVictim(id) {
    try {
      const res = await fetch(`${API}/victims/${id}/toggle`, {
        method: "PATCH",
        headers: { "x-user-id": user.userId },
      });
      const data = await res.json();
      setVictims(p => p.map(v => v.id === id ? data : v));
      toast(data.active ? "▶️ Resumed. The rats are back." : "⏸ Paused.");
    } catch { toast("Failed", "error"); }
  }

  async function sendNow(id, vName) {
    setSending(p => ({ ...p, [id]: true }));
    try {
      const res = await fetch(`${API}/victims/${id}/send-now`, {
        method: "POST",
        headers: { "x-user-id": user.userId },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setVictims(p => p.map(v => v.id === id ? data.victim : v));
      toast(`🐀 Fact dispatched to ${vName}.`);
    } catch (err) { toast(err.message, "error"); }
    finally { setSending(p => ({ ...p, [id]: false })); }
  }

  async function startDonate() {
    setDonateLoading(true);
    try {
      const res = await fetch(`${API}/stripe/checkout`, {
        method: "POST",
        headers: { "x-user-id": user.userId },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      toast(err.message, "error");
      setDonateLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("rf_user");
    setUser(null);
    setVictims([]);
    setScreen("login");
  }

  const activeCount = victims.filter(v => v.active && !v.wormMode).length;
  const wormCount   = victims.filter(v => v.wormMode).length;
  const totalFacts  = victims.reduce((a, v) => a + v.factIndex + v.wormFactIndex, 0);

  // ── RENDER ─────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      <Ticker />

      {/* User bar (when logged in) */}
      {screen === "app" && user && (
        <div className="user-bar">
          <div className="user-bar-left">
            <div className="user-dot" />
            <span>{user.email}</span>
            {user.isDonor
              ? <span className="pill pill-donor">🐀 Donor</span>
              : <span className="pill pill-free">Free</span>}
          </div>
          <button className="btn btn-sm btn-ghost" onClick={logout}>Log out</button>
        </div>
      )}

      {/* Header */}
      <div className="header">
        <div className="header-eyebrow">Daily SMS · Since Today</div>
        <div className="logo-lockup">
          <img src="/rat.png" alt="Pixel rat" className="logo-img" />
          <h1>RAT<span>FACTS</span></h1>
        </div>
        <p className="header-sub">
          The world's only daily rat fact SMS service.<br />
          For people you care about. Somewhat.
        </p>
      </div>

      <div className="main">

        {/* ── LOGIN SCREEN ── */}
        {screen === "login" && (
          <div className="auth-card">
            <h2>Sign in</h2>
            <p>Enter your email. We'll send you a magic link — no password needed.</p>
            <div className="field">
              <label>Your email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && requestMagicLink()}
                autoFocus
              />
            </div>
            <button className="btn btn-coral" onClick={requestMagicLink} disabled={loading || !email.trim()}>
              {loading ? "Sending..." : "Send magic link →"}
            </button>
            <p className="note" style={{ marginTop: 14 }}>
              No password. No nonsense. Just a link in your inbox. First victim is free.
            </p>
          </div>
        )}

        {/* ── MAGIC LINK SENT ── */}
        {screen === "magic-sent" && (
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📬</div>
            <h2>Check your inbox</h2>
            <p>We've sent a login link to <strong style={{ color: "var(--text)" }}>{email}</strong>. Click it to get started.</p>
            <p className="note">Link expires in 15 minutes. Check your spam folder if you don't see it.</p>
            <div className="divider" />
            <span className="link" onClick={() => setScreen("login")}>← Use a different email</span>
          </div>
        )}

        {/* ── MAIN APP ── */}
        {screen === "app" && user && (
          <>
            {/* Donor banner */}
            {user.isDonor && (
              <div className="donor-banner">
                <span style={{ fontSize: 24 }}>🐀</span>
                <div>
                  <strong>You're a donor.</strong> Unlimited victims, unlimited chaos. Thank you and we're sorry.
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="stats-bar">
              <div className="stat">
                <span className="stat-num">{victims.length}</span>
                <span className="stat-label">Enrolled</span>
              </div>
              <div className="stat">
                <span className="stat-num" style={{ color: "var(--green)" }}>{wormCount}</span>
                <span className="stat-label">Worm mode</span>
              </div>
              <div className="stat">
                <span className="stat-num" style={{ color: "var(--yellow)" }}>{totalFacts}</span>
                <span className="stat-label">Facts sent</span>
              </div>
            </div>

            {/* Free tier nudge */}
            {!user.isDonor && (
              <div className="limit-notice" onClick={() => setShowPaywall(true)}>
                <span>⚡</span>
                <span>Free tier: 1 victim, 3 days of facts. <strong>Donate $1</strong> to unlock unlimited →</span>
              </div>
            )}

            {/* Enrol form */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-title">🎯 Enrol a victim</div>
              <div className="card-sub">They'll get a welcome text immediately, then a rat fact 30 seconds later.</div>
              <div className="field">
                <label>Their name</label>
                <input
                  type="text"
                  placeholder="e.g. Dave"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addVictim()}
                />
              </div>
              <div className="field">
                <label>Mobile number (international format)</label>
                <input
                  type="text"
                  placeholder="+447911123456"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addVictim()}
                />
              </div>
              <button
                className="btn btn-coral"
                onClick={addVictim}
                disabled={loading || !name.trim() || !phone.trim()}
                style={{ marginTop: 4 }}
              >
                {loading ? "Enrolling..." : "🐀 Enrol victim"}
              </button>
            </div>

            {/* Victims list */}
            <div className="section-label">☠️ Current victims</div>

            {victims.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🐀</div>
                <p>No victims yet.<br />Add someone above and ruin their mornings.</p>
              </div>
            ) : (
              <div className="victim-list">
                {victims.map(v => (
                  <VictimCard
                    key={v.id}
                    victim={v}
                    onToggle={toggleVictim}
                    onDelete={deleteVictim}
                    onSendNow={sendNow}
                    sending={sending}
                    isDonor={user.isDonor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Paywall modal */}
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onDonate={startDonate}
          loading={donateLoading}
        />
      )}

      <Toast toasts={toasts} />
    </>
  );
}
