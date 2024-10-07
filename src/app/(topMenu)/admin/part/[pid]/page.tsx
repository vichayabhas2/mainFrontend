import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import UpdatePartServer from "@/components/UpdatePartServer";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getUserProfile from "@/libs/user/getUserProfile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const partId = new mongoose.Types.ObjectId(params.pid);
  const user = await getUserProfile(session.user.token);
  if (user.role === "admin") {
    return <UpdatePartServer partId={partId} token={session.user.token} />;
  }
  const part=await getPart(partId)
  const camp=await getCamp(part.campId)
  if(user.authPartIds.includes(camp.partBoardId)){
    return <UpdatePartServer partId={partId} token={session.user.token} />;
  }
  return<BackToHome/>
  
}
