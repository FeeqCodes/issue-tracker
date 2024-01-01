import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth";



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };


/**Format prisma
 * - prisma format
 * Create prisma migrations
 * -npx prisma migrate dev
 */