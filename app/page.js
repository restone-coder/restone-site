"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
// Primary:   #C200FF  (vivid fuchsia)
// Surface:   #0D0014  (near-black purple base)
// Light bg:  #FAFAFF
// Accent:    #FF6B2B  (warm orange pop)
// Font:      'Syne' (display) + 'DM Sans' (body)

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --brand: #C200FF;
        --brand-dim: #9A00CC;
        --brand-glow: rgba(194,0,255,0.18);
        --accent: #FF6B2B;
        --surface: #0D0014;
        --surface-2: #160020;
        --surface-3: #1F002E;
        --ink: #FAFAFF;
        --ink-2: rgba(250,250,255,0.65);
        --ink-3: rgba(250,250,255,0.38);
        --bg: #FAFAFF;
        --bg-2: #F3F0FF;
        --bg-3: #EDE8FF;
        --text: #0D0014;
        --text-2: #3D2957;
        --text-3: #7A6490;
        --border: rgba(194,0,255,0.15);
        --border-strong: rgba(194,0,255,0.3);
        --radius: 20px;
        --radius-lg: 28px;
        --radius-xl: 36px;
        --font-display: 'Syne', sans-serif;
        --font-body: 'DM Sans', sans-serif;
      }
      body { font-family: var(--font-body); background: var(--bg); color: var(--text); }
      ::selection { background: var(--brand); color: #fff; }
      a { text-decoration: none; color: inherit; }
      img { display: block; max-width: 100%; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--brand-glow); border-radius: 99px; }

      /* Fade-in animation */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }

      /* Marquee */
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-track { animation: marquee 28s linear infinite; }
      .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
    `}</style>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Btn({ children, href, onClick, variant = "primary", className = "", type = "button", style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 8, borderRadius: 99, padding: "13px 28px",
    fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
    cursor: "pointer", transition: "all .2s", border: "none", textDecoration: "none",
    letterSpacing: ".01em", whiteSpace: "nowrap",
  };
  const styles = {
    primary: {
      background: "var(--brand)", color: "#fff",
      boxShadow: "0 0 28px rgba(194,0,255,.35)",
    },
    secondary: {
      background: "transparent", color: "var(--brand)",
      border: "1.5px solid var(--border-strong)",
    },
    ghost: {
      background: "rgba(194,0,255,.07)", color: "var(--brand)",
      border: "1.5px solid var(--border)",
    },
    dark: {
      background: "var(--surface)", color: "var(--ink)",
      boxShadow: "0 4px 24px rgba(13,0,20,.18)",
    },
  };
  const merged = { ...base, ...styles[variant], ...style };
  if (href) return <a href={href} className={className} style={merged}>{children}</a>;
  return <button type={type} onClick={onClick} className={className} style={merged}>{children}</button>;
}

function Tag({ children, color = "brand" }) {
  const colors = {
    brand: { bg: "rgba(194,0,255,.1)", text: "var(--brand)" },
    accent: { bg: "rgba(255,107,43,.1)", text: "var(--accent)" },
    green:  { bg: "rgba(16,185,129,.1)", text: "#059669" },
  };
  const c = colors[color] || colors.brand;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: c.bg, color: c.text,
      borderRadius: 99, padding: "5px 14px",
      fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
    }}>{children}</span>
  );
}

function Section({ children, id, style = {} }) {
  return (
    <section id={id} style={{
      padding: "96px 0", position: "relative", overflow: "hidden", ...style,
    }}>{children}</section>
  );
}

function Container({ children, style = {} }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, body, center = false, light = false, style = {} }) {
  return (
    <div style={{ maxWidth: center ? 680 : 600, margin: center ? "0 auto" : undefined, textAlign: center ? "center" : "left", ...style }}>
      {eyebrow && <Tag color={light ? "brand" : "brand"}>{eyebrow}</Tag>}
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.15,
        color: light ? "var(--ink)" : "var(--text)", marginTop: 16,
        letterSpacing: "-.02em",
      }}>{title}</h2>
      {body && <p style={{
        fontSize: 17, lineHeight: 1.75, color: light ? "var(--ink-2)" : "var(--text-3)",
        marginTop: 16, maxWidth: 560,
        marginLeft: center ? "auto" : undefined, marginRight: center ? "auto" : undefined,
      }}>{body}</p>}
    </div>
  );
}

function Card({ children, style = {}, dark = false }) {
  return (
    <div style={{
      background: dark ? "var(--surface-2)" : "#fff",
      border: `1px solid ${dark ? "rgba(194,0,255,.2)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      ...style,
    }}>{children}</div>
  );
}

