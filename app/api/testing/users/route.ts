import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/actions/users";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  try {
    const body = await req.json();
    const dataForAction = {
      ...body,
      passwordConfirm: body.password,
    };
    const result = await createUser(dataForAction);
    if (result?.errors) {
      return NextResponse.json(
        { error: "Błąd walidacji", details: result.errors },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: "Zapisano" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie" },
      { status: 400 },
    );
  }
};
