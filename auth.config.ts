import Credentials from "next-auth/providers/credentials";

const config = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = process.env.AUTH_USERNAME || "admin";
        const password = process.env.AUTH_PASSWORD || "admin";

        if (
          credentials?.username === username &&
          credentials?.password === password
        ) {
          return { id: "user-1", name: username } as any;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/sign-in",
  },
};

export default config;