function Check({ text, light = false }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{
        width: 22, height: 22, borderRadius: 99, flexShrink: 0, marginTop: 1,
        background: "rgba(194,0,255,.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "var(--brand)",
      }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.6, color: light ? "var(--ink-2)" : "var(--text-2)" }}>{text}</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(250,250,255,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all .3s",
    }}>
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 72 }}>
        <a href="#top" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--brand)", letterSpacing: "-.02em" }}>
          rest<span style={{ color: "var(--accent)" }}>one</span>
        </a>

        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {[["#features","Функции"],["#how","Как работи"],["#pricing","Цени"],["#faq","Въпроси"]].map(([href,label]) => (
            <a key={href} href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--text-2)", transition: "color .15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--brand)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}
            >{label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Btn href="#contact" variant="ghost">Влез</Btn>
          <Btn href="#contact">Заяви демо →</Btn>
        </div>
      </Container>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroBadge({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "#fff", border: "1px solid var(--border-strong)",
      borderRadius: 99, padding: "8px 16px 8px 10px",
      fontSize: 13, fontWeight: 500, color: "var(--text-2)",
      boxShadow: "0 2px 16px rgba(194,0,255,.1)",
    }}>{children}</div>
  );
}

function PulseDot() {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 8, height: 8 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "#22c55e", animation: "pulse 2s ease-in-out infinite",
      }} />
      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.6)} }`}</style>
    </span>
  );
}

function PhoneMockup() {
  return (
    <div style={{ position: "relative", margin: "0 auto", width: 300 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: -60,
        background: "radial-gradient(circle, rgba(194,0,255,.25) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Device */}
      <div style={{
        background: "#0D0014", borderRadius: 44,
        border: "2px solid rgba(194,0,255,.4)",
        padding: 10, position: "relative", zIndex: 1,
        boxShadow: "0 40px 100px rgba(194,0,255,.25), 0 0 0 1px rgba(255,255,255,.05)",
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
          width: 100, height: 24, background: "#0D0014", borderRadius: 99, zIndex: 2,
        }} />

        {/* Screen */}
        <div style={{ background: "#fff", borderRadius: 36, overflow: "hidden", height: 600 }}>
          {/* Top bar */}
          <div style={{
            background: "linear-gradient(135deg, #C200FF 0%, #9A00CC 100%)",
            padding: "48px 20px 20px",
          }}>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>Restone App</div>
            <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginTop: 4 }}>Добро утро, Иван 👋</div>
            <div style={{
              display: "flex", gap: 10, marginTop: 16,
            }}>
              {[["Поръчки", "24"],["Приходи","€184"],["Рейтинг","4.9★"]].map(([l,v]) => (
                <div key={l} style={{
                  flex: 1, background: "rgba(255,255,255,.15)", borderRadius: 14,
                  padding: "10px 12px", backdropFilter: "blur(8px)",
                }}>
                  <div style={{ color: "rgba(255,255,255,.65)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#0D0014", marginBottom: 12, letterSpacing: "-.01em" }}>Последни поръчки</div>
            {[
              { name: "Бургер Меню", time: "Преди 5 мин", price: "€9.90", status: "Нова" },
              { name: "Пица Специалите", time: "Преди 18 мин", price: "€12.50", status: "В процес" },
              { name: "Обедно Комбо", time: "Преди 35 мин", price: "€8.40", status: "Готова" },
            ].map((o) => (
              <div key={o.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", background: "#FAFAFF",
                borderRadius: 14, border: "1px solid #EDE8FF",
                marginBottom: 8,
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#0D0014" }}>{o.name}</div>
                  <div style={{ fontSize: 11, color: "#7A6490", marginTop: 2 }}>{o.time}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#C200FF" }}>{o.price}</div>
                  <div style={{
                    fontSize: 10, borderRadius: 99, padding: "2px 8px", marginTop: 3, fontWeight: 600,
                    background: o.status === "Нова" ? "rgba(194,0,255,.1)" : o.status === "Готова" ? "rgba(16,185,129,.1)" : "rgba(255,107,43,.1)",
                    color: o.status === "Нова" ? "#C200FF" : o.status === "Готова" ? "#059669" : "#FF6B2B",
                  }}>{o.status}</div>
                </div>
              </div>
            ))}

            <div style={{
              background: "linear-gradient(135deg, #C200FF 0%, #FF6B2B 100%)",
              borderRadius: 14, padding: 14, marginTop: 4,
            }}>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>Активна промоция</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginTop: 4 }}>−20% при мобилна поръчка</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <Section style={{ padding: "40px 0 96px", background: "linear-gradient(180deg, #F3F0FF 0%, #FAFAFF 60%)" }}>
      {/* Background orb */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(194,0,255,.08) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div className="fade-up">
              <HeroBadge>
                <PulseDot />
                <span>Работи с UpMenu технологията</span>
              </HeroBadge>
            </div>

            <h1 className="fade-up delay-1" style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)", lineHeight: 1.1,
              color: "var(--text)", letterSpacing: "-.03em",
              marginTop: 24,
            }}>
              Онлайн поръчки<br />
              <span style={{ color: "var(--brand)" }}>без комисионни</span>
              <br />за твоя ресторант
            </h1>

            <p className="fade-up delay-2" style={{
              fontSize: 17, lineHeight: 1.75, color: "var(--text-3)",
              marginTop: 20, maxWidth: 480,
            }}>
              Собствен ordering сайт, брандирано мобилно приложение и пълен контрол над поръчките — без посредници.
            </p>

            <div className="fade-up delay-3" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {[
                "0% комисионна към delivery платформи",
                "Собствено iOS + Android приложение",
                "Ordering website + checkout в една система",
                "Пълен контрол над клиентите и данните",
              ].map(t => <Check key={t} text={t} />)}
            </div>

            <div className="fade-up delay-4" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <Btn href="#contact" style={{ fontSize: 15, padding: "15px 32px" }}>Заяви демо →</Btn>
              <Btn href="#products" variant="secondary" style={{ fontSize: 15, padding: "15px 32px" }}>Виж платформата</Btn>
            </div>

            <div className="fade-up delay-4" style={{ display: "flex", gap: 12, marginTop: 28 }}>
              {[["App Store","iOS"],["Google Play","Android"]].map(([store,os]) => (
                <div key={store} style={{
                  background: "var(--surface)", color: "var(--ink)",
                  borderRadius: 14, padding: "10px 18px",
                  boxShadow: "0 4px 20px rgba(13,0,20,.15)",
                }}>
                  <div style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em" }}>{os}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{store}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="fade-up delay-2" style={{ display: "flex", justifyContent: "center" }}>
            <PhoneMockup />
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Marquee logos/social proof ────────────────────────────────────────────────

function Marquee() {
  const items = [
    "0% комисионни", "Собствен бранд", "iOS + Android", "Без посредници",
    "Повече директни поръчки", "Push известия", "Loyalty програми", "Delivery & Pickup",
    "0% комисионни", "Собствен бранд", "iOS + Android", "Без посредници",
    "Повече директни поръчки", "Push известия", "Loyalty програми", "Delivery & Pickup",
  ];
  return (
    <div style={{ background: "var(--surface)", padding: "20px 0", overflow: "hidden" }} className="marquee-wrap">
      <div className="marquee-track" style={{ display: "flex", gap: 0, width: "max-content" }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: 14, color: "var(--ink-2)",
              padding: "0 28px", whiteSpace: "nowrap", letterSpacing: ".01em",
            }}>{item}</span>
            <span style={{ color: "var(--brand)", fontSize: 16, lineHeight: "1px" }}>◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Stats bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "0%", label: "Комисионни" },
    { value: "2×", label: "Повече директни поръчки" },
    { value: "iOS + Android", label: "Мобилно присъствие" },
    { value: "24/7", label: "Приемане на поръчки" },
  ];
  return (
    <Section style={{ padding: "72px 0", background: "#fff" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--brand)",
                letterSpacing: "-.03em",
              }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "var(--text-3)", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Features grid ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, text, accent = false }) {
  return (
    <div style={{
      padding: "28px 24px",
      background: accent ? "var(--surface-2)" : "#fff",
      border: `1px solid ${accent ? "rgba(194,0,255,.25)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      transition: "transform .2s, box-shadow .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(194,0,255,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: accent ? "rgba(194,0,255,.2)" : "rgba(194,0,255,.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>{icon}</div>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
        color: accent ? "var(--ink)" : "var(--text)",
        marginTop: 18, letterSpacing: "-.01em",
      }}>{title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: accent ? "var(--ink-2)" : "var(--text-3)", marginTop: 8 }}>{text}</p>
    </div>
  );
}

