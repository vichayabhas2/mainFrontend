import Link from "next/link";
import styles from './topmenu.module.css'



export default function TopMenuItem ({title, pageRef}:{title:string,pageRef:string}){
    return(
        <Link href={pageRef} className="bg-slate-300 rounded-md px-3 pt-3 m-2 shadow-md shadow-slate-800 text-center">
            {title}
        </Link>

    )

}

/*



*/