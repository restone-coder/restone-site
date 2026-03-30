"use client";

import React, { useState, useEffect } from "react";

// Brand: #BF00FF (fuchsia/violet) — RestONE brand color
// Style: Stripe-inspired SaaS — white/gray-50, Inter + Plus Jakarta Sans, 1px borders

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --brand:        #BF00FF;
        --brand-dark:   #9A00CC;
        --brand-light:  #D84DFF;
        --brand-bg:     #F9F0FF;
        --brand-border: #E5C0FF;
        --gray-0:   #FFFFFF;
        --gray-50:  #F9FAFB;
        --gray-100: #F3F4F6;
        --gray-200: #E5E7EB;
        --gray-700: #374151;
        --gray-800: #1F2937;
        --gray-900: #111827;
        --text-2:   #374151;
        --text-3:   #6B7280;
        --border:   #E5E7EB;
        --shadow-sm: 0 1px 3px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.04);
        --shadow-md: 0 4px 16px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04);
        --shadow-lg: 0 12px 40px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.04);
        --shadow-brand: 0 8px 32px rgba(191,0,255,.2);
        --r:    8px;
        --r-lg: 14px;
        --r-xl: 20px;
        --font-body: 'Inter', system-ui, sans-serif;
        --font-head: 'Plus Jakarta Sans', sans-serif;
      }
      html { scroll-behavior: smooth; }
      body { font-family: var(--font-body); background: #fff; color: var(--gray-900); -webkit-font-smoothing: antialiased; }
      a { text-decoration: none; color: inherit; }
      img { display: block; max-width: 100%; }
      video { display: block; max-width: 100%; }
      ::selection { background: var(--brand); color: #fff; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-thumb { background: var(--brand-border); border-radius: 99px; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      .fu  { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
      .d1  { animation-delay: .08s; }
      .d2  { animation-delay: .16s; }
      .d3  { animation-delay: .24s; }
      .d4  { animation-delay: .32s; }
      @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
      .mq  { animation: marquee 32s linear infinite; }
    `}</style>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Btn({ children, href, onClick, variant = "primary", style = {}, type = "button" }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 7, borderRadius: 8, padding: "10px 18px",
    fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
    cursor: "pointer", transition: "all .15s", border: "none",
    textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "-.01em",
  };
  const vs = {
    primary:   { background: "var(--brand)", color: "#fff", boxShadow: "0 1px 3px rgba(191,0,255,.35), inset 0 1px 0 rgba(255,255,255,.12)" },
    secondary: { background: "#fff", color: "var(--gray-800)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" },
    ghost:     { background: "transparent", color: "var(--brand)", border: "1px solid var(--brand-border)" },
  };
  const merged = { ...base, ...(vs[variant] || vs.primary), ...style };
  if (href) return <a href={href} style={merged}>{children}</a>;
  return <button type={type} onClick={onClick} style={merged}>{children}</button>;
}

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "var(--brand-bg)", color: "var(--brand)",
      border: "1px solid var(--brand-border)",
      borderRadius: 99, padding: "4px 12px",
      fontSize: 12, fontWeight: 600, letterSpacing: ".02em",
    }}>{children}</span>
  );
}

function Wrap({ children, id, style = {} }) {
  return <section id={id} style={{ padding: "88px 0", position: "relative", ...style }}>{children}</section>;
}

function Box({ children, style = {} }) {
  return <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 32px", ...style }}>{children}</div>;
}

function SectionLabel({ eyebrow, title, sub, center = false, maxW = 560 }) {
  return (
    <div style={{ maxWidth: center ? maxW : maxW, margin: center ? "0 auto" : undefined, textAlign: center ? "center" : "left" }}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 style={{
        fontFamily: "var(--font-head)", fontWeight: 800,
        fontSize: "clamp(1.75rem, 3vw, 2.4rem)", lineHeight: 1.2,
        color: "var(--gray-900)", letterSpacing: "-.03em",
        marginTop: eyebrow ? 14 : 0,
      }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-3)", marginTop: 12 }}>{sub}</p>}
    </div>
  );
}

function Check({ text }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{
        width: 18, height: 18, borderRadius: 99, flexShrink: 0, marginTop: 2,
        background: "var(--brand-bg)", border: "1px solid var(--brand-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "var(--brand)",
      }}>✓</span>
      <span style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-2)" }}>{text}</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,.93)" : "transparent",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all .25s",
    }}>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Real logo */}
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/icon.png" alt="RestONE icon" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <img src="/logo.png" alt="RestONE" style={{ height: 28, width: "auto" }} />
        </a>

        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[["#features","Функции"],["#products","Продукти"],["#how","Как работи"],["#pricing","Цени"],["#faq","FAQ"]].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--text-3)", padding: "6px 12px", borderRadius: 6, transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--gray-900)"; e.currentTarget.style.background = "var(--gray-50)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.background = "transparent"; }}
            >{label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 8 }}>
          <Btn href="#contact" variant="secondary">Вход</Btn>
          <Btn href="#contact">Заяви демо</Btn>
        </div>
      </Box>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Wrap id="top" style={{
      padding: "64px 0 96px",
      background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: .3,
        backgroundImage: "linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black, transparent)",
        maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black, transparent)",
        pointerEvents: "none",
      }} />

      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", position: "relative" }}>
          {/* Left */}
          <div>
            <div className="fu"><Badge>✦ All-in-one ресторантска платформа</Badge></div>
            <h1 className="fu d1" style={{
              fontFamily: "var(--font-head)", fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.12,
              color: "var(--gray-900)", letterSpacing: "-.04em", marginTop: 18,
            }}>
              Онлайн поръчки за ресторанти,{" "}
              <span style={{ color: "var(--brand)" }}>без комисионни</span>
            </h1>
            <p className="fu d2" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-3)", marginTop: 16, maxWidth: 440 }}>
              Собствен ordering сайт, брандирано мобилно приложение и пълен контрол — без посредници и без такси.
            </p>
            <div className="fu d3" style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["0% комисионни — само фиксиран месечен план","Собствено iOS + Android приложение с твоя бранд","Ordering website, checkout и меню в едно","Пълен контрол над клиентите и данните"].map(t => <Check key={t} text={t} />)}
            </div>
            <div className="fu d4" style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
              <Btn href="#contact" style={{ fontSize: 15, padding: "12px 22px" }}>Заяви безплатно демо →</Btn>
              <Btn href="#products" variant="secondary" style={{ fontSize: 15, padding: "12px 22px" }}>Виж продуктите</Btn>
            </div>
            <div className="fu d4" style={{ display: "flex", gap: 20, marginTop: 32, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--text-3)" }}>Доверяват ни се:</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-900)" }}>100+ ресторанта</span>
              <div style={{ width: 1, height: 14, background: "var(--border)" }} />
              <span style={{ fontSize: 13, color: "var(--text-3)" }}>от 2012 г.</span>
            </div>
          </div>

          {/* Right — app preview image */}
          <div className="fu d2" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,0,255,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <img
              src="/app-preview.jpg"
              alt="RestONE app preview"
              style={{ width: "100%", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-lg)", position: "relative", zIndex: 1 }}
            />
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee() {
  const items = ["0% комисионни","Собствен бранд","iOS + Android App","Ordering Website","Loyalty програма","QR меню","Delivery управление","Маркетинг автоматизация","0% комисионни","Собствен бранд","iOS + Android App","Ordering Website","Loyalty програма","QR меню","Delivery управление","Маркетинг автоматизация"];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--gray-50)", overflow: "hidden", padding: "13px 0" }}>
      <div className="mq" style={{ display: "flex", width: "max-content" }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-3)", padding: "0 22px", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "var(--brand-border)", fontSize: 12 }}>◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <Wrap style={{ padding: "64px 0", background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { v: "0%",            l: "Комисионни от поръчки" },
            { v: "100+",          l: "Ресторанта ни ползват" },
            { v: "iOS + Android", l: "Мобилно присъствие" },
            { v: "2012",          l: "Година на основаване" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 24px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)", color: "var(--brand)", letterSpacing: "-.03em" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 5, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Products (10) ────────────────────────────────────────────────────────────

function ProductCard({ icon, title, text }) {
  return (
    <div style={{ padding: "22px", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-sm)", transition: "box-shadow .2s, border-color .2s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--brand-border)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--brand-bg)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--gray-900)", marginTop: 12, letterSpacing: "-.01em" }}>{title}</div>
      <p style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-3)", marginTop: 5 }}>{text}</p>
    </div>
  );
}

function Products() {
  const products = [
    { icon: "🛒", title: "Онлайн система за поръчки", text: "Продавай директно без комисионни. Меню, поръчки и доставки от едно място." },
    { icon: "🌐", title: "Website Builder", text: "Ресторантски сайт с drag-and-drop — без програмисти, с вграден ordering." },
    { icon: "📱", title: "Брандирано мобилно приложение", text: "Собствен iOS + Android app. Спести до 90% от комисионни." },
    { icon: "📣", title: "Маркетинг инструменти", text: "Промоции, SMS/Email/Push кампании, автоматизация и отчети." },
    { icon: "⭐", title: "Loyalty програма", text: "Настрой за под 5 мин. Увеличи средната поръчка с до 25%." },
    { icon: "📦", title: "Агрегация на поръчки", text: "Всички канали на едно място — без множество таблети." },
    { icon: "📲", title: "QR Code меню & поръчки", text: "Клиентите поръчват и плащат от телефона. По-малко персонал." },
    { icon: "🚚", title: "Управление на доставки", text: "Куриери, маршрути и real-time проследяване до клиента." },
    { icon: "🔀", title: "Delivery Dispatcher", text: "Доставки без флот — Glovo, Wolt Drive, Uber Direct, Stuart." },
    { icon: "⚙️", title: "Интеграции", text: "POS системи, delivery услуги, аналитика и онлайн плащания." },
  ];
  return (
    <Wrap id="products" style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <SectionLabel eyebrow="Нашето предложение" title="Всичко за успешни директни продажби" sub="Пълна all-in-one платформа — от ordering website до delivery управление." center maxW={580} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 48 }}>
          {products.slice(0, 5).map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 10 }}>
          {products.slice(5).map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Feature: Dashboard ───────────────────────────────────────────────────────

function FeatureDashboard() {
  return (
    <Wrap id="features" style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionLabel
              eyebrow="Управление"
              title="Всички поръчки на едно място"
              sub="Интуитивен dashboard, проектиран за ресторантьори — не за IT специалисти."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["Поръчки и статуси в реално време","Delivery, Pickup, Dine-in — всичко в едно","Управление на клиенти и история","Детайлни приходни отчети","Интеграция с POS системи"].map(t => <Check key={t} text={t} />)}
            </div>
            <div style={{ marginTop: 28 }}><Btn href="#contact">Заяви демо →</Btn></div>
          </div>
          {/* Real dashboard screenshot */}
          <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
            <img src="/dashboard.png" alt="RestONE Dashboard" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Feature: Mobile App ──────────────────────────────────────────────────────

function FeatureApp() {
  return (
    <Wrap style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Real app screenshot */}
          <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
            <img src="/app.png" alt="RestONE Mobile App" style={{ width: "100%", display: "block" }} />
          </div>
          <div>
            <SectionLabel
              eyebrow="Мобилно приложение"
              title="Собствено брандирано приложение за ресторанта"
              sub="Клиентите поръчват директно от твоя app — без посредници и без комисионни."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["Брандиран iOS + Android app с твоя лого","Спести до 90% от комисионни на трети страни","Push известия и директни кампании","Loyalty програма и stamps в app-а","По-лесни повторни поръчки"].map(t => <Check key={t} text={t} />)}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <Btn href="#contact">Заяви демо →</Btn>
              <div style={{ display: "flex", gap: 8 }}>
                {[["App Store","iOS"],["Google Play","Android"]].map(([s,os]) => (
                  <div key={s} style={{ background: "var(--gray-900)", color: "#fff", borderRadius: 10, padding: "8px 14px" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".06em" }}>{os}</div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 12, marginTop: 1 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Feature: Website Builder ─────────────────────────────────────────────────

function FeatureWebsite() {
  return (
    <Wrap style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionLabel
              eyebrow="Website Builder"
              title="Ресторантски сайт без програмисти"
              sub="Drag-and-drop редактор с вграден online ordering, резервации и меню."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["Drag-and-drop редактор — без код","Вграден ordering flow и checkout","Поддържа multiple локации","Mobile-first дизайн","Меню, промоции и резервации"].map(t => <Check key={t} text={t} />)}
            </div>
            <div style={{ marginTop: 28 }}><Btn href="#contact">Заяви демо →</Btn></div>
          </div>
          <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
            <img src="/buildyourweb.jpg" alt="Website Builder" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Feature: Delivery ────────────────────────────────────────────────────────

function FeatureDelivery() {
  return (
    <Wrap style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
            <img src="/deliverysystem.png" alt="Delivery System" style={{ width: "100%", display: "block" }} />
          </div>
          <div>
            <SectionLabel
              eyebrow="Delivery управление"
              title="Собствена система за доставки"
              sub="Управлявай куриерите, маршрутите и поръчките без външни платформи."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["Real-time проследяване на доставките","Assign куриери и оптимизирани маршрути","Courier App за шофьорите","Dispatcher — Glovo, Wolt Drive, Uber Direct","По-бързи доставки, по-ниски разходи"].map(t => <Check key={t} text={t} />)}
            </div>
            <div style={{ marginTop: 28 }}><Btn href="#contact">Заяви демо →</Btn></div>
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <Wrap style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "72px 0" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionLabel eyebrow="За нас" title="Помагаме на ресторанти да растат от 2012 г." sub="Над 100 ресторантьора ни се доверяват. От onboarding до постоянна поддръжка — ние сме до теб." />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 26 }}>
              {["Гъвкави инструменти, пригодени за всеки ресторант","Платформата постоянно увеличава стойността на поръчките","По-добро задържане на клиенти при всички наши партньори","Реална поддръжка от хора — не от ботове"].map(t => <Check key={t} text={t} />)}
            </div>
            <div style={{ marginTop: 28 }}><Btn href="#contact">Свържи се с нас →</Btn></div>
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", padding: "32px" }}>
              <div style={{ fontSize: 32, color: "var(--brand-border)", lineHeight: 1 }}>❝</div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--gray-800)", marginTop: 10, fontWeight: 500 }}>
                За тези 10 години спестихме $1.5 млн. — толкова щяха да струват комисионните при 15% такса към трети страни.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--brand-bg)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 13, color: "var(--brand)" }}>JD</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--gray-900)" }}>Jane Doe</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 1 }}>Собственик, XYZ Restaurant</div>
                </div>
                <span style={{ marginLeft: "auto", background: "#F0FDF4", color: "#15803D", border: "1px solid #BBF7D0", borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>⭐ 4.9 / 5</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              {[["$1.5 млн.","Спестени комисионни"],["100+","Доволни ресторанти"]].map(([v,l]) => (
                <div key={l} style={{ background: "#fff", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", padding: "18px", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, color: "var(--brand)", letterSpacing: "-.02em" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { n: "01", title: "Активираме ordering канала", text: "Добавяме online ordering към сайта или изграждаме нов website за часове." },
    { n: "02", title: "Клиентите поръчват директно", text: "Поръчките идват от твоя бранд — без marketplace такси." },
    { n: "03", title: "Екипът обработва", text: "Всяка поръчка влиза в dashboard-а и се обработва лесно." },
    { n: "04", title: "Повече директна печалба", text: "Запазваш по-голяма част от продажбата без комисионни." },
  ];
  return (
    <Wrap id="how" style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <SectionLabel eyebrow="Как работи" title="Прост старт. Реални резултати." sub="От настройка до първата директна поръчка — ние помагаме на всяка стъпка." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 52, position: "relative" }}>
          <div style={{ position: "absolute", top: 25, left: "11%", right: "11%", height: 1, backgroundImage: "repeating-linear-gradient(90deg, var(--brand-border) 0, var(--brand-border) 6px, transparent 6px, transparent 14px)", zIndex: 0 }} />
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 50, height: 50, borderRadius: 13, background: i === 3 ? "var(--brand)" : "#fff", border: `1.5px solid ${i === 3 ? "var(--brand)" : "var(--brand-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, color: i === 3 ? "#fff" : "var(--brand)", boxShadow: "var(--shadow-sm)" }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, color: "var(--gray-900)", marginTop: 14, letterSpacing: "-.01em" }}>{s.title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-3)", marginTop: 7 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PCard({ name, price, sub, features, featured = false }) {
  return (
    <div style={{ padding: "30px 26px", background: featured ? "var(--brand)" : "#fff", border: `1.5px solid ${featured ? "var(--brand)" : "var(--border)"}`, borderRadius: "var(--r-xl)", position: "relative", boxShadow: featured ? "var(--shadow-brand)" : "var(--shadow-sm)" }}>
      {featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gray-900)", color: "#fff", borderRadius: 99, padding: "3px 14px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: ".04em" }}>НАЙ-ПОПУЛЯРЕН</div>}
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 17, color: featured ? "#fff" : "var(--gray-900)" }}>{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 40, color: featured ? "#fff" : "var(--brand)", letterSpacing: "-.04em" }}>{price}</span>
        <span style={{ fontSize: 13, color: featured ? "rgba(255,255,255,.6)" : "var(--text-3)" }}>/мес.</span>
      </div>
      <div style={{ fontSize: 12, color: featured ? "rgba(255,255,255,.6)" : "var(--text-3)", marginTop: 1 }}>{sub}</div>
      <div style={{ height: 1, background: featured ? "rgba(255,255,255,.15)" : "var(--border)", margin: "18px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: featured ? "rgba(255,255,255,.75)" : "var(--brand)", fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: featured ? "rgba(255,255,255,.85)" : "var(--text-2)" }}>{f}</span>
          </div>
        ))}
      </div>
      <Btn href="#contact" variant={featured ? "secondary" : "ghost"} style={{ width: "100%", marginTop: 26, fontSize: 13, ...(featured ? { background: "#fff", color: "var(--brand)", border: "none" } : {}) }}>Избери план</Btn>
    </div>
  );
}

