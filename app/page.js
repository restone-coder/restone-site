"use client";

import React, { useMemo, useState } from "react";

/* ================= BUTTON ================= */
function Button({ children, href, variant = "primary", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition";

  const styles =
    variant === "secondary"
      ? "border border-[#E9D8F7] bg-white text-[#5F5573] hover:bg-[#F9F2FF]"
      : "bg-[#BF00FF] text-white hover:bg-[#A000D6]";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

/* ================= SECTION TITLE ================= */
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-xl">
      <div className="text-sm font-semibold uppercase tracking-widest text-[#BF00FF]">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold text-[#1F1230]">{title}</h2>
      <p className="mt-4 text-[#5F5573]">{text}</p>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Page() {
  return (
    <div className="bg-white text-[#1F1230]">

      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#F4E7FF]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <img src="/logo.png" className="h-10" />

          <nav className="hidden lg:flex gap-8 text-sm text-[#5F5573]">
            <a href="#">Функции</a>
            <a href="#">Продукти</a>
            <a href="#">Цени</a>
            <a href="#">Контакт</a>
          </nav>

          <Button href="#contact">Заяви демо</Button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F9F2FF_100%)] py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 items-center">
          
          <div>
            <img src="/logo.png" className="h-12 mb-6" />

            <h1 className="text-5xl font-extrabold leading-tight">
              Онлайн поръчки без комисионни
            </h1>

            <p className="mt-6 text-lg text-[#5F5573]">
              Собствен сайт и мобилно приложение за ресторанта ти.
            </p>

            <div className="mt-8 flex gap-4">
              <Button href="#contact">Заяви демо</Button>
              <Button href="#products" variant="secondary">
                Виж платформата
              </Button>
            </div>
          </div>

          <img src="/app.png" className="rounded-3xl shadow-xl" />
        </div>
      </section>

      {/* ================= ORDERING SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <SectionTitle
              eyebrow="Онлайн поръчки"
              title="Онлайн поръчки директно от твоя сайт"
              text="Покажи менюто си, приемай поръчки без комисионни и дай на клиентите лесен checkout."
            />

            <div className="mt-6 space-y-3 text-[#5F5573]">
              <div>✅ Без комисионни</div>
              <div>✅ Меню и категории</div>
              <div>✅ Количка и checkout</div>
              <div>✅ Mobile-first дизайн</div>
              <div>✅ Повече продажби</div>
            </div>

            <Button href="#contact" className="mt-8">
              Заяви демо
            </Button>
          </div>

          <img
            src="/ordering.png"
            className="rounded-3xl shadow-xl"
          />

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionTitle
          eyebrow="Функции"
          title="Всичко в една платформа"
          text="Сайт, приложение и поръчки."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Онлайн поръчки",
            "Мобилно приложение",
            "Маркетинг",
          ].map((item) => (
            <div className="p-6 border rounded-2xl">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-[#F9F2FF] p-8 rounded-3xl">
          <h2 className="text-2xl font-bold">Свържи се с нас</h2>

          <input placeholder="Име" className="w-full mt-4 p-3 rounded-xl" />
          <input placeholder="Имейл" className="w-full mt-4 p-3 rounded-xl" />

          <Button href="#" className="mt-6 w-full">
            Изпрати
          </Button>
        </div>
      </section>

    </div>
  );
}