function Features() {
  const features = [
    { icon: "🛒", title: "Онлайн система за поръчки", text: "Продавай директно от сайта си без комисионни. Управлявай меню, поръчки и доставки безпроблемно." },
    { icon: "🌐", title: "Website Builder за ресторанти", text: "Създай професионален сайт с drag-and-drop редактор — без програмисти, с вграден ordering." },
    { icon: "📱", title: "Брандирано мобилно приложение", text: "Собствен iOS + Android app с твоя бранд. Спести до 90% от комисионни на трети страни." },
    { icon: "📣", title: "Маркетинг инструменти", text: "Промоции, автоматизиран loyalty, SMS/Email/Push кампании и детайлни отчети." },
    { icon: "⭐", title: "Loyalty програма", text: "Настрой loyalty програма за под 5 минути. Увеличи средната стойност на поръчката с до 25%." },
    { icon: "📦", title: "Агрегация на поръчки", text: "Всички поръчки от всеки канал на едно място — без множество таблети и грешки." },
    { icon: "📲", title: "QR Code меню & поръчки на масата", text: "Клиентите поръчват и плащат директно от телефона си. Намали разходите за персонал." },
    { icon: "🚚", title: "Управление на доставки", text: "Управлявай куриерите и доставките от поръчка до клиента с оптимизирани маршрути." },
    { icon: "🔀", title: "Delivery Dispatcher", text: "Предлагай доставки без собствен флот — достъп до Glovo, Wolt Drive, Uber Direct и Stuart." },
    { icon: "⚙️", title: "Интеграции", text: "Свърже се с POS системата, delivery услуги, аналитика и онлайн плащания." },
  ];

  return (
    <Section id="features">
      <Container>
        <SectionHead
          eyebrow="Нашето предложение"
          title="Всичко, от което ресторантът ти се нуждае"
          body="Пълна платформа за директни онлайн поръчки, маркетинг и управление на доставки — без посредници."
          center
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 56 }}>
          {features.slice(0,5).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 14 }}>
          {features.slice(5).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </Container>
    </Section>
  );
}

