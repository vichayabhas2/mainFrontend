import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import shertManagebyCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Baan({ params }: { params: { bid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token=session.user.token

  const user = await getUserProfile(session.user.token);
  
const baanId = new mongoose.Types.ObjectId(params.bid);
if(user.role==='admin'){
  return <UpdateBaanServer baanId={baanId} />;
}
const baan=await getBaan(baanId)
const camp=await getCamp(baan.campId)
const shertManage=await shertManagebyCampId(baan.campId,token)
switch (shertManage.role){
  case "nong":{
    return<BackToHome/>
  }
  case "pee":{
    const peeCamp=await getPeeCamp(shertManage.campModelId,token)
    if(user.authPartIds.includes(camp.partBoardId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    if(user.authPartIds.includes(camp.partCoopId)&&peeCamp.baanId.toString().localeCompare(params.bid)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    return<BackToHome/>

  }
  case "peto":{
    if(user.authPartIds.includes(camp.partBoardId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    if(user.authPartIds.includes(camp.partCoopId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    return<BackToHome/>

  }
}

  
}
