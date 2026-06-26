import { useState, useEffect } from "react";

const API = "http://localhost:3001/api";

const RAT_FACTS_PREVIEW = [
  "Rats cannot vomit. So if a rat eats something awful, it just has to… live with it.",
  "A group of rats is called a 'mischief'. You're very welcome.",
  "Rats can laugh — high-pitched, ultrasonic, and deeply unsettling.",
  "Rats are cleaner than cats. Yes. You read that correctly.",
  "Rats can be trained to drive tiny cars. Scientists did this.",
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0d;
    --card: #1a1a1a;
    --border: #2a2a2a;
    --accent: #c8f135;
    --accent2: #ff6b35;
    --text: #f0ede6;
    --muted: #888;
    --danger: #ff4040;
    --green: #39d98a;
    --rat: #8B6914;
  }

  body {
    font-family: 'Nunito', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  .app {
    max-width: 820px;
    margin: 0 auto;
    padding: 24px 20px 60px;
  }

  /* HEADER */
  .header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
  }
  .rat-emoji {
    font-size: 72px;
    display: block;
    animation: ratWiggle 2s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(200,241,53,0.3));
  }
  @keyframes ratWiggle {
    0%, 100% { transform: rotate(-5deg) scale(1); }
    50% { transform: rotate(5deg) scale(1.08); }
  }
  .header h1 {
    font-family: 'Boogaloo', cursive;
    font-size: 52px;
    color: var(--accent);
    letter-spacing: 1px;
    line-height: 1;
    margin: 8px 0 4px;
    text-shadow: 3px 3px 0 rgba(200,241,53,0.2);
  }
  .header .tagline {
    color: var(--muted);
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .tape {
    display: inline-block;
    background: rgba(200,241,53,0.15);
    border: 1px solid rgba(200,241,53,0.3);
    color: var(--accent);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 2px;
    margin-top: 12px;
  }

  /* FACT TICKER */
  .ticker-wrap {
    background: var(--card);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }
  .ticker-wrap::before {
    content: 'TODAY\'S PREVIEW';
    position: absolute;
    top: 8px; right: 12px;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--muted);
    font-weight: 700;
  }
  .ticker-fact {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text);
    padding-right: 100px;
    animation: fadeInFact 0.5s ease;
  }
  @keyframes fadeInFact {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .ticker-nav {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }
  .ticker-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--border);
    cursor: pointer;
    transition: background 0.2s;
  }
  .ticker-dot.active { background: var(--accent); }

  /* SECTIONS */
  .section { margin-bottom: 32px; }
  .section-title {
    font-family: 'Boogaloo', cursive;
    font-size: 22px;
    color: var(--accent2);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ADD FORM */
  .add-form {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 12px;
    align-items: end;
  }
  .field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .field input {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .field input:focus { border-color: var(--accent); }
  .field input::placeholder { color: #444; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--accent);
    color: #000;
  }
  .btn-primary:hover:not(:disabled) { background: #d4ff00; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-sm {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 6px;
  }
  .btn-danger { background: transparent; color: var(--danger); border: 1px solid rgba(255,64,64,0.3); }
  .btn-danger:hover { background: rgba(255,64,64,0.1); }
  .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--accent2); color: var(--accent2); }
  .btn-send { background: var(--accent2); color: #fff; }
  .btn-send:hover:not(:disabled) { background: #ff855a; transform: translateY(-1px); }
  .btn-send:disabled { opacity: 0.4; cursor: not-allowed; }

  /* NOTE */
  .info-note {
    background: rgba(200,241,53,0.05);
    border: 1px solid rgba(200,241,53,0.2);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--muted);
    margin-top: 12px;
    line-height: 1.6;
  }
  .info-note strong { color: var(--accent); }

  /* VICTIMS LIST */
  .victims-list { display: flex; flex-direction: column; gap: 12px; }

  .victim-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 16px;
    transition: border-color 0.2s;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .victim-card.inactive { opacity: 0.5; }
  .victim-card:hover { border-color: #333; }

  .victim-name {
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 3px;
  }
  .victim-phone {
    font-size: 13px;
    color: var(--muted);
    font-family: monospace;
    letter-spacing: 1px;
  }
  .victim-meta {
    font-size: 11px;
    color: #555;
    margin-top: 6px;
    display: flex;
    gap: 16px;
  }
  .victim-meta span { display: flex; align-items: center; gap: 4px; }
  .pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .pill-active { background: rgba(57,217,138,0.15); color: var(--green); }
  .pill-paused { background: rgba(136,136,136,0.15); color: var(--muted); }

  .victim-actions { display: flex; gap: 8px; align-items: center; }

  /* PROGRESS */
  .progress-wrap { margin-top: 8px; }
  .progress-label { font-size: 10px; color: #555; margin-bottom: 3px; }
  .progress-bar {
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    width: 160px;
  }
  .progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.3s;
  }

  /* TOAST */
  .toast-area {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 9999;
  }
  .toast {
    background: var(--card);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 8px;
    padding: 12px 18px;
    font-size: 14px;
    color: var(--text);
    max-width: 300px;
    animation: toastIn 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }
  .toast.error { border-left-color: var(--danger); }
  .toast.success { border-left-color: var(--green); }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  /* EMPTY STATE */
  .empty {
    text-align: center;
    padding: 48px 24px;
    color: var(--muted);
    background: var(--card);
    border: 1px dashed var(--border);
    border-radius: 12px;
  }
  .empty .empty-rat { font-size: 48px; margin-bottom: 12px; }
  .empty p { font-size: 15px; }

  /* STATS BAR */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 32px;
  }
  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Boogaloo', cursive;
    font-size: 36px;
    color: var(--accent);
    line-height: 1;
  }
  .stat-label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 4px;
  }

  @media (max-width: 600px) {
    .form-row { grid-template-columns: 1fr; }
    .header h1 { font-size: 38px; }
    .stats-bar { grid-template-columns: 1fr 1fr; }
    .victim-card { grid-template-columns: 1fr; }
    .victim-actions { justify-content: flex-start; flex-wrap: wrap; }
  }
