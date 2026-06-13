import { NextResponse } from "next/server";

type RequestPayload = {
  email?: string;
  phone?: string;
  phoneNumber?: string;
  city?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{10,20}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestPayload;
    const email = body.email?.trim() || "";
    const phone = body.phone?.trim() || body.phoneNumber?.trim() || "";
    const city = body.city?.trim() || "";

    if (!email || !phone || !city) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Укажите корректный email в формате name@example.com." },
        { status: 400 },
      );
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        {
          error:
            "Укажите корректный телефон (минимум 10 цифр, допускаются +, пробелы, скобки и дефисы).",
        },
        { status: 400 },
      );
    }

    const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
    const strapiToken = process.env.STRAPI_FORM_TOKEN;

    if (!strapiToken) {
      return NextResponse.json(
        { error: "Не задан STRAPI_FORM_TOKEN в frontend env." },
        { status: 500 },
      );
    }

    const response = await fetch(`${strapiUrl}/api/form-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify({
        data: {
          email,
          phone,
          city,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: `Strapi error: ${errorBody || response.statusText}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Невалидный JSON." }, { status: 400 });
  }
}
