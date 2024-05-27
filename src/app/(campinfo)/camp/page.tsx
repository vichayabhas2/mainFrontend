//import CardPanel from "@/components/CardPanel";

import HospitalCatalog from "@/components/HospitalCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getCamps from "@/libs/camp/getCamps";
import getCampName from "@/libs/camp/getCampName";
export default async function Hospital() {
  const camps = await getCamps();
  const names = await getCampName(camps);
  //console.log(camps)
  console.log(names)
  return (
    <main className="text-center p-5">
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <HospitalCatalog
          hospitalsJson={camps}
          mapName={names}
          
        />
      </Suspense>
    </main>
  );
}
/*
<CardPanel/>
*/
