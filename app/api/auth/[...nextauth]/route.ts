import NextAuth from "next-auth"

const handler = NextAuth({
    provider: []
})

export { handler as GET, handler as POST }