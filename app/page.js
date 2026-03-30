"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Filter,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  MenuSquare,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const logoImage = "/mnt/data/ChatGPT Image Mar 21, 2026, 01_40_57 PM.png";
const phoneImage = "/mnt/data/3736.jpg";

const copy = {
  bg: {
    site: "Сайт",
    admin: "Админ",
    heroBadge: "Онлайн поръчки за ресторанти без посредници",
    heroTitle1: "Онлайн поръчки без комисионни",
    heroTitle2: "собствено приложение и уебсайт за твоето заведение",
    heroText:
      "Restone помага на ресторанти да приемат директни поръчки от собствен сайт и мобилно приложение, без комисионни към външни delivery платформи.",
    cta: "Заяви демо",
    ctaSecondary: "Виж платформата",
    navFeatures: "Функции",
    navProducts: "Продукти",
    navPricing: "Цени",
    navFaq: "Въпроси",
    navContact: "Контакт",
    quickBadge: "Бърз старт. Нулев риск.",
    quickTitle: "Стартирай за минути",
    pricingTitle: "Планове за ресторанти, които искат повече директни поръчки",
    pricingText: "Без комисионни. Фиксиран месечен план. По-голям контрол върху продажбите.",
    faqTitle: "Често задавани въпроси",
    contactTitle: "Свържи се с нас",
    contactText: "Ще ти покажем как Restone може да работи за твоето заведение.",
    submit: "Изпрати запитване",
    startFree: "Започни сега",
    mostPopular: "Най-популярен",
  },
  en: {
    site: "Site",
    admin: "Admin",
    heroBadge: "Commission-free online ordering for restaurants",
    heroTitle1: "Commission-free ordering",
    heroTitle2: "your own app and website for your restaurant",
    heroText:
      "Restone helps restaurants take direct orders through their own website and mobile app without paying commissions to third-party delivery platforms.",
    cta: "Book a demo",
    ctaSecondary: "See the platform",
    navFeatures: "Features",
    navProducts: "Products",
    navPricing: "Pricing",
    navFaq: "FAQ",
    navContact: "Contact",
    quickBadge: "Quick start. No risk.",
    quickTitle: "Get started in minutes",
    pricingTitle: "Plans for restaurants that want more direct orders",
    pricingText: "No commissions. Fixed monthly plan. More control over sales.",
    faqTitle: "Frequently asked questions",
    contactTitle: "Get in touch",
    contactText: "We’ll show you how Restone can work for your venue.",
    submit: "Send inquiry",
    startFree: "Get started",
    mostPopular: "Most popular",
  },
};

