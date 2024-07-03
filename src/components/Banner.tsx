'use client'



import { useSession } from 'next-auth/react'
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FinishButton from './FinishButton'
import { sendNotification } from './setup'
//import
export default function Banner(){
    const router=useRouter()
    const [index , setIndex]=useState(0)
    const cover = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    const {data :session} = useSession()
    console.log(session?.user.token)
    return(
        /*
        */
        <div className={styles.banner} onClick={()=>{setIndex(index+0)}}>
            <Image src={cover[index%4]} alt='cover' fill={true}
            priority 
            style={{objectFit:'cover'}}
            />
            
            <div className={styles.bannerText}>
                
                
            </div>
            
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
                    Welcome {session.user?.name}</div>: null
            }
            <button onClick={(e)=>{e.stopPropagation();   router.push('/camp')}}

       className='bg-white text-cyan-600 border border-cyan-600
      font-semibold py-2 px-2 rounded z-30 absolute bottom-0 right-10
      hover:bg-cyan-600 hover:text-white hover:border-tranparent'>Select Camp</button>
        </div>
    )
}


/*

onClick={
        }


*/