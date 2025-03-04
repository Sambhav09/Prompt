import User from "@models/User";
import NextAuth from "next-auth";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            await connectToDB();
            const existingUser = await User.findOne({ email: token.email });

            if (existingUser) {
                token._id = existingUser._id.toString(); 
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; 
                session.user._id = token._id; 
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                let user = await User.findOne({ email: profile.email });

                if (!user) {
                    user = await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error("Sign-in error:", error);
                console.log("thsi is for checkin")  
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
