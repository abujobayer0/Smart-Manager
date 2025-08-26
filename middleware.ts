import auth from "next-auth/middleware";

export const middleware = auth;

export const config = {
  matcher: [
    // Protect everything except Next.js internals, public assets, and NextAuth routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo|public|sign-in).*)",
  ],
};