`;

function Toast({ toasts }) {
  return (
    <div className="toast-area">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export default function RatFacts() {
  const [victims, setVictims] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState({});
  const [toasts, setToasts] = useState([]);
  const [factIdx, setFactIdx] = useState(0);
  const [backendOk, setBackendOk] = useState(null);

  const TOTAL_FACTS = 30;

  // Cycle preview facts
  useEffect(() => {
    const t = setInterval(() => {
      setFactIdx((i) => (i + 1) % RAT_FACTS_PREVIEW.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Load victims from backend
  useEffect(() => {
    fetchVictims();
  }, []);

  function toast(msg, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }

  async function fetchVictims() {
    try {
      const res = await fetch(`${API}/victims`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setVictims(data);
      setBackendOk(true);
    } catch {
      setBackendOk(false);
    }
  }

  async function addVictim() {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/victims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setVictims((prev) => [data, ...prev]);
      setName("");
      setPhone("");
      toast(`🐀 ${data.name} is now enrolled in daily rat facts. Glorious.`);
    } catch (err) {
      toast(`❌ ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }

  async function removeVictim(id, victimName) {
    try {
      const res = await fetch(`${API}/victims/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove");
      setVictims((prev) => prev.filter((v) => v.id !== id));
      toast(`${victimName} has been spared. For now.`);
    } catch (err) {
      toast(`❌ ${err.message}`, "error");
    }
  }

  async function toggleVictim(id) {
    try {
      const res = await fetch(`${API}/victims/${id}/toggle`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setVictims((prev) => prev.map((v) => (v.id === id ? data : v)));
      toast(data.active ? "▶️ Resumed. They won't know what hit them." : "⏸ Paused. The rats are waiting.");
    } catch {
      toast("Failed to toggle", "error");
    }
  }

  async function sendNow(id, victimName) {
    setSending((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`${API}/victims/${id}/send-now`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Send failed");
      setVictims((prev) => prev.map((v) => (v.id === id ? data.victim : v)));
      toast(`🐀 Rat fact sent to ${victimName} via SMS!`);
    } catch (err) {
      toast(`❌ ${err.message}`, "error");
    } finally {
      setSending((prev) => ({ ...prev, [id]: false }));
    }
  }

  const activeCount = victims.filter((v) => v.active).length;
  const totalSent = victims.reduce((acc, v) => acc + v.factIndex, 0);

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <span className="rat-emoji">🐀</span>
          <h1>Rat Facts</h1>
          <p className="tagline">Daily Rarely Useful Facts About Rats</p>
          <div className="tape">SMS Edition</div>
        </div>

        {/* BACKEND STATUS */}
        {backendOk === false && (
          <div className="info-note" style={{ marginBottom: 24, borderColor: "rgba(255,64,64,0.3)", background: "rgba(255,64,64,0.05)" }}>
            ⚠️ <strong style={{ color: "var(--danger)" }}>Backend not running.</strong> Start it with{" "}
            <code style={{ background: "#000", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>
              cd backend && npm install && node server.js
            </code>{" "}
            then refresh. See setup instructions below.
          </div>
        )}

        {/* FACT TICKER */}
        <div className="ticker-wrap">
          <p className="ticker-fact">🐀 {RAT_FACTS_PREVIEW[factIdx]}</p>
          <div className="ticker-nav">
            {RAT_FACTS_PREVIEW.map((_, i) => (
              <div
                key={i}
                className={`ticker-dot ${i === factIdx ? "active" : ""}`}
                onClick={() => setFactIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-num">{victims.length}</div>
            <div className="stat-label">Enrolled</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{activeCount}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{totalSent}</div>
            <div className="stat-label">Facts Sent</div>
          </div>
        </div>

        {/* ADD VICTIM */}
        <div className="section">
          <h2 className="section-title">🎯 Enrol a Victim</h2>
          <div className="add-form">
            <div className="form-row">
              <div className="field">
                <label>Their Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dave"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addVictim()}
                />
              </div>
              <div className="field">
                <label>Mobile Number (intl. format)</label>
                <input
                  type="text"
                  placeholder="+447911123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addVictim()}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={addVictim}
                disabled={loading || !name.trim() || !phone.trim()}
              >
                {loading ? "Adding…" : "🐀 Enrol"}
              </button>
            </div>
            <div className="info-note">
              <strong>Note:</strong> Use international format for the number (e.g. <strong>+447911123456</strong>).
              No opt-in needed — they'll just start getting rat facts out of nowhere from an unknown number.
              Facts fire daily at <strong>09:00</strong> — or hit <em>Send Now</em> to fire one immediately.
            </div>
          </div>
        </div>

        {/* VICTIMS */}
        <div className="section">
          <h2 className="section-title">☠️ Current Victims</h2>
          {victims.length === 0 ? (
            <div className="empty">
              <div className="empty-rat">🐀</div>
              <p>No victims yet. Add someone above and ruin their mornings.</p>
            </div>
          ) : (
            <div className="victims-list">
              {victims.map((v) => {
                const pct = Math.round((v.factIndex / TOTAL_FACTS) * 100);
                return (
                  <div key={v.id} className={`victim-card ${v.active ? "" : "inactive"}`}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="victim-name">{v.name}</div>
                        <span className={`pill ${v.active ? "pill-active" : "pill-paused"}`}>
                          {v.active ? "Active" : "Paused"}
                        </span>
                      </div>
                      <div className="victim-phone">{v.phone}</div>
                      <div className="victim-meta">
                        <span>📬 Fact {v.factIndex}/{TOTAL_FACTS}</span>
                        {v.lastSentAt && (
                          <span>
                            🕐 Last:{" "}
                            {new Date(v.lastSentAt).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                      <div className="progress-wrap">
                        <div className="progress-label">{pct}% through the fact rotation</div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="victim-actions">
                      <button
                        className="btn btn-sm btn-send"
                        onClick={() => sendNow(v.id, v.name)}
                        disabled={sending[v.id]}
                        title="Send a rat fact right now"
                      >
                        {sending[v.id] ? "Sending…" : "🐀 Send Now"}
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => toggleVictim(v.id)}
                        title={v.active ? "Pause daily facts" : "Resume daily facts"}
                      >
                        {v.active ? "⏸" : "▶️"}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeVictim(v.id, v.name)}
                        title="Remove victim"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SETUP GUIDE */}
        <div className="section">
          <h2 className="section-title">⚙️ Setup Guide</h2>
          <div className="info-note" style={{ lineHeight: 2 }}>
            <strong>1.</strong> Sign up at <strong>twilio.com</strong> (free trial gives ~$15 credit)<br />
            <strong>2.</strong> Go to <em>Phone Numbers → Get a Number</em> and grab a number with SMS capability<br />
            <strong>3.</strong> Note your <strong>Account SID</strong>, <strong>Auth Token</strong>, and <strong>phone number</strong><br />
            <strong>4.</strong> Add credentials to <code style={{ background:"#000", padding:"1px 6px", borderRadius:4, fontSize:12 }}>server.js</code> or set as env vars:<br />
            <code style={{ background:"#000", padding:"4px 10px", borderRadius:4, fontSize:12, display:"block", marginTop:4 }}>
              TWILIO_ACCOUNT_SID=ACxxx TWILIO_AUTH_TOKEN=xxx TWILIO_PHONE_NUMBER=+1xxx node server.js
            </code>
            <strong>5.</strong> No opt-in needed. Add a victim, hit <em>Send Now</em>, and watch the confusion unfold 🐀<br />
            <strong>Note:</strong> Free trial only texts verified numbers. A small top-up removes this restriction.
          </div>
        </div>

      </div>
      <Toast toasts={toasts} />
    </>
  );
}