const landingData = {
  highlights: [
    { bg: "0% комисионна към delivery apps", en: "0% commission to delivery apps" },
    { bg: "Собствен бранд и директна връзка с клиента", en: "Own brand and direct customer relationship" },
    { bg: "Мобилно приложение за iOS и Android", en: "Mobile app for iOS and Android" },
    { bg: "Уебсайт, checkout и меню в една система", en: "Website, checkout, and menu in one system" },
  ],
  quickBullets: [
    {
      bg: "Нямаш време? Ние ще настроим всичко вместо теб — безплатна начална настройка.",
      en: "No time? We’ll set everything up for you — free initial setup included.",
    },
    {
      bg: "7 дни поддръжка чрез чат и имейл — преди и след старта.",
      en: "7-day support via chat and email — before and after launch.",
    },
    {
      bg: "Реални хора на линия — без ботове.",
      en: "Real people support — no bots.",
    },
    {
      bg: "Лесно onboarding обучение за твоя екип.",
      en: "Simple onboarding for your team.",
    },
    {
      bg: "Пробен период — тествай без риск.",
      en: "Trial period — test everything with no risk.",
    },
  ],
  features: [
    {
      icon: ShoppingCart,
      title: { bg: "Поръчки без комисионни", en: "Commission-free ordering" },
      text: {
        bg: "Приемай директни онлайн поръчки от твоя собствен канал вместо да губиш марж в marketplace такси.",
        en: "Take direct online orders through your own channel instead of losing margin to marketplace fees.",
      },
    },
    {
      icon: Globe,
      title: { bg: "Собствен ordering website", en: "Own ordering website" },
      text: {
        bg: "Професионален ресторантски сайт с меню, промоции, checkout, pickup и delivery flow.",
        en: "A professional restaurant website with menu, promotions, checkout, pickup, and delivery flow.",
      },
    },
    {
      icon: Smartphone,
      title: { bg: "Брандирано мобилно приложение", en: "Branded mobile app" },
      text: {
        bg: "Собствен app за iOS и Android за повторни поръчки, loyalty и силна връзка с клиента.",
        en: "Your own iOS and Android app for repeat orders, loyalty, and stronger customer relationships.",
      },
    },
    {
      icon: BarChart3,
      title: { bg: "Маркетинг и retention", en: "Marketing and retention" },
      text: {
        bg: "Промо кодове, кампании, CRM и по-добър контрол върху повторните поръчки.",
        en: "Promo codes, campaigns, CRM, and better control over repeat ordering.",
      },
    },
    {
      icon: CreditCard,
      title: { bg: "Плащания и фактуриране", en: "Payments and billing" },
      text: {
        bg: "Готово за абонаменти, checkout и бъдещо автоматизирано billing решение.",
        en: "Ready for subscriptions, checkout, and future automated billing flows.",
      },
    },
    {
      icon: Users,
      title: { bg: "Контрол върху клиента", en: "Own your customer" },
      text: {
        bg: "Запази клиентските данни, навици и канали за комуникация във вашата система.",
        en: "Keep customer data, habits, and communication channels in your own system.",
      },
    },
  ],
  products: [
    {
      label: { bg: "Онлайн поръчки", en: "Online Ordering" },
      title: { bg: "Поръчки директно от твоя бранд", en: "Direct ordering from your own brand" },
      text: {
        bg: "Клиентите поръчват от вашия сайт и приложение, без посредници и без комисионни към външни платформи.",
        en: "Customers order from your website and app without посредници and without commissions to external platforms.",
      },
      bullets: [
        { bg: "0% marketplace commission", en: "0% marketplace commission" },
        { bg: "Delivery и pickup", en: "Delivery and pickup" },
        { bg: "Бърз checkout", en: "Fast checkout" },
      ],
    },
    {
      label: { bg: "Уебсайт", en: "Website" },
      title: { bg: "Сайт, който продава", en: "A website that converts" },
      text: {
        bg: "Модерен storefront с меню, промоции, категории и ясни call-to-action елементи за повече директни поръчки.",
        en: "A modern storefront with menu, promotions, categories, and clear calls-to-action for more direct orders.",
      },
      bullets: [
        { bg: "Промоции и банери", en: "Promotions and banners" },
        { bg: "Меню и добавки", en: "Menu and modifiers" },
        { bg: "Силен mobile experience", en: "Strong mobile experience" },
      ],
    },
    {
      label: { bg: "Приложение", en: "App" },
      title: { bg: "Собствено приложение за ресторанта", en: "Your own restaurant app" },
      text: {
        bg: "Присъствие в App Store и Google Play за по-лесни повторни поръчки и по-силен бранд.",
        en: "Presence in the App Store and Google Play for easier repeat ordering and stronger branding.",
      },
      bullets: [
        { bg: "iOS + Android", en: "iOS + Android" },
        { bg: "Push комуникация", en: "Push communication" },
        { bg: "Loyalty възможности", en: "Loyalty features" },
      ],
    },
  ],
  pricing: [
    {
      name: "Basic",
      price: "€49",
      orders: { bg: "До 75 поръчки", en: "Up to 75 orders" },
      items: [
        { bg: "Собствен ordering website", en: "Own ordering website" },
        { bg: "Меню и checkout", en: "Menu and checkout" },
        { bg: "Поръчки без комисионни", en: "Commission-free ordering" },
      ],
    },
    {
      name: "Standard",
      price: "€89",
      featured: true,
      orders: { bg: "До 210 поръчки", en: "Up to 210 orders" },
      items: [
        { bg: "Всичко от Basic", en: "Everything in Basic" },
        { bg: "Маркетинг и loyalty", en: "Marketing and loyalty" },
        { bg: "По-силен direct ordering канал", en: "Stronger direct ordering channel" },
      ],
    },
    {
      name: "Premium",
      price: "€169",
      orders: { bg: "Неограничени поръчки", en: "Unlimited orders" },
      items: [
        { bg: "Всичко от Standard", en: "Everything in Standard" },
        { bg: "Неограничен обем", en: "Unlimited volume" },
        { bg: "Подходящо за растеж и вериги", en: "Great for growth and chains" },
      ],
    },
  ],
  faqs: [
    {
      q: { bg: "Има ли комисионна за поръчките?", en: "Do you charge commission on orders?" },
      a: {
        bg: "Не. Restone е създадено за директни онлайн поръчки без marketplace комисионни към всяка продажба.",
        en: "No. Restone is built for direct online ordering without marketplace commissions on every sale.",
      },
    },
    {
      q: { bg: "Мога ли да имам собствен app за ресторанта?", en: "Can I have my own restaurant app?" },
      a: {
        bg: "Да. В зависимост от плана приложението може да бъде add-on или включено в по-висок пакет.",
        en: "Yes. Depending on the plan, the app can be an add-on or included in a higher package.",
      },
    },
    {
      q: { bg: "Подходящо ли е за единични обекти и вериги?", en: "Is it suitable for single locations and chains?" },
      a: {
        bg: "Да. Подходящо е както за единични ресторанти, така и за по-активни обекти и вериги.",
        en: "Yes. It works for both single restaurants and larger chains.",
      },
    },
  ],
};

