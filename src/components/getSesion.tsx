'use client'

import { useSession } from "next-auth/react"

export function getSesion(){
    const {data:session}=useSession()
    return session
}