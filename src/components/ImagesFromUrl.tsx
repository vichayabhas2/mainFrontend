import Image from "next/image";

export default function ImagesFromUrl({ urls }: { urls: string[] }) {
    return <>{
        urls.map((url)=>(
            <Image src={url} alt={""} />
        ))

    }</>
}