const adminStats = [
  { title: "Нови запитвания", value: "24", note: "+8 тази седмица", icon: Mail },
  { title: "Насрочени демота", value: "11", note: "3 днес", icon: CalendarDays },
  { title: "Активни клиенти", value: "18", note: "+2 този месец", icon: Store },
  { title: "Месечен приход", value: "€1,842", note: "от абонаменти", icon: CreditCard },
];

const leads = [
  {
    restaurant: "Burger House Plovdiv",
    owner: "Николай Георгиев",
    email: "nikolay@burgerhouse.bg",
    phone: "+359 88 123 4567",
    plan: "Standard",
    status: "new",
    source: "Landing page",
    date: "Днес, 11:24",
  },
  {
    restaurant: "Pizza Roma",
    owner: "Мария Петрова",
    email: "maria@pizzaroma.bg",
    phone: "+359 89 555 1100",
    plan: "Premium",
    status: "contacted",
    source: "Demo form",
    date: "Днес, 09:10",
  },
  {
    restaurant: "Sushi Point Varna",
    owner: "Ivan Dimitrov",
    email: "hello@sushipoint.bg",
    phone: "+359 87 777 2200",
    plan: "Basic",
    status: "demo",
    source: "Pricing section",
    date: "Вчера, 16:42",
  },
  {
    restaurant: "Green Bowl Sofia",
    owner: "Елица Тодорова",
    email: "office@greenbowl.bg",
    phone: "+359 88 222 9911",
    plan: "Standard",
    status: "converted",
    source: "Contact form",
    date: "Вчера, 13:08",
  },
];

const clients = [
  { name: "Pizza Roma", plan: "Premium", monthly: "€169", billing: "Активен", onboarding: "Завършен", app: "iOS + Android" },
  { name: "Burger House Plovdiv", plan: "Standard", monthly: "€89", billing: "Чака плащане", onboarding: "Demo booked", app: "Add-on" },
  { name: "Green Bowl Sofia", plan: "Standard", monthly: "€89", billing: "Активен", onboarding: "В процес", app: "iOS" },
];

function t(lang, item) {
  return item[lang];
}

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function StatusBadge({ status }) {
  const map = {
    new: "bg-orange-100 text-orange-700 border-orange-200",
    contacted: "bg-blue-100 text-blue-700 border-blue-200",
    demo: "bg-violet-100 text-violet-700 border-violet-200",
    converted: "bg-green-100 text-green-700 border-green-200",
    "Активен": "bg-green-100 text-green-700 border-green-200",
    "Чака плащане": "bg-orange-100 text-orange-700 border-orange-200",
    "Завършен": "bg-green-100 text-green-700 border-green-200",
    "В процес": "bg-blue-100 text-blue-700 border-blue-200",
    "Demo booked": "bg-violet-100 text-violet-700 border-violet-200",
  };

  const labelMap = {
    new: "Ново",
    contacted: "Контактуван",
    demo: "Demo",
    converted: "Клиент",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {labelMap[status] || status}
    </span>
  );
}

