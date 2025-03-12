import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Amazon Seller Central provider configuration would be added here

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: 'amazon-seller-central',
      name: 'Amazon Seller Central',
      type: 'oauth',
      version: '2.0',
      scope: 'selling_partner_api::migration',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://api.amazon.com/auth/o2/token',
      authorizationUrl: 'https://sellercentral.amazon.com/apps/authorize/consent',
      clientId: process.env.AMAZON_CLIENT_ID,
      clientSecret: process.env.AMAZON_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.user_id,
          name: profile.seller_name,
          email: profile.email
        }
      }
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
})