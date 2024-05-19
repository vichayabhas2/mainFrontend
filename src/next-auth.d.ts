/*import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            password: string,
            role: 'pee' | 'nong' | 'admin' | 'peto',
            filterIds: string[],
            tel: string
            token: string
        }
    }
}*/



import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: 'pee' | 'nong' | 'admin' | 'peto',
            token: string
        }
    }
}