// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//     //   clientId: process.env.GITHUB_ID,
//       clientId: "Ov23li7XsvjqPe9M3VQ6",
//     //   clientSecret: process.env.GITHUB_SECRET,
//       clientSecret: "f84f770db086b8e4523899ff6e9a0cada3f84689",
//     }),
//     // ...add more providers here
//   ],
// }

// export const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST}
// // export default NextAuth(authOptions)


// import NextAuth, { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// interface User {
//   pk: number;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
// }

// interface AuthResponse {
//   access: string;
//   refresh: string;
//   user: User;
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials.password) return null;

//         const res = await fetch("https://api.komornikantal.hu/auth/login/", {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" }
//         })
//         const data: AuthResponse = await res.json()

//         if (res.ok && data) {
//           return {
//             id: data.user.pk.toString(),
//             ...data.user,
//             accessToken: data.access,
//             refreshToken: data.refresh
//           }
//         }
//         return null
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.accessToken
//         token.refreshToken = user.refreshToken
//         token.user = user
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken as string
//       session.refreshToken = token.refreshToken as string
//       session.user = token.user as User
//       return session
//     }
//   },
//   pages: {
//     signIn: '/auth/signin',
//   }
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        password2: { label: "Confirm Password", type: "password" },
        isRegister: { label: "Is Register", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { username, email, password, password2, isRegister } = credentials;

        let url = "https://api.komornikantal.hu/auth/login/";
        let body = { username, password };

        if (isRegister === "true") {
          url = "https://api.komornikantal.hu/auth/registration/";
          body = { username, email, password1: password, password2 };
        }

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.ok && data) {
          return {
            id: data.user.pk.toString(),
            ...data.user,
            accessToken: data.access,
            refreshToken: data.refresh
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.user = token.user as User
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
  // ... többi konfiguráció marad ugyanaz
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }