"use client";

import React, { useState } from "react";

export default function RestoneApp() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <main className="bg-white text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logo.png" className="h-10" />

          <div className="flex items-center gap-8 text-sm font-medium">
            <div
              onMouseEnter={() => setOpenMenu(true)}
              onMouseLeave={() => setOpenMenu(false)}
              className="relative cursor-pointer"
            >
              Продукти

              {openMenu && (
                <div className="absolute top-6 left-0 w-[600px] bg-white shadow-xl rounded-2xl p-6 grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Онлайн</h4>
                    <p className="text-sm text-gray-600">
                      Уебсайт за поръчки
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Мобилно</h4>
                    <p className="text-sm text-gray-600">
                      iOS & Android приложение
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Управление</h4>
                    <p className="text-sm text-gray-600">
                      Админ панел
                    </p>
                  </div>
                </div>
              )}
            </div>

            <a href="#pricing">Цени</a>
            <a href="#contact">Контакт</a>

            <button className="bg-[#bf00ff] text-white px-4 py-2 rounded-xl">
              Заяви демо
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-40" />

        <h1 className="text-5xl font-bold relative">
          Собствено приложение и уебсайт
          <br />
          за твоето заведение
        </h1>

        <p className="mt-6 text-lg text-gray-600 relative">
          Поръчки без комисионни. Пълен контрол.
        </p>

        <div className="mt-8 flex justify-center gap-4 relative">
          <button className="bg-[#bf00ff] text-white px-6 py-3 rounded-xl shadow-lg">
            Заяви демо
          </button>

          <button className="border px-6 py-3 rounded-xl">
            Виж как работи
          </button>
        </div>

        {/* PHONE */}
        <div className="mt-16 flex justify-center relative">
          <div className="w-[300px] rounded-[30px] border p-3 shadow-2xl">
            <img src="/icon.png" className="rounded-[20px]" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-2">
            Без комисионни
          </h3>
          <p className="text-gray-600">
            Всички поръчки са директно към теб
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-2">
            Собствен бранд
          </h3>
          <p className="text-gray-600">
            Твоето приложение и сайт
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-2">
            Пълен контрол
          </h3>
          <p className="text-gray-600">
            Управлявай меню и поръчки
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-gray-50 px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Нашите продукти
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-bold">Уебсайт</h3>
            <p className="text-sm text-gray-600 mt-2">
              Онлайн поръчки директно от клиенти
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-bold">Мобилно приложение</h3>
            <p className="text-sm text-gray-600 mt-2">
              Android и iOS приложение
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-bold">Админ панел</h3>
            <p className="text-sm text-gray-600 mt-2">
              Управление на всичко
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Цени
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="border p-6 rounded-2xl">
            <h3 className="font-bold">Starter</h3>
            <p className="text-2xl mt-4">29€</p>
          </div>

          <div className="border p-6 rounded-2xl bg-[#f7e6ff]">
            <h3 className="font-bold">Pro</h3>
            <p className="text-2xl mt-4">59€</p>
          </div>

          <div className="border p-6 rounded-2xl">
            <h3 className="font-bold">Enterprise</h3>
            <p className="mt-4">По запитване</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-gray-50 px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Свържи се с нас
        </h2>

        <form className="max-w-xl mx-auto mt-10 flex flex-col gap-4">
          <input placeholder="Име" className="border p-3 rounded" />
          <input placeholder="Имейл" className="border p-3 rounded" />
          <textarea
            placeholder="Съобщение"
            className="border p-3 rounded"
          />

          <button className="bg-[#bf00ff] text-white p-3 rounded-xl">
            Изпрати
          </button>
        </form>
      </section>