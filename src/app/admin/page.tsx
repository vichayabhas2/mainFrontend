import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/BackToHome";
import getCamps from "@/libs/camp/getCamps";
import HospitalCatalog from "@/components/HospitalCatalog";
import { LinearProgress } from "@mui/material";

import { Suspense } from "react";
import getCampName from "@/libs/camp/getCampName";
import getCampNames from "@/libs/admin/getCampNames";

import AdminClient from "@/components/AdminClient";
import { useRouter } from "next/navigation";

export default async function adminPage() {
  //const router=useRouter()
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }

  const user = await getUserProfile(session.user.token as string);
  if (user.mode == "nong" || user.role != "admin") {
    return <BackToHome />;
  }
  const camps = getCamps();
  const names = getCampName(camps);
  const campNameContainers = await getCampNames();

  return (
    <main className="text-center p-5">
      {/*<Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >*/}
        

        <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
          <div className="text-4xl font-medium">Verifile</div>
          <AdminClient
            campNameContainers={campNameContainers}
            session={session}
          />
        </div>
      {/*</Suspense>*/}
    </main>
  ); 
}/* <HospitalCatalog
          hospitalsJson={camps}
          mapName={names}
          onRating={(link: string) => {
            router.push(link);
          }}
        />*/
