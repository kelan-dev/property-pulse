import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // On successful sign-in
    async signIn({ profile }) {
      // Connect to database
      await connectDB();

      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // If not, add user to database
      if (!userExists) {
        // Truncate if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      // Return true to allow sign-in
      return true;
    },
    // Modifies session object
    async session({ session }) {
      // Get user from database
      const user = await User.findOne({ email: session.user.email });

      // Assign user ID to session
      session.user.id = user._id.toString();

      // Return session
      return session;
    },
  },
};
