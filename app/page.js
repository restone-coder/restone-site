"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Globe,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

export default function RestoneApp() {
  const [view, setView] = useState("landing");

  if (view === "admin") {
    return (
      <div className="p-10">
        <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
        <p className="mb-6">Тук ще виждаш запитвания и клиенти (предстои).</p>
        <Button onClick={() => setView("landing")}>Назад към сайта</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-violet-700">restone.bg</h1>
        <Button onClick={() => setView("admin")}>Admin</Button>
      </header>

      <section className="px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Собствено приложение и уебсайт за твоето заведение
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Приемай директни поръчки без комисионни и увеличи печалбата си.
        </p>

        <div className="flex justify-center gap-4">
          <Button>Заяви демо</Button>
          <Button>Свържи се с нас</Button>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-[560px] w-[280px] rounded-[40px] bg-black p-2 shadow-xl">
            <div className="flex h-full w-full items-center justify-center rounded-[32px] bg-white text-gray-400">
              App Preview
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-4">
        <Card>
          <Smartphone className="mb-4 text-violet-600" />
          <h3 className="font-bold">Мобилно приложение</h3>
          <p className="text-sm text-gray-600">Собствен app за твоите клиенти</p>
        </Card>

        <Card>
          <Globe className="mb-4 text-violet-600" />
          <h3 className="font-bold">Уебсайт</h3>
          <p className="text-sm text-gray-600">Онлайн поръчки без комисионни</p>
        </Card>

        <Card>
          <ShoppingCart className="mb-4 text-violet-600" />
          <h3 className="font-bold">Поръчки</h3>
          <p className="text-sm text-gray-600">Управление на всички поръчки</p>
        </Card>

        <Card>
          <BarChart3 className="mb-4 text-violet-600" />
          <h3 className="font-bold">Анализи</h3>
          <p className="text-sm text-gray-600">Следи продажбите си</p>
        </Card>
      </section>

      <section className="bg-white px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Цени</h2>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          <Card>
            <h3 className="mb-2 text-xl font-bold">Basic</h3>
            <p className="mb-4 text-2xl font-bold">€29 / месец</p>
            <Button>Избери</Button>
          </Card>

          <Card>
            <h3 className="mb-2 text-xl font-bold">Pro</h3>
            <p className="mb-4 text-2xl font-bold">€59 / месец</p>
            <Button>Избери</Button>
          </Card>

          <Card>
            <h3 className="mb-2 text-xl font-bold">Enterprise</h3>
            <p className="mb-4 text-2xl font-bold">По запитване</p>
            <Button>Контакт</Button>
          </Card>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Свържи се с нас</h2>
        <p className="mb-6 text-gray-600">
          Ще ти помогнем да стартираш още днес
        </p>
        <Button>Изпрати запитване</Button>
      </section>

      <footer className="py-10 text-center text-gray-500">
        © 2026 restone.bg
      </footer>
    </div>
  );
}