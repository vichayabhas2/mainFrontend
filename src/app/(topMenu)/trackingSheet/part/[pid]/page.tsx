import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import WorkingItemClient from "@/components/WorkingItemClient";
import getWorkingItemByPartId from "@/libs/camp/getWorkingItemByPartId";
import getUserProfile from "@/libs/user/getUserProfile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import bcrypt from 'bcrypt'

export default async function HospitalDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  var i=0
  const workingItems=await getWorkingItemByPartId(new mongoose.Types.ObjectId(params.pid),session.user.token)
  while(i<workingItems.length){
    if(!await bcrypt.compare(user.linkHash,workingItems[i++].password)){
        workingItems[i-1].link=null
    }
}
  return <>
  <WorkingItemClient worlingItems={workingItems}/>
  </>;
}
