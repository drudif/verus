import { NextResponse, type NextRequest } from "next/server";

const DESKTOP = "/verus-google-event";
const MOBILE = "/verus-google-event/m";

// celulares (não tablets) — iPad/Android-tablet caem no desktop de propósito
const MOBILE_UA =
  /iPhone|iPod|Android.+Mobile|Windows Phone|BlackBerry|Opera Mini|Mobi/i;

export function middleware(req: NextRequest) {
  // escape para preview/teste: qualquer URL com ?force=1 não é redirecionada
  if (req.nextUrl.searchParams.get("force") === "1") {
    return NextResponse.next();
  }

  const isMobile = MOBILE_UA.test(req.headers.get("user-agent") || "");
  const { pathname } = req.nextUrl;

  let target: string | null = null;
  if (pathname === "/") {
    target = isMobile ? MOBILE : DESKTOP;
  } else if (pathname === DESKTOP && isMobile) {
    target = MOBILE;
  } else if (pathname === MOBILE && !isMobile) {
    target = DESKTOP;
  }

  if (target && target !== pathname) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    // preserva query (UTMs etc.)
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/verus-google-event", "/verus-google-event/m"],
};
