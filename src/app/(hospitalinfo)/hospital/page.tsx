



//import CardPanel from "@/components/CardPanel";

import HospitalCatalog from "@/components/HospitalCatalog";
import getHospitals from "@/libs/camp/getCamps";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";



export default async  function Hospital(){


    const hospitals =await  getHospitals()



    return(
    <main className="text-center p-5">
        <Suspense fallback={<p>Loading ... <LinearProgress/></p>}><></>


        </Suspense>
        

        
    </main>
    )
}


/*

<CardPanel/>





*/