import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import { getAllBuildings, getAllPlace } from "@/components/placeSetUp";
import getActionPlan from "@/libs/camp/getActionPlan";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { InterPartFront, InterPlace } from "../../../../../interface";
import getPlace from "@/libs/randomthing/getPlace";
import EditActionPland from "@/components/EditActionPland";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getWorkingItem from "@/libs/camp/getWorkingItem";
import getUserProfile from "@/libs/user/getUserProfile";
import bcrypt from 'bcrypt'
import getPart from "@/libs/camp/getPart";
import getCamp from "@/libs/camp/getCamp";
import EditWorkingItem from "@/components/EditWorkingItem";
export default async function HospitalDetailPage({
  params,
}: {
  params: {wid:string };
}) {
    const session=await getServerSession(authOptions)
    if(!session){
        return<BackToHome/>
    }
    const user=await getUserProfile(session.user.token)
    if(user.role==='nong'){
        return <BackToHome/>
    }
    const workingItem=await getWorkingItem(new mongoose.Types.ObjectId(params.wid),session.user.token)
    const part=await getPart(workingItem.partId,session.user.token)
    const camp=await getCamp(part.campId)
    var i=0
    const parts:InterPartFront[]=[]
    while(i<camp.partIds.length){
        const buf=await getPart(camp.partIds[i++],session.user.token)
        parts.push(buf)
    }
    const auth=await bcrypt.compare(user.linkHash,workingItem.password)
    if(!await bcrypt.compare(user.linkHash,workingItem.password)){
        workingItem.link=null
    }
    return<><EditWorkingItem token={session.user.token} worlingItem={workingItem} parts={parts} auth={auth}/></>
  

}
