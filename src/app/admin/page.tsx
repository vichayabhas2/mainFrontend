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
import getPartNames from "@/libs/admin/getPartNames";


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
  const camps = await getCamps();
  const campNameContainers = await getCampNames();
  const partNameContainers=await getPartNames()

  return (
    <main className="text-center p-5">
      {/*<Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >*/}
      <HospitalCatalog hospitalsJson={camps} univercity={true} url="admin/camp"/>
      
      <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
        <div className="text-4xl font-medium">สร้างค่าย</div>
        <AdminClient
          campNameContainers={campNameContainers}
          session={session}
          partNameContainers={partNameContainers}
        />
      </div>
      {/*</Suspense>*/}
    </main>
  );
} /* <HospitalCatalog


function getPartNames() {
  throw new Error("Function not implemented.");
}
        hospitalsJson={camps}
        mapName={names}
        onRating={(link: string) => {}}
      />*/
