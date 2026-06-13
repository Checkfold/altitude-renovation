"use client";

import { useState } from "react";
import type { RequestFormBlock } from "@/types/strapi";

type RequestFormProps = {
  config?: RequestFormBlock;
};

type SubmitState = "idle" | "submitting" | "success" | "error";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{10,20}$/;

export default function RequestForm({ config }: RequestFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const title = config?.title?.trim() || "Оставить заявку";
  const subtitle =
    config?.subtitle?.trim() || "Заполните форму, и мы свяжемся с вами.";
  const emailLabel = config?.emailLabel?.trim() || "Email";
  const phoneLabel = config?.phoneLabel?.trim() || "Телефон";
  const cityLabel = config?.cityLabel?.trim() || "Город";
  const submitText = config?.submitText?.trim() || "Отправить заявку";
  const successMessage =
    config?.successMessage?.trim() || "Спасибо! Заявка отправлена.";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim();
    const normalizedCity = city.trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setState("error");
      setErrorMessage("Введите корректный email в формате name@example.com.");
      return;
    }

    if (!PHONE_REGEX.test(normalizedPhone)) {
      setState("error");
      setErrorMessage(
        "Введите корректный телефон (минимум 10 цифр, можно +, пробелы, скобки и дефисы).",
      );
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          phone: normalizedPhone,
          city: normalizedCity,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setState("error");
        setErrorMessage(payload?.error || "Не удалось отправить заявку.");
        return;
      }

      setState("success");
      setEmail("");
      setPhone("");
      setCity("");
    } catch {
      setState("error");
      setErrorMessage("Сервер недоступен. Попробуйте позже.");
    }
  }

  return (
    <section className="requestSection">
      <div className="container requestContainer">
        <h1 className="requestTitle">{title}</h1>
        <p className="requestSubtitle">{subtitle}</p>

        <form className="requestForm" onSubmit={onSubmit}>
          <label className="requestLabel">
            {emailLabel}
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="requestInput"
              placeholder="name@example.com"
            />
          </label>

          <label className="requestLabel">
            {phoneLabel}
            <input
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="requestInput"
              placeholder="+7 (900) 000-00-00"
            />
          </label>

          <label className="requestLabel">
            {cityLabel}
            <input
              type="text"
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="requestInput"
              placeholder="Москва"
            />
          </label>

          <button type="submit" disabled={state === "submitting"} className="requestSubmit">
            {state === "submitting" ? "Отправка..." : submitText}
          </button>

          {state === "success" && <p className="requestSuccess">{successMessage}</p>}
          {state === "error" && <p className="requestError">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
}