function FloatingToggle({ view, setView, lang, setLang }) {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 p-2 shadow-xl backdrop-blur">
      <button
        onClick={() => setLang(lang === "bg" ? "en" : "bg")}
        className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
      >
        {lang === "bg" ? "EN" : "BG"}
      </button>
      <button
        onClick={() => setView("landing")}
        className={`rounded-xl px-4 py-2 text-sm font-medium ${view === "landing" ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}
      >
        🌐 {copy[lang].site}
      </button>
      <button
        onClick={() => setView("admin")}
        className={`rounded-xl px-4 py-2 text-sm font-medium ${view === "admin" ? "bg-violet-600 text-white shadow" : "text-slate-600"}`}
      >
        ⚙️ {copy[lang].admin}
      </button>
    </div>
  );
}

function LogoHeader() {
  return (
    <div className="flex items-center gap-3">
      <img src={logoImage} alt="Restone logo" className="h-12 w-auto rounded-xl object-contain" />
    </div>
  );
}

function AppBadges() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <div className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg">
        <div className="text-[10px] uppercase tracking-wide text-white/60">Download on the</div>
        <div className="text-sm font-semibold">App Store</div>
      </div>
      <div className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg">
        <div className="text-[10px] uppercase tracking-wide text-white/60">Get it on</div>
        <div className="text-sm font-semibold">Google Play</div>
      </div>
    </div>
  );
}

function HeroPhone() {
  return (
    <div className="relative mx-auto max-w-[360px]">
      <div className="rounded-[2.6rem] border border-violet-100/80 bg-white/70 p-3 shadow-[0_30px_80px_rgba(109,40,217,0.18)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#0d0d11]">
          <img src={phoneImage} alt="Restaurant app preview" className="h-[620px] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function Landing({ lang }) {
  const c = copy[lang];
  const [activeProduct, setActiveProduct] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const currentProduct = landingData.products[activeProduct];
  const testimonials = useMemo(
    () => [
      {
        quote: lang === "bg" ? "Поръчките вече идват директно през нашия сайт и задържаме повече от всяка продажба." : "Orders now come directly through our website and we keep more from every sale.",
        name: lang === "bg" ? "Собственик на пицария" : "Pizzeria owner",
      },
      {
        quote: lang === "bg" ? "Когато сайтът и приложението са брандирани правилно, клиентите се връщат много по-често." : "When the website and app are branded properly, customers come back much more often.",
        name: "Restaurant group",
      },
      {
        quote: lang === "bg" ? "Най-голямата разлика е контролът върху клиента и липсата на комисионни." : "The biggest difference is customer ownership and the absence of commissions.",
        name: lang === "bg" ? "Burger concept" : "Burger concept",
      },
    ],
    [lang]
  );

  return (
    <div className="bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <LogoHeader />
          <nav className="hidden items-center gap-8 text-sm text-slate-600 lg:flex">
            <a href="#features" className="hover:text-violet-600">{c.navFeatures}</a>
            <a href="#products" className="hover:text-violet-600">{c.navProducts}</a>
            <a href="#pricing" className="hover:text-violet-600">{c.navPricing}</a>
            <a href="#faq" className="hover:text-violet-600">{c.navFaq}</a>
            <a href="#contact" className="hover:text-violet-600">{c.navContact}</a>
          </nav>
          <Button onClick={scrollToContact} className="rounded-2xl bg-violet-600 text-white hover:bg-violet-500">
            {c.cta}
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm text-violet-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            {c.heroBadge}
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {c.heroTitle1}
            <span className="block bg-gradient-to-r from-violet-700 via-fuchsia-600 to-orange-400 bg-clip-text text-transparent">
              {c.heroTitle2}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{c.heroText}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {landingData.highlights.map((item) => (
              <div key={item.en} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                <span className="text-sm text-slate-700">{t(lang, item)}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button onClick={scrollToContact} className="rounded-2xl bg-violet-600 px-6 py-6 text-base text-white hover:bg-violet-500">
              {c.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-2xl border-violet-200 bg-white px-6 py-6 text-base text-violet-700 hover:bg-violet-50">
              {c.ctaSecondary}
            </Button>
          </div>

          <AppBadges />
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-24 hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl md:block">
            <div className="text-xs uppercase tracking-wide text-slate-400">0% fee</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {lang === "bg" ? "Директни поръчки без комисионни" : "Direct orders without commissions"}
            </div>
          </div>
          <div className="absolute -right-10 top-24 hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-pink-50 px-4 py-3 shadow-xl md:block">
            <div className="text-xs uppercase tracking-wide text-slate-400">Apps</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">App Store + Google Play</div>
          </div>
          <HeroPhone />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              src: logoImage,
              title: lang === "bg" ? "Твоят бранд на преден план" : "Your brand front and center",
            },
            {
              src: phoneImage,
              title: lang === "bg" ? "Истинско приложение за ресторанта" : "A real app for your restaurant",
            },
            {
              src: phoneImage,
              title: lang === "bg" ? "Визия, създадена за поръчки" : "A look built for ordering",
            },
          ].map((image, index) => (
            <div key={index} className="group overflow-hidden rounded-[1.75rem] border border-violet-100 bg-white shadow-sm">
              <div className="relative h-80 overflow-hidden">
                <img src={image.src} alt={image.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-2xl border border-white/30 bg-black/40 px-4 py-3 text-sm font-medium text-white backdrop-blur-md">
                    {image.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">{c.quickBadge}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">{c.quickTitle}</h2>
        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
          {landingData.quickBullets.map((item) => (
            <div key={item.en} className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-violet-600" />
              <p>{t(lang, item)}</p>
            </div>
          ))}
        </div>
        <Button onClick={scrollToContact} className="mt-8 rounded-2xl bg-violet-600 px-8 py-6 text-white hover:bg-violet-500">
          {c.startFree}
        </Button>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">{c.navFeatures}</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {lang === "bg" ? "Всичко, което ресторантът ти трябва, за да продава по-добре онлайн" : "Everything your restaurant needs to sell better online"}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {landingData.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title.en} className="rounded-[1.75rem] border-violet-100 bg-white/95 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-pink-100">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{t(lang, feature.title)}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{t(lang, feature.text)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">{c.navProducts}</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {lang === "bg" ? "Всичко в една платформа" : "Everything in one platform"}
            </h2>
            <div className="mt-6 space-y-2">
              {landingData.products.map((tab, i) => (
                <button
                  key={tab.label.en}
                  type="button"
                  onClick={() => setActiveProduct(i)}
                  className={`w-full rounded-xl px-4 py-3 text-left transition ${activeProduct === i ? "bg-violet-600 text-white shadow-sm" : "bg-white text-slate-700 hover:bg-violet-50"}`}
                >
                  {t(lang, tab.label)}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-violet-100 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold">{t(lang, currentProduct.title)}</h3>
            <p className="mt-4 text-slate-600">{t(lang, currentProduct.text)}</p>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 p-5">
              <div className="mx-auto max-w-[220px]">
                <HeroPhone />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {currentProduct.bullets.map((bullet) => (
                <div key={bullet.en} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-violet-600" />
                  <span>{t(lang, bullet)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="rounded-[1.75rem] border-violet-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <Star className="h-5 w-5 text-orange-400" />
                <p className="mt-4 text-lg leading-8 text-slate-700">“{item.quote}”</p>
                <div className="mt-4 text-sm text-slate-500">{item.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">{c.navPricing}</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{c.pricingTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">{c.pricingText}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {landingData.pricing.map((plan) => (
            <Card key={plan.name} className={`rounded-[2rem] border shadow-sm ${plan.featured ? "border-violet-300 bg-gradient-to-b from-violet-50 to-white shadow-violet-100" : "border-violet-100 bg-white"}`}>
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold">{plan.name}</div>
                    <div className="mt-3 text-4xl font-semibold tracking-tight text-violet-700">{plan.price}</div>
                  </div>
                  {plan.featured ? <div className="rounded-full bg-violet-600 px-3 py-1 text-xs font-medium text-white">{c.mostPopular}</div> : null}
                </div>
                <div className="mt-5 rounded-2xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700">{t(lang, plan.orders)}</div>
                <div className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <div key={item.en} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                      <span>{t(lang, item)}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={scrollToContact} className="mt-8 w-full rounded-2xl bg-violet-600 py-6 text-white hover:bg-violet-500">
                  {lang === "bg" ? "Избери план" : "Choose plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">FAQ</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{c.faqTitle}</h2>
          </div>
          <div className="space-y-4">
            {landingData.faqs.map((item, index) => {
              const open = index === openFaq;
              return (
                <div key={item.q.en} className="rounded-[1.5rem] border border-violet-100 bg-white shadow-sm">
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-base font-semibold text-slate-900">{t(lang, item.q)}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-violet-600 transition ${open ? "rotate-180" : "rotate-0"}`} />
                  </button>
                  {open ? <div className="px-6 pb-6 text-sm leading-7 text-slate-600">{t(lang, item.a)}</div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <div className="rounded-[2rem] border border-violet-100 bg-white p-8 shadow-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">{c.navContact}</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{c.contactTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{c.contactText}</p>
            </div>
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm({ lang }) {
  const c = copy[lang];
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 p-6">
      <div className="text-xl font-semibold">{lang === "bg" ? "Заяви безплатна консултация" : "Request a free consultation"}</div>
      <div className="mt-6 space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder={lang === "bg" ? "Име на ресторант" : "Restaurant name"} className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder={lang === "bg" ? "Телефон" : "Phone"} className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder={lang === "bg" ? "Съобщение" : "Message"} rows={4} className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400" />
      </div>
      <Button type="submit" className="mt-5 w-full rounded-2xl bg-violet-600 py-6 text-white hover:bg-violet-500">
        {status === "loading" ? (lang === "bg" ? "Изпращане..." : "Sending...") : c.submit}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <div className="mt-4 text-sm">
        {status === "success" ? <span className="text-green-600">{lang === "bg" ? "Запитването е изпратено успешно." : "Your inquiry has been sent successfully."}</span> : null}
        {status === "error" ? <span className="text-red-600">{lang === "bg" ? "Моля, попълни име и имейл." : "Please enter a name and email."}</span> : null}
      </div>
    </form>
  );
}

function SideNav() {
  const items = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Lead-ове", icon: Mail, active: false },
    { label: "Клиенти", icon: Building2, active: false },
    { label: "Планове", icon: CreditCard, active: false },
    { label: "Продукти", icon: ShoppingBag, active: false },
    { label: "Менюта / Apps", icon: MenuSquare, active: false },
    { label: "Известия", icon: Bell, active: false },
    { label: "Настройки", icon: Settings, active: false },
  ];

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white xl:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 font-bold text-white shadow-md">
              R
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-900">RestOne.bg</div>
              <div className="text-xs text-slate-500">Admin dashboard</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} type="button" className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${item.active ? "bg-violet-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <button type="button" className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <LogOut className="h-4 w-4" />
            <span>Изход</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function Admin() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">Управление на lead-ове, клиенти, плащания и onboarding.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Търси ресторант, имейл, телефон..." className="w-full rounded-2xl border-slate-200 pl-9 sm:w-80" />
                </div>
                <Button variant="outline" className="rounded-2xl border-slate-200">
                  <Filter className="mr-2 h-4 w-4" />
                  Филтри
                </Button>
                <Button className="rounded-2xl bg-violet-600 text-white hover:bg-violet-500">Нов клиент</Button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {adminStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm text-slate-500">{stat.title}</div>
                          <div className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</div>
                          <div className="mt-2 text-sm text-slate-500">{stat.note}</div>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <Card className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Lead pipeline</CardTitle>
                      <p className="mt-1 text-sm text-slate-500">Най-новите запитвания от сайта и pricing секцията.</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-slate-200">Виж всички</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ресторант</TableHead>
                        <TableHead>Контакт</TableHead>
                        <TableHead>План</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.email}>
                          <TableCell>
                            <div className="font-medium text-slate-900">{lead.restaurant}</div>
                            <div className="mt-1 text-xs text-slate-500">{lead.source}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium text-slate-800">{lead.owner}</div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500"><Mail className="h-3.5 w-3.5" /><span>{lead.email}</span></div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500"><Phone className="h-3.5 w-3.5" /><span>{lead.phone}</span></div>
                          </TableCell>
                          <TableCell><Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700">{lead.plan}</Badge></TableCell>
                          <TableCell><StatusBadge status={lead.status} /></TableCell>
                          <TableCell className="text-sm text-slate-500">{lead.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                  <CardHeader><CardTitle className="text-xl">Следващи действия</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Burger House Plovdiv", note: "Насрочи demo call", icon: Clock3 },
                      { title: "Pizza Roma", note: "Изпрати оферта и договор", icon: CheckCircle2 },
                      { title: "Green Bowl Sofia", note: "Потвърди billing setup", icon: CreditCard },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm"><Icon className="h-4 w-4" /></div>
                          <div>
                            <div className="font-medium text-slate-900">{item.title}</div>
                            <div className="mt-1 text-sm text-slate-500">{item.note}</div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="rounded-[1.75rem] border-slate-200 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-white/80">Billing & subscriptions</div>
                    <div className="mt-3 text-3xl font-semibold">Stripe-ready</div>
                    <p className="mt-3 text-sm leading-6 text-white/85">Следващата стъпка е да вържем абонаменти, checkout, фактуриране и customer portal.</p>
                    <Button className="mt-5 rounded-2xl bg-white text-violet-700 hover:bg-white/90">Настрой плащания</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="clients" className="w-full">
                <TabsList className="rounded-2xl bg-white p-1 shadow-sm">
                  <TabsTrigger value="clients" className="rounded-xl">Клиенти</TabsTrigger>
                  <TabsTrigger value="billing" className="rounded-xl">Плащания</TabsTrigger>
                  <TabsTrigger value="onboarding" className="rounded-xl">Onboarding</TabsTrigger>
                </TabsList>
                <TabsContent value="clients" className="mt-4">
                  <Card className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                    <CardHeader><CardTitle className="text-xl">Активни клиенти</CardTitle></CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ресторант</TableHead>
                            <TableHead>План</TableHead>
                            <TableHead>Месечна такса</TableHead>
                            <TableHead>Billing</TableHead>
                            <TableHead>Onboarding</TableHead>
                            <TableHead>App</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clients.map((client) => (
                            <TableRow key={client.name}>
                              <TableCell className="font-medium text-slate-900">{client.name}</TableCell>
                              <TableCell>{client.plan}</TableCell>
                              <TableCell>{client.monthly}</TableCell>
                              <TableCell><StatusBadge status={client.billing} /></TableCell>
                              <TableCell><StatusBadge status={client.onboarding} /></TableCell>
                              <TableCell>{client.app}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="billing" className="mt-4">
                  <Card className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-sm text-slate-500">Платени абонаменти</div><div className="mt-2 text-2xl font-semibold">14</div></div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-sm text-slate-500">Чакащи плащания</div><div className="mt-2 text-2xl font-semibold">4</div></div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-sm text-slate-500">MRR</div><div className="mt-2 text-2xl font-semibold">€1,842</div></div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="onboarding" className="mt-4">
                  <Card className="rounded-[1.75rem] border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          { title: "Сайт", desc: "Качване на меню, категории и checkout.", icon: LayoutDashboard },
                          { title: "App", desc: "Подготовка за App Store и Google Play.", icon: Smartphone },
                          { title: "Обучение", desc: "Настройка и обучение за екипа на ресторанта.", icon: UserRound },
                        ].map((step) => {
                          const Icon = step.icon;
                          return (
                            <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm"><Icon className="h-5 w-5" /></div>
                              <div className="mt-4 text-lg font-semibold">{step.title}</div>
                              <div className="mt-2 text-sm leading-6 text-slate-500">{step.desc}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function RestoneApp() {
  const [view, setView] = useState("landing");
  const [lang, setLang] = useState("bg");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <FloatingToggle view={view} setView={setView} lang={lang} setLang={setLang} />
      {view === "landing" ? <Landing lang={lang} /> : <Admin />}
    </div>
  );
}
