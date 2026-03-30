"use client";

import React, { useMemo, useState } from "react";

function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition duration-200";
  const styles =
    variant === "secondary"
      ? "border border-[#E9D8F7] bg-white text-[#5F5573] hover:bg-[#F9F2FF]"
      : "bg-[#BF00FF] text-white shadow-lg shadow-fuchsia-200 hover:bg-[#A000D6]";

  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-[#E9D8F7] bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#BF00FF]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1F1230] sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-base leading-8 text-[#5F5573]">{text}</p>
      ) : null}
    </div>
  );
}

function ProductMegaMenu({ products }) {
  return (
    <div className="absolute left-1/2 top-full z-50 hidden w-[980px] -translate-x-1/2 pt-4 group-hover:block">
      <div className="overflow-hidden rounded-[28px] border border-[#E9D8F7] bg-white shadow-[0_30px_90px_rgba(31,18,48,0.12)]">
        <div className="grid grid-cols-3 gap-0">
          {products.map((group) => (
            <div
              key={group.title}
              className="border-r border-[#F4E7FF] p-6 last:border-r-0"
            >
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#BF00FF]">
                {group.title}
              </div>

              <div className="space-y-4">
                {group.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl p-3 transition hover:bg-[#F9F2FF]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F9F2FF_0%,#FFF1E3_100%)] text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1F1230]">
                          {item.title}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-[#5F5573]">
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[310px]">
      <div className="rounded-[42px] border border-[#E9D8F7] bg-[#101114] p-2 shadow-[0_30px_80px_rgba(191,0,255,0.25)]">
        <div className="relative h-[620px] overflow-hidden rounded-[34px] bg-white">
          <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,#BF00FF_0%,#D84DFF_55%,#FF9A3D_100%)]" />
          <div className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="relative z-10 px-5 pt-16">
            <div className="flex items-center gap-3 rounded-3xl bg-white/95 p-4 shadow-sm ring-1 ring-[#F4E7FF]">
              <img
                src="/icon.png"
                alt="Restone icon"
                className="h-10 w-10 rounded-2xl"
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BF00FF]">
                  Restone App
                </div>
                <div className="mt-1 text-lg font-bold text-[#1F1230]">
                  Restaurant Ordering
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F9F2FF] p-4">
                <div className="text-xs text-[#8D84A3]">Today</div>
                <div className="mt-1 text-lg font-bold text-[#1F1230]">
                  24 orders
                </div>
              </div>
              <div className="rounded-2xl bg-[#FFF1E3] p-4">
                <div className="text-xs text-[#8D84A3]">Revenue</div>
                <div className="mt-1 text-lg font-bold text-[#1F1230]">
                  €184
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { name: "Burger Menu", price: "€9.90" },
                { name: "Pizza Specials", price: "€12.50" },
                { name: "Lunch Combo", price: "€8.40" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-[#F4E7FF] bg-white p-4 shadow-sm"
                >
                  <div>
                    <div className="font-semibold text-[#1F1230]">
                      {item.name}
                    </div>
                    <div className="text-sm text-[#8D84A3]">Direct order</div>
                  </div>
                  <div className="rounded-xl bg-[#F9F2FF] px-3 py-1 text-sm font-semibold text-[#5F5573]">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#BF00FF_0%,#D84DFF_100%)] p-4 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                Promo
              </div>
              <div className="mt-1 text-lg font-bold">
                -20% on mobile orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/70 bg-white/95 px-4 py-3 text-sm font-semibold text-[#1F1230] shadow-xl backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({ emoji, title, text }) {
  return (
    <Card className="p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F9F2FF_0%,#FFF1E3_100%)] text-2xl">
        {emoji}
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#1F1230]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#5F5573]">{text}</p>
    </Card>
  );
}

function PricingCard({ name, price, subtitle, features, featured = false }) {
  return (
    <Card
      className={`p-8 ${
        featured
          ? "border-[#D9C2EE] bg-[linear-gradient(180deg,#F9F2FF_0%,#FFFFFF_100%)] shadow-fuchsia-100"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-bold text-[#1F1230]">{name}</div>
          <div className="mt-2 text-4xl font-extrabold tracking-tight text-[#BF00FF]">
            {price}
          </div>
          <div className="mt-2 text-sm text-[#8D84A3]">{subtitle}</div>
        </div>
        {featured ? (
          <div className="rounded-full bg-[#BF00FF] px-3 py-1 text-xs font-semibold text-white">
            Най-популярен
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        {features.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 text-sm text-[#5F5573]"
          >
            <span className="mt-0.5">✅</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <Button href="#contact" className="mt-8 w-full justify-center">
        Избери план
      </Button>
    </Card>
  );
}

function FaqItem({ question, answer, open, onClick }) {
  return (
    <div className="rounded-[24px] border border-[#E9D8F7] bg-white shadow-sm">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-[#1F1230]">
          {question}
        </span>
        <span
          className={`text-lg text-[#BF00FF] transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>
      {open ? (
        <div className="px-6 pb-6 text-sm leading-7 text-[#5F5573]">
          {answer}
        </div>
      ) : null}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] bg-[linear-gradient(135deg,#F9F2FF_0%,#FFF6EF_100%)] p-6 sm:p-7"
    >
      <div className="text-xl font-bold text-[#1F1230]">
        Заяви безплатна консултация
      </div>

      <div className="mt-5 space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Име на ресторант"
          className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-[#1F1230] shadow-sm outline-none placeholder:text-[#8D84A3]"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Имейл"
          className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-[#1F1230] shadow-sm outline-none placeholder:text-[#8D84A3]"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-[#1F1230] shadow-sm outline-none placeholder:text-[#8D84A3]"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="С какво можем да помогнем?"
          className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm text-[#1F1230] shadow-sm outline-none placeholder:text-[#8D84A3]"
        />
      </div>

      <Button type="submit" className="mt-5 w-full justify-center">
        {status === "loading" ? "Изпращане..." : "Изпрати запитване"}
      </Button>

      <div className="mt-4 text-sm">
        {status === "success" ? (
          <span className="text-green-600">
            Запитването е изпратено успешно.
          </span>
        ) : null}
        {status === "error" ? (
          <span className="text-red-600">
            Моля, попълни име и имейл.
          </span>
        ) : null}
      </div>
    </form>
  );
}

export default function RestonePage() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [productTab, setProductTab] = useState(0);

  const megaMenuColumns = useMemo(
    () => [
      {
        title: "Популярни",
        items: [
          {
            icon: "🛒",
            title: "Онлайн поръчки",
            text: "Директни поръчки без комисионни от твоя сайт.",
            href: "#products",
          },
          {
            icon: "📱",
            title: "Мобилно приложение",
            text: "Брандирано приложение за iOS и Android.",
            href: "#products",
          },
          {
            icon: "🌐",
            title: "Website Builder",
            text: "Сайт за ресторанта с ordering flow и checkout.",
            href: "#products",
          },
        ],
      },
      {
        title: "Управление",
        items: [
          {
            icon: "💳",
            title: "Плащания",
            text: "Фиксиран модел без комисионни върху всяка продажба.",
            href: "#pricing",
          },
          {
            icon: "📈",
            title: "Маркетинг",
            text: "Промоции, loyalty, кампании и upsell възможности.",
            href: "#features",
          },
          {
            icon: "👥",
            title: "Клиентска база",
            text: "Запази контрола върху клиентските данни и каналите.",
            href: "#features",
          },
        ],
      },
      {
        title: "Разрастване",
        items: [
          {
            icon: "🏪",
            title: "Много обекти",
            text: "Подходящо за единични ресторанти и вериги.",
            href: "#features",
          },
          {
            icon: "🚚",
            title: "Delivery & Pickup",
            text: "Гъвкави потоци за доставка и вземане на място.",
            href: "#how",
          },
          {
            icon: "⚙️",
            title: "Интеграции",
            text: "Възможност за работа с вътрешни процеси и бъдещи модули.",
            href: "#how",
          },
        ],
      },
    ],
    []
  );

  const productTabs = useMemo(
    () => [
      {
        label: "Онлайн поръчки",
        title: "Директни поръчки от твоя бранд",
        text:
          "Клиентите поръчват директно през твоя сайт и приложение, без marketplace комисионни и без посредници. Това означава по-добър марж, по-силен бранд и по-голям контрол.",
        bullets: [
          "0% комисионни към delivery apps",
          "Delivery и pickup потоци",
          "Бърз checkout и ясен ordering experience",
        ],
      },
      {
        label: "Уебсайт",
        title: "Сайт, който продава",
        text:
          "Модерен ресторантски сайт с меню, категории, промоции, checkout и mobile-first преживяване. Всичко е създадено така, че да превръща посетителите в директни поръчки.",
        bullets: [
          "Мобилен first дизайн",
          "Меню, добавки и промоции",
          "Ясни call-to-action елементи",
        ],
      },
      {
        label: "Приложение",
        title: "Собствено приложение за ресторанта",
        text:
          "Брандирано мобилно приложение за iOS и Android, създадено за повторни поръчки, по-висока лоялност и директна комуникация с клиентите.",
        bullets: [
          "iOS + Android присъствие",
          "Push комуникация и кампании",
          "По-лесни повторни поръчки",
        ],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Има ли комисионна за поръчките?",
        a: "Не. Restone е създадено за директни поръчки без marketplace комисионни върху всяка продажба.",
      },
      {
        q: "Може ли ресторантът да има собствено приложение?",
        a: "Да. Можем да структурираме решение с брандирано приложение за iOS и Android.",
      },
      {
        q: "Подходящо ли е и за единични обекти, и за вериги?",
        a: "Да. Платформата е подходяща както за единични ресторанти, така и за по-активни обекти и вериги.",
      },
      {
        q: "Колко бързо може да се стартира?",
        a: "Началният старт може да бъде много бърз, а ние помагаме с onboarding, съдържание и настройка.",
      },
    ],
    []
  );

  return (
    <div id="top" className="min-h-screen bg-white text-[#1F1230]">
      <header className="sticky top-0 z-40 border-b border-[#F4E7FF] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <img src="/logo.png" alt="Restone" className="h-10 w-auto" />

          <nav className="hidden items-center gap-8 text-sm text-[#5F5573] lg:flex">
            <a href="#features" className="hover:text-[#BF00FF]">
              Функции
            </a>

            <div className="group relative">
              <button className="flex items-center gap-2 hover:text-[#BF00FF]">
                <span>Продукти</span>
                <span>⌄</span>
              </button>
              <ProductMegaMenu products={megaMenuColumns} />
            </div>

            <a href="#how" className="hover:text-[#BF00FF]">
              Как работи
            </a>
            <a href="#pricing" className="hover:text-[#BF00FF]">
              Цени
            </a>
            <a href="#faq" className="hover:text-[#BF00FF]">
              Въпроси
            </a>
            <a href="#contact" className="hover:text-[#BF00FF]">
              Контакт
            </a>
          </nav>

          <Button href="#contact">Заяви демо</Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F9F2FF_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9D8F7] bg-white px-4 py-2 text-sm font-semibold text-[#BF00FF] shadow-sm">
              ✨ Онлайн поръчки за ресторанти без посредници
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Онлайн поръчки без комисионни
              <span className="block bg-[linear-gradient(135deg,#BF00FF_0%,#D84DFF_55%,#FF9A3D_100%)] bg-clip-text text-transparent">
                собствено приложение и уебсайт за твоето заведение
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5F5573]">
              Restone помага на ресторанти да приемат директни поръчки от
              собствен сайт и мобилно приложение, без комисионни към външни
              delivery платформи.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "0% комисионна към delivery apps",
                "Собствен бранд и директна връзка с клиента",
                "Мобилно приложение за iOS и Android",
                "Уебсайт, checkout и меню в една система",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
                >
                  <span className="mt-0.5">✅</span>
                  <span className="text-sm text-[#5F5573]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="#contact">Заяви демо →</Button>
              <Button href="#products" variant="secondary">
                Виж платформата
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg">
                <div className="text-[10px] uppercase tracking-wide text-white/60">
                  Download on the
                </div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
              <div className="rounded-2xl bg-black px-4 py-3 text-white shadow-lg">
                <div className="text-[10px] uppercase tracking-wide text-white/60">
                  Get it on
                </div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <FloatingBadge className="absolute -left-4 top-16 hidden md:block">
              🚀 Директни поръчки без комисионни
            </FloatingBadge>
            <FloatingBadge className="absolute -right-6 top-24 hidden md:block">
              📱 App Store + Google Play
            </FloatingBadge>
            <FloatingBadge className="absolute -left-10 bottom-10 hidden md:block">
              🌐 Ordering website
            </FloatingBadge>
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Онлайн поръчки"
              title="Онлайн поръчки директно от твоя сайт"
              text="Покажи менюто си, приемай поръчки без комисионни и дай на клиентите лесен checkout от телефон или компютър."
            />

            <div className="mt-6 space-y-3 text-[#5F5573]">
              <div>✅ Директни поръчки без външни комисионни</div>
              <div>✅ Меню, категории и продукти в модерен интерфейс</div>
              <div>✅ Количка и checkout в една система</div>
              <div>✅ Работи отлично на мобилни устройства</div>
              <div>✅ По-добро клиентско изживяване и повече продажби</div>
            </div>

            <Button href="#contact" className="mt-8">
              Заяви демо
            </Button>
          </div>

          <div>
            <img
              src="/ordering.png"
              alt="Онлайн поръчки за ресторант"
              className="w-full rounded-[28px] shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Мобилно приложение"
              title="Собствено мобилно приложение за ресторанта ти"
              text="Клиентите поръчват директно от твоето приложение — без посредници и без комисионни."
            />

            <div className="mt-6 space-y-3 text-[#5F5573]">
              <div>✅ Брандирано приложение за iOS и Android</div>
              <div>✅ По-бързи и лесни поръчки</div>
              <div>✅ Повече повторни поръчки от лоялни клиенти</div>
              <div>✅ Push известия и директна връзка с клиента</div>
              <div>✅ По-висока стойност на поръчките</div>
            </div>

            <Button href="#contact" className="mt-8">
              Заяви демо
            </Button>
          </div>

          <div>
            <img
              src="/app.png"
              alt="Собствено мобилно приложение за ресторант"
              className="w-full rounded-[28px] shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Твоят бранд на преден план",
            "Истинско приложение за ресторанта",
            "Визия, създадена за поръчки",
          ].map((title, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-80 bg-[linear-gradient(135deg,#F9F2FF_0%,#FFFFFF_55%,#FFF1E3_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,0,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,154,61,0.18),transparent_30%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm font-semibold text-[#1F1230] backdrop-blur">
                    {title}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" id="benefits">
        <SectionTitle
          eyebrow="Ползи"
          title="Защо ресторантът ти има нужда от собствен ordering канал"
          text="По-ниски разходи, повече директни поръчки, по-силен контрол върху продажбите и клиентската база."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <FeatureCard
            emoji="💸"
            title="По-ниски разходи"
            text="Намаляваш зависимостта от външни платформи и пазиш по-голяма част от всяка продажба."
          />
          <FeatureCard
            emoji="📦"
            title="Повече директни поръчки"
            text="Клиентите поръчват от твоя бранд, не от marketplace, където се състезаваш с всички."
          />
          <FeatureCard
            emoji="🧠"
            title="Контрол върху данните"
            text="Запазваш връзката с клиента, историята на поръчките и маркетинг възможностите."
          />
          <FeatureCard
            emoji="🕒"
            title="24/7 приемане на поръчки"
            text="Менюто и ordering flow-ът работят постоянно и правят поръчката лесна от всяко устройство."
          />
          <FeatureCard
            emoji="🎨"
            title="Брандирано преживяване"
            text="Сайтът и приложението изглеждат като твоя продукт, а не като чужда платформа."
          />
          <FeatureCard
            emoji="⚡"
            title="Бързи промени"
            text="Лесно обновяваш меню, промоции и наличности, когато имаш нужда."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionTitle
          eyebrow="Бърз старт. Нулев риск."
          title="Стартирай за минути"
          text="Помагаме ти да стартираш гладко, без излишни усложнения и без риск в началото."
        />

        <div className="mt-8 space-y-5 text-lg leading-8 text-[#5F5573]">
          {[
            "Нямаш време? Ние ще настроим всичко вместо теб — безплатна начална настройка.",
            "7 дни поддръжка чрез чат и имейл — преди и след старта.",
            "Реални хора на линия — без ботове.",
            "Лесно onboarding обучение за твоя екип.",
            "Пробен период — тествай без риск.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span className="mt-1">✅</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <Button href="#contact" className="mt-8">
          Започни сега
        </Button>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <SectionTitle
          eyebrow="Функции"
          title="Всичко, което ресторантът ти трябва, за да продава по-добре онлайн"
          text="Платформа за директни онлайн поръчки, брандиран сайт, приложение и по-добър контрол върху клиента."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <FeatureCard
            emoji="🛒"
            title="Поръчки без комисионни"
            text="Приемай директни онлайн поръчки от твоя собствен канал вместо да губиш марж в marketplace такси."
          />
          <FeatureCard
            emoji="🌐"
            title="Собствен ordering website"
            text="Професионален ресторантски сайт с меню, промоции, checkout, pickup и delivery flow."
          />
          <FeatureCard
            emoji="📱"
            title="Брандирано мобилно приложение"
            text="Собствен app за iOS и Android за повторни поръчки, loyalty и силна връзка с клиента."
          />
          <FeatureCard
            emoji="📈"
            title="Маркетинг и retention"
            text="Промо кодове, кампании, CRM и по-добър контрол върху повторните поръчки."
          />
          <FeatureCard
            emoji="💳"
            title="Плащания и фактуриране"
            text="Фиксиран модел без комисионни върху всяка продажба и добра основа за billing."
          />
          <FeatureCard
            emoji="👥"
            title="Контрол върху клиента"
            text="Запази клиентските данни, навици и каналите за комуникация във вашата система."
          />
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Продукти"
              title="Всичко в една платформа"
              text="Уебсайт, приложение и директни поръчки в един ясен продукт."
            />

            <div className="mt-6 space-y-2">
              {productTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setProductTab(i)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    productTab === i
                      ? "bg-[#BF00FF] text-white shadow-sm"
                      : "bg-white text-[#5F5573] hover:bg-[#F9F2FF]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <Card className="border-[#E9D8F7] p-8">
            <h3 className="text-2xl font-bold text-[#1F1230]">
              {productTabs[productTab].title}
            </h3>
            <p className="mt-4 text-[#5F5573]">
              {productTabs[productTab].text}
            </p>

            <div className="mt-6 rounded-[28px] bg-[linear-gradient(135deg,#F9F2FF_0%,#FFF6EF_100%)] p-5">
              <PhoneMockup />
            </div>

            <div className="mt-6 space-y-3">
              {productTabs[productTab].bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-center gap-3 text-sm text-[#5F5573]"
                >
                  <span>✅</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Как работи"
          title="Как работи директното онлайн поръчване"
          text="Ясен процес от старта до реалната печалба от директни продажби."
          center
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Стартираме ordering канала",
              text: "Добавяме online ordering към съществуващия сайт или изграждаме нов restaurant website.",
            },
            {
              step: "2",
              title: "Клиентите поръчват директно",
              text: "Поръчките идват през твоя собствен канал вместо през външни delivery apps.",
            },
            {
              step: "3",
              title: "Поръчката влиза в процес",
              text: "Екипът получава поръчката и я обработва по избрания от теб workflow.",
            },
            {
              step: "✓",
              title: "Повече печалба от всяка поръчка",
              text: "Получаваш повече директни поръчки и по-ниски разходи заради липсата на външни комисионни.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <div className="text-3xl font-extrabold text-[#BF00FF]">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1F1230]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5F5573]">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionTitle
          eyebrow="Резултати"
          title="Защо ресторантьорите избират директни поръчки"
          text="Когато сайтът, приложението и ordering flow-ът са правилно изградени, клиентите се връщат по-често, а маржът ти е по-добър."
          center
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            "Поръчките вече идват директно през нашия сайт и задържаме повече от всяка продажба.",
            "Когато сайтът и приложението са брандирани правилно, клиентите се връщат много по-често.",
            "Най-голямата разлика е контролът върху клиента и липсата на комисионни.",
          ].map((quote, index) => (
            <Card key={index} className="p-6">
              <div className="text-lg">⭐</div>
              <p className="mt-4 text-lg leading-8 text-[#5F5573]">
                “{quote}”
              </p>
              <div className="mt-4 text-sm text-[#8D84A3]">Ресторантьор</div>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Цени"
          title="Планове за ресторанти, които искат повече директни поръчки"
          text="Без комисионни. Фиксиран месечен план. По-голям контрол върху продажбите."
          center
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <PricingCard
            name="Basic"
            price="€49"
            subtitle="До 75 поръчки"
            features={[
              "Собствен ordering website",
              "Меню и checkout",
              "Поръчки без комисионни",
            ]}
          />
          <PricingCard
            name="Standard"
            price="€89"
            subtitle="До 210 поръчки"
            featured
            features={[
              "Всичко от Basic",
              "Маркетинг и loyalty",
              "По-силен direct ordering канал",
            ]}
          />
          <PricingCard
            name="Premium"
            price="€169"
            subtitle="Неограничени поръчки"
            features={[
              "Всичко от Standard",
              "Неограничен обем",
              "Подходящо за растеж и вериги",
            ]}
          />
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            eyebrow="FAQ"
            title="Често задавани въпроси"
            text="Най-важното за платформата, поръчките и пакетите."
          />

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.q}
                question={item.q}
                answer={item.a}
                open={faqOpen === index}
                onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <div className="rounded-[32px] border border-[#E9D8F7] bg-white p-8 shadow-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionTitle
              eyebrow="Контакт"
              title="Свържи се с нас"
              text="Ще ти покажем как Restone може да работи за твоето заведение и как да увеличиш директните си поръчки."
            />
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#F4E7FF] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <img src="/logo.png" alt="Restone" className="h-8 w-auto" />
            <div className="mt-1 text-sm text-[#8D84A3]">
              Commission-free ordering website + restaurant app
            </div>
          </div>
          <div className="text-sm text-[#8D84A3]">© 2026 Restone.bg</div>
        </div>
      </footer>
    </div>
  );
}