function AddonCard({ name, price, per, text }) {
  return (
    <div style={{ padding: "18px", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-sm)", transition: "border-color .15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--brand-border)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--gray-900)" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 18, color: "var(--brand)", whiteSpace: "nowrap" }}>{price}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--text-3)" }}>/мес.</span></div>
      </div>
      {per && <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1 }}>{per}</div>}
      <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-3)", marginTop: 9 }}>{text}</p>
    </div>
  );
}

function Pricing() {
  return (
    <Wrap id="pricing" style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <SectionLabel eyebrow="Цени" title="Прозрачни планове, без скрити такси" sub="Фиксиран месечен абонамент на локация. Нула комисионни." center />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 48, alignItems: "start" }}>
          <PCard name="Basic" price="€49" sub="До 75 поръчки · за 1 локация"
            features={["Ordering website","Онлайн поръчки без комисионни","Онлайн плащания","Много локации","Безплатна начална настройка"]} />
          <PCard name="Standard" price="€89" sub="До 210 поръчки · за 1 локация" featured
            features={["Всичко от Basic","Поръчки на масата (QR)","Резервации на маси","Email & SMS маркетинг","Купони и промо кодове"]} />
          <PCard name="Premium" price="€169" sub="Неограничени поръчки · за 1 локация"
            features={["Всичко от Standard","Неограничени поръчки","Маркетинг автоматизация","Gift Cards","Item Recommendations","Множество менюта"]} />
        </div>

        <div style={{ marginTop: 64 }}>
          <SectionLabel eyebrow="Добавки" title="Разшири с addon-и" sub="Добавяй само това, от което имаш нужда." center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 32 }}>
            {[
              { name: "Мобилно приложение", price: "€49", per: "за 1 локация", text: "Собствен брандиран app за iOS и Android." },
              { name: "Loyalty програма", price: "€19", per: "за 1 локация", text: "Автоматизирана reward система за редовни клиенти." },
              { name: "Delivery Dispatcher", price: "€40", per: "достъп до всички куриери", text: "Glovo, Wolt Drive, Uber Direct, Stuart — без собствен флот." },
              { name: "Driver App", price: "€14", per: "за 1 шофьор", text: "Управлявай куриерите с мобилен courier app." },
              { name: "Агрегация на поръчки", price: "€40", per: "за 1 локация", text: "Всички канали на едно място — без множество таблети." },
              { name: "POS интеграции", price: "€0", per: "за 1 локация", text: "Синхронизирай онлайн поръчките с твоята POS система." },
            ].map((a, i) => <AddonCard key={i} {...a} />)}
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <Wrap style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <SectionLabel eyebrow="Резултати" title="Какво казват ресторантьорите" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 44 }}>
          {[
            { q: "Поръчките вече идват директно и задържаме много повече от всяка продажба.", f: "Ресторант, София" },
            { q: "Клиентите се връщат много по-често откакто имаме собствено приложение.", f: "Пицария, Пловдив" },
            { q: "Най-голямата разлика е контролът върху клиента и нулевите комисионни.", f: "Верига, България" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>)}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--gray-800)", marginTop: 12 }}>{t.q}</p>
              <div style={{ marginTop: 18, fontSize: 12, fontWeight: 600, color: "var(--text-3)" }}>{t.f}</div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-lg)", background: "#fff", overflow: "hidden" }}>
      <button onClick={onClick} style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", textAlign: "left" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)" }}>{q}</span>
        <span style={{ width: 22, height: 22, borderRadius: 99, flexShrink: 0, marginLeft: 14, background: open ? "var(--brand)" : "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", color: open ? "#fff" : "var(--text-3)", fontSize: 14, fontWeight: 700, transition: "all .15s" }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div style={{ padding: "0 18px 16px", fontSize: 13, lineHeight: 1.75, color: "var(--text-3)" }}>{a}</div>}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Има ли комисионна от поръчките?", a: "Не. RestONE работи с фиксиран месечен абонамент — нулеви комисионни от поръчките, за разлика от Glovo, Wolt и подобни." },
    { q: "Може ли ресторантът да има собствено мобилно приложение?", a: "Да. Addon за брандиран iOS + Android app с твоя лого и дизайн — €49/мес. на локация." },
    { q: "Подходящо ли е за единични обекти и вериги?", a: "Да. Платформата поддържа единични ресторанти, активни обекти и вериги с множество локации." },
    { q: "Колко бързо може да се стартира?", a: "Много бързо. Ние помагаме с onboarding, качване на менюто и настройка — безплатна начална настройка за всички планове." },
    { q: "Какви интеграции се поддържат?", a: "POS системи (Toast, Clover, Lightspeed, MICROS), delivery (Glovo, Wolt Drive, Uber Direct, Stuart) и онлайн плащания." },
    { q: "Нужни ли са технически познания?", a: "Не. Платформата е проектирана за ресторантьори. Предоставяме обучение и поддръжка за целия екип." },
  ];
  return (
    <Wrap id="faq" style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80 }}>
          <div>
            <SectionLabel eyebrow="FAQ" title="Честозадавани въпроси" sub="Всичко, което трябва да знаеш преди да стартираш." />
            <div style={{ marginTop: 28 }}><Btn href="#contact">Задай въпрос →</Btn></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {faqs.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />)}
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <Wrap style={{ padding: "64px 0", background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ background: "var(--brand-bg)", border: "1px solid var(--brand-border)", borderRadius: "var(--r-xl)", padding: "56px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,0,255,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--gray-900)", letterSpacing: "-.03em", lineHeight: 1.2 }}>Готов да приемаш директни поръчки без комисионни?</h2>
            <p style={{ fontSize: 15, color: "var(--text-3)", marginTop: 10, lineHeight: 1.7 }}>Безплатна консултация — ще ти покажем как RestONE работи за твоя ресторант.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <Btn href="#contact" style={{ fontSize: 15, padding: "12px 22px" }}>Заяви демо →</Btn>
            <Btn href="tel:+359" variant="secondary" style={{ fontSize: 15, padding: "12px 22px" }}>Обади се</Btn>
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

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
  const inp = { width: "100%", padding: "10px 13px", borderRadius: "var(--r)", border: "1px solid var(--border)", background: "#fff", fontSize: 14, color: "var(--gray-900)", fontFamily: "var(--font-body)", outline: "none", boxShadow: "var(--shadow-sm)", transition: "border-color .15s" };
  return (
    <Wrap id="contact" style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--border)" }}>
      <Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionLabel eyebrow="Контакт" title="Свържи се с нас" sub="Ще ти покажем как RestONE може да работи за твоето заведение." />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 32 }}>
              {[{ icon:"📍", l:"Адрес", v:"България" },{ icon:"✉️", l:"Имейл", v:"hello@restone.bg" },{ icon:"📞", l:"Телефон", v:"+359 XXX XXX XXX" }].map(c => (
                <div key={c.l} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--brand-bg)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{c.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", marginTop: 1 }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", padding: "32px" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 19, color: "var(--gray-900)", marginBottom: 22 }}>Заяви безплатна консултация</div>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input name="name" value={form.name} onChange={change} placeholder="Ime на ресторант" style={inp} onFocus={e => e.target.style.borderColor = "var(--brand)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <input name="email" value={form.email} onChange={change} placeholder="Имейл" style={inp} onFocus={e => e.target.style.borderColor = "var(--brand)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <input name="phone" value={form.phone} onChange={change} placeholder="Телефон" style={inp} onFocus={e => e.target.style.borderColor = "var(--brand)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <textarea name="message" value={form.message} onChange={change} rows={4} placeholder="С какво можем да помогнем?" style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = "var(--brand)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <Btn type="submit" style={{ width: "100%", fontSize: 14, padding: "11px", marginTop: 2 }}>
                {status === "loading" ? "Изпращане..." : "Изпрати запитване →"}
              </Btn>
              {status === "success" && <span style={{ fontSize: 13, color: "#15803D", textAlign: "center" }}>✓ Изпратено успешно!</span>}
              {status === "error" && <span style={{ fontSize: 13, color: "#DC2626", textAlign: "center" }}>Попълни поне ime и имейл.</span>}
            </form>
          </div>
        </div>
      </Box>
    </Wrap>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "var(--gray-50)", borderTop: "1px solid var(--border)", padding: "36px 0" }}>
      <Box>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div>
            <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="/icon.png" alt="RestONE" style={{ width: 24, height: 24, borderRadius: 6 }} />
              <img src="/logo.png" alt="RestONE" style={{ height: 22, width: "auto" }} />
            </a>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>All-in-one restaurant platform · Powered by UpMenu</div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[["#products","Продукти"],["#how","Как работи"],["#pricing","Цени"],["#contact","Контакт"]].map(([href,l]) => (
              <a key={href} href={href} style={{ fontSize: 13, color: "var(--text-3)", transition: "color .15s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gray-900)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>© 2026 Restone.bg</div>
        </div>
      </Box>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function RestonePage() {
  return (
    <>
      <GlobalStyles />
      <div id="top">
        <Header />
        <Hero />
        <Marquee />
        <Stats />
        <Products />
        <FeatureDashboard />
        <FeatureApp />
        <FeatureWebsite />
        <FeatureDelivery />
        <About />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
}