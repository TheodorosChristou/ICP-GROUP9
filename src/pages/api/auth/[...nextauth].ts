import NextAuth, { Session } from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import GithubProvider, {GithubProfile} from "next-auth/providers/github"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import clientPromise from "../../../../lib/mongodb"
import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID  as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),

  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({session, user}: {session: Session; user: AdapterUser}) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
}
export default NextAuth(authOptions)