'use client'
import Image from "next/image";

export default function ImagesFromUrl({ urls }: { urls: string[] }) {
    return <>{
        urls.map((url)=>(
            <Image src={url} alt={""} width={100} height={100}/>
        ))

    }</>
}