// ─── About Us ──────────────────────────────────────────────────────────────────

function AboutUs() {
  return (
    <Section style={{ background: "var(--surface)", padding: "96px 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: big quote */}
          <div>
            <Tag>За нас</Tag>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "var(--ink)",
              marginTop: 20, letterSpacing: "-.03em", lineHeight: 1.15,
            }}>
              Помагаме на ресторанти да растат от 2012 г.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink-2)", marginTop: 20 }}>
              Вече помогнахме на над 100 ресторантьора да изградят собствени канали за директни поръчки и да спестят значителни суми от комисионни.
            </p>
            <div style={{ marginTop: 36 }}>
              <Btn href="#contact" style={{ fontSize: 15, padding: "15px 32px" }}>Заяви демо →</Btn>
            </div>
          </div>

          {/* Right: stats + points */}
          <div>
            {/* Big stat */}
            <div style={{
              background: "var(--surface-3)", borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(194,0,255,.2)", padding: "32px",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 13, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em" }}>Спестени от клиенти</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, color: "var(--brand)", letterSpacing: "-.04em", marginTop: 8 }}>$1.5 млн.</div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6 }}>Толкова биха стрували комисионните при 15% такса към трети страни</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "От onboarding до постоянна поддръжка — ние сме до теб.",
                "Гъвкави инструменти, пригодени към целите на всеки ресторант.",
                "Платформата ни постоянно увеличава стойността на поръчките и задържането на клиенти.",
              ].map(t => <Check key={t} text={t} light />)}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}



