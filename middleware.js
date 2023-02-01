import { NextResponse } from "next/server";

export default async function middleware(req) {
  const url = req.url;

  const formCookie = req?.cookies?.get("form_key");
  const colorCookie = req?.cookies?.get("color_key");
  const imageCookie = req?.cookies?.get("image_key");
  const userCookie = req.cookies.get("user_hometech");

  if (url.includes("/login")) {
    if (userCookie) {
      return NextResponse.redirect(new URL("/dashboard", url));
    }
  }

  if (url.includes("/colors/login")) {
    if (userCookie) {
      return NextResponse.redirect(new URL("/dashboard", url));
    } else if (
      formCookie === undefined &&
      colorCookie === undefined &&
      imageCookie === undefined
    ) {
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  if (url.includes("/images/login")) {
    if (userCookie) {
      return NextResponse.redirect(new URL("/dashboard", url));
    } else if (colorCookie === undefined && imageCookie === undefined) {
      return NextResponse.redirect(new URL("/colors/login", url));
    }
  }

  if (url.includes("image-pattern/login")) {
    if (userCookie) {
      return NextResponse.redirect(new URL("/dashboard", url));
    } else if (imageCookie === undefined) {
      return NextResponse.redirect(new URL("/images/login", url));
    }
  }

  if (url.includes("/dashboard")) {
    if (userCookie === undefined) {
      return NextResponse.redirect(new URL("/login", url));
    }
  }
}
