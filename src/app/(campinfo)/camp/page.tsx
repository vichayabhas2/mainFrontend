"use client";

//import CardPanel from "@/components/CardPanel";

import HospitalCatalog from "@/components/HospitalCatalog";

import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getCamps from "@/libs/camp/getCamps";
import getCampName from "@/libs/camp/getCampName";
import { useRouter } from "next/navigation";

export default function Hospital() {
  const camps = getCamps();
  const names = getCampName(camps);
  const router = useRouter();
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
          onRating={(link: string) => {
            router.push(link);
          }}
        />
      </Suspense>
    </main>
  );
}

/*

<CardPanel/>





*/