function DashboardShowcase() {
  return (
    <Section style={{ background: "var(--surface)", padding: "96px 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionHead
              eyebrow="Управление"
              title="Пълен контрол от един dashboard"
              body="Следи поръчки, клиенти и приходи в реално време. Прости инструменти — без излишна сложност."
              light
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
              {["Всички поръчки на едно място","История и статуси в реално време","Управление на клиенти и loyalty","Лесна обработка от целия екип"].map(t => <Check key={t} text={t} light />)}
            </div>
            <div style={{ marginTop: 36 }}>
              <Btn href="#contact" style={{ fontSize: 15, padding: "15px 32px" }}>Заяви демо →</Btn>
            </div>
          </div>

          {/* Mock dashboard UI */}
          <div style={{
            background: "var(--surface-3)", borderRadius: "var(--radius-xl)",
            border: "1px solid rgba(194,0,255,.2)", overflow: "hidden",
          }}>
            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid rgba(194,0,255,.15)",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Restone Dashboard</span>
              <div style={{ display: "flex", gap: 6 }}>
                {["#FF5F56","#FEBC2E","#28C840"].map(c => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, padding: 20, paddingBottom: 16 }}>
              {[["Днес","24 поръчки"],["Приходи","€184"],["Нови клиенти","7"]].map(([l,v]) => (
                <div key={l} style={{
                  background: "rgba(194,0,255,.08)", borderRadius: 12,
                  padding: "12px 14px", marginRight: 8,
                }}>
                  <div style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink)", marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Orders table */}
            <div style={{ padding: "0 20px 20px" }}>
              {[
                { id: "#1042", item: "Бургер Меню", price: "€9.90", status: "Нова", statusColor: "var(--brand)" },
                { id: "#1041", item: "Пица Специалите", price: "€12.50", status: "В процес", statusColor: "var(--accent)" },
                { id: "#1040", item: "Обедно Комбо", price: "€8.40", status: "Готова", statusColor: "#22c55e" },
                { id: "#1039", item: "Стек Сет", price: "€17.90", status: "Доставена", statusColor: "var(--ink-3)" },
              ].map((o) => (
                <div key={o.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "11px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,.03)", marginBottom: 4,
                  border: "1px solid rgba(194,0,255,.08)",
                }}>
                  <span style={{ fontSize: 12, color: "var(--ink-3)", width: 50 }}>{o.id}</span>
                  <span style={{ fontSize: 13, color: "var(--ink)", flex: 1 }}>{o.item}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginRight: 12 }}>{o.price}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: o.statusColor,
                    background: `${o.statusColor}1A`, borderRadius: 99, padding: "3px 10px",
                  }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { n: "01", title: "Активираме ordering канала", text: "Добавяме online ordering към сайта или изграждаме нов restaurant website за часове." },
    { n: "02", title: "Клиентите поръчват директно", text: "Поръчките идват от твоя бранд — без marketplace такси и без загуба на маржин." },
    { n: "03", title: "Екипът обработва", text: "Всяка поръчка влиза в dashboard-а и може да се обработи бързо и лесно." },
    { n: "04", title: "Повече печалба", text: "Запазваш по-голяма част от всяка продажба без комисионни към външни платформи." },
  ];

  return (
    <Section id="how">
      <Container>
        <SectionHead eyebrow="Как работи" title="Прост старт. Реални резултати." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 60 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i < 3 && (
                <div style={{
                  position: "absolute", top: 28, left: "60%", right: "-10%",
                  height: 1, background: "linear-gradient(90deg, var(--brand-glow), transparent)",
                  zIndex: 0,
                }} />
              )}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: i === 3 ? "var(--brand)" : "rgba(194,0,255,.08)",
                  border: `1px solid ${i === 3 ? "transparent" : "var(--border-strong)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16,
                  color: i === 3 ? "#fff" : "var(--brand)",
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
                  color: "var(--text)", marginTop: 18, letterSpacing: "-.01em",
                }}>{s.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-3)", marginTop: 8 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Pricing ────────────────────────────────────────────────────────────────────

function PricingCard({ name, price, subtitle, features, featured = false }) {
  return (
    <div style={{
      padding: "36px 32px",
      background: featured ? "var(--surface)" : "#fff",
      border: `1.5px solid ${featured ? "var(--brand)" : "var(--border)"}`,
      borderRadius: "var(--radius-xl)",
      position: "relative",
      boxShadow: featured ? "0 0 60px rgba(194,0,255,.2)" : "none",
    }}>
      {featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "var(--brand)", color: "#fff",
          borderRadius: 99, padding: "5px 18px",
          fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
          letterSpacing: ".04em",
        }}>НАЙ-ПОПУЛЯРЕН</div>
      )}
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
        color: featured ? "var(--ink)" : "var(--text)",
      }}>{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: 48, color: "var(--brand)", letterSpacing: "-.03em",
        }}>{price}</span>
        <span style={{ fontSize: 14, color: featured ? "var(--ink-3)" : "var(--text-3)" }}>/месец</span>
      </div>
      <div style={{ fontSize: 13, color: featured ? "var(--ink-2)" : "var(--text-3)", marginTop: 2 }}>{subtitle}</div>

      <div style={{ height: 1, background: featured ? "rgba(255,255,255,.08)" : "var(--border)", margin: "24px 0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {features.map(f => <Check key={f} text={f} light={featured} />)}
      </div>

      <Btn href="#contact" variant={featured ? "primary" : "ghost"} style={{ width: "100%", marginTop: 32, fontSize: 14 }}>
        Избери план
      </Btn>
    </div>
  );
}

function AddonCard({ name, price, per, text }) {
  return (
    <div style={{
      padding: "24px",
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      transition: "border-color .2s, box-shadow .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--brand)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(194,0,255,.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--brand)" }}>{price}</span>
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>/месец</span>
      </div>
      {per && <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{per}</div>}
      <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-3)", marginTop: 12 }}>{text}</p>
    </div>
  );
}

function Pricing() {
  const addons = [
    { name: "Мобилно приложение", price: "€49", per: "за 1 локация", text: "Собствен брандиран mobile app за поръчки на ресторанта." },
    { name: "Loyalty програма", price: "€19", per: "за 1 локация", text: "Превърни еднократните клиенти в редовни с reward система." },
    { name: "Delivery Dispatcher", price: "€40", per: "достъп до всички куриери", text: "Предлагай доставки с трети страни — без собствен флот." },
    { name: "Driver App", price: "€14", per: "за 1 шофьор", text: "Управлявай доставките и куриерите с courier app." },
    { name: "Агрегация на поръчки", price: "€40", per: "за 1 локация", text: "Всички поръчки от всеки канал на едно място — без множество таблети." },
    { name: "POS интеграции", price: "€0", per: "за 1 локация", text: "Синхронизирай всички онлайн поръчки с POS системата." },
  ];

  return (
    <Section id="pricing" style={{ background: "linear-gradient(180deg, #FAFAFF 0%, #F3F0FF 100%)" }}>
      <Container>
        <SectionHead
          eyebrow="Цени"
          title="Прозрачни планове без скрити такси"
          body="Фиксиран месечен абонамент на локация. Нула комисионни от поръчките."
          center
        />

        {/* Main plans */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 60, alignItems: "start" }}>
          <PricingCard name="Basic" price="€49" subtitle="До 75 поръчки · за 1 локация"
            features={[
              "Ordering website за ресторанта",
              "Онлайн поръчки без комисионни",
              "Онлайн плащания",
              "Много локации",
              "Безплатна настройка",
            ]} />
          <PricingCard name="Standard" price="€89" subtitle="До 210 поръчки · за 1 локация" featured
            features={[
              "Всичко от Basic",
              "Поръчки на масата (QR)",
              "Резервации на маси",
              "Email & SMS маркетинг",
              "Купони и промо кодове",
            ]} />
          <PricingCard name="Premium" price="€169" subtitle="Неограничени поръчки · за 1 локация"
            features={[
              "Всичко от Standard",
              "Неограничени поръчки",
              "Маркетинг автоматизация",
              "Gift Cards",
              "Item Recommendations",
              "Множество менюта",
            ]} />
        </div>

        {/* Addons */}
        <div style={{ marginTop: 80 }}>
          <SectionHead
            eyebrow="Добавки"
            title="Разшири платформата с addon-и"
            body="Добавяй само това, от което имаш нужда — без да плащаш за излишни функции."
            center
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}>
            {addons.map((a, i) => <AddonCard key={i} {...a} />)}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  const quotes = [
    { q: "Поръчките вече идват директно — задържаме много повече от всяка продажба.", from: "Ресторант, София" },
    { q: "Клиентите се връщат много по-често откакто имаме собствено приложение.", from: "Пицария, Пловдив" },
    { q: "Най-голямата разлика е контролът върху клиента без да плащаме комисионни.", from: "Верига, България" },
  ];
  return (
    <Section style={{ background: "#fff" }}>
      <Container>
        <SectionHead eyebrow="Резултати" title="Какво казват ресторантьорите" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{
              padding: "28px", background: "var(--bg-2)",
              border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
            }}>
              <div style={{ color: "var(--brand)", fontSize: 28, lineHeight: 1 }}>❝</div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)", marginTop: 12 }}>{q.q}</p>
              <div style={{ marginTop: 20, fontSize: 13, fontWeight: 600, color: "var(--text-3)" }}>{q.from}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: "var(--radius)",
      background: "#fff", overflow: "hidden",
    }}>
      <button onClick={onClick} style={{
        display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center",
        padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "var(--font-body)", textAlign: "left",
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: 99, flexShrink: 0, marginLeft: 16,
          background: open ? "var(--brand)" : "rgba(194,0,255,.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: open ? "#fff" : "var(--brand)", fontSize: 16, fontWeight: 700,
          transition: "all .2s",
        }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px", fontSize: 14, lineHeight: 1.75, color: "var(--text-3)" }}>{a}</div>
      )}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Има ли комисионна за поръчките?", a: "Не. Restone е създадено за директни поръчки без marketplace комисионни върху всяка продажба. Плащаш само месечния абонамент." },
    { q: "Може ли ресторантът да има собствено приложение?", a: "Да. Можем да структурираме решение с брандирано приложение за iOS и Android с твоето лого и дизайн." },
    { q: "Подходящо ли е за единични обекти и за вериги?", a: "Да. Платформата работи перфектно за единични ресторанти, по-активни обекти и цели вериги с multiple локации." },
    { q: "Колко бързо може да се стартира?", a: "Началният старт може да бъде много бърз. Ние помагаме с onboarding, качване на съдържание и настройка на целия ordering flow." },
    { q: "Нужни ли са технически познания?", a: "Не. Платформата е проектирана да бъде лесна за използване. Предоставяме обучение и поддръжка за целия ти екип." },
  ];

  return (
    <Section id="faq" style={{ background: "var(--bg-2)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <SectionHead
              eyebrow="FAQ"
              title="Честозадавани въпроси"
              body="Всичко, което трябва да знаеш преди да започнеш."
            />
            <div style={{ marginTop: 40 }}>
              <Btn href="#contact" style={{ fontSize: 15, padding: "15px 32px" }}>Задай въпрос →</Btn>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <Section style={{ padding: "80px 0" }}>
      <Container>
        <div style={{
          background: "var(--surface)", borderRadius: "var(--radius-xl)",
          padding: "72px 64px", position: "relative", overflow: "hidden",
          textAlign: "center",
        }}>
          {/* Decorative glows */}
          <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(194,0,255,.2), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, right: 80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,.12), transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <Tag>Безплатна консултация</Tag>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)",
              marginTop: 20, letterSpacing: "-.03em", lineHeight: 1.15,
            }}>
              Готов да приемаш директни поръчки?
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
              Покажи ни ресторанта си и ще ти покажем как Restone може да увеличи директните ти поръчки.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
              <Btn href="#contact" style={{ fontSize: 16, padding: "16px 36px" }}>Заяви безплатно демо →</Btn>
              <Btn href="tel:+359" variant="ghost" style={{ fontSize: 16, padding: "16px 36px", border: "1.5px solid rgba(250,250,255,.2)", color: "var(--ink)" }}>Обади се</Btn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  function change(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email) { setStatus("error"); return; }
    setStatus("loading");
    await new Promise(r => setTimeout(r, 700));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    border: "1px solid var(--border-strong)", background: "var(--bg-2)",
    fontSize: 14, color: "var(--text)", fontFamily: "var(--font-body)",
    outline: "none", transition: "border-color .15s",
  };

  return (
    <Section id="contact" style={{ background: "#fff" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionHead
              eyebrow="Контакт"
              title="Свържи се с нас"
              body="Ще ти покажем как Restone работи и как да увеличиш директните си поръчки — безплатна консултация."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
              {[
                { icon: "📍", label: "Адрес", val: "България" },
                { icon: "✉️", label: "Имейл", val: "hello@restone.bg" },
                { icon: "📞", label: "Телефон", val: "+359 XXX XXX XXX" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(194,0,255,.08)", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 20,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>{c.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "var(--bg-2)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)", padding: "40px",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text)", marginBottom: 28 }}>
              Заяви безплатна консултация
            </div>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input name="name" value={form.name} onChange={change} placeholder="Име на ресторант" style={inputStyle} />
              <input name="email" value={form.email} onChange={change} placeholder="Имейл" style={inputStyle} />
              <input name="phone" value={form.phone} onChange={change} placeholder="Телефон" style={inputStyle} />
              <textarea name="message" value={form.message} onChange={change} rows={4} placeholder="С какво можем да помогнем?" style={{ ...inputStyle, resize: "vertical" }} />
              <Btn type="submit" style={{ width: "100%", fontSize: 15, padding: "15px 28px", marginTop: 4 }}>
                {status === "loading" ? "Изпращане..." : "Изпрати запитване →"}
              </Btn>
              {status === "success" && <span style={{ fontSize: 13, color: "#059669", textAlign: "center" }}>✓ Запитването е изпратено успешно!</span>}
              {status === "error" && <span style={{ fontSize: 13, color: "#dc2626", textAlign: "center" }}>Моля, попълни поне име и имейл.</span>}
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid rgba(194,0,255,.15)", padding: "48px 0" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <a href="#top" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--brand)", letterSpacing: "-.02em" }}>
              rest<span style={{ color: "var(--accent)" }}>one</span>
            </a>
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 6 }}>Commission-free ordering · Powered by UpMenu</div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[["#features","Функции"],["#how","Как работи"],["#pricing","Цени"],["#contact","Контакт"]].map(([href,label]) => (
              <a key={href} href={href} style={{ fontSize: 14, color: "var(--ink-2)", transition: "color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--brand)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--ink-2)"}
              >{label}</a>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)" }}>© 2026 Restone.bg</div>
        </div>
      </Container>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function RestonePage() {
  return (
    <>
      <FontLoader />
      <div id="top" style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-body)" }}>
        <Header />
        <Hero />
        <Marquee />
        <StatsBar />
        <AboutUs />
        <Features />
        <DashboardShowcase />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
