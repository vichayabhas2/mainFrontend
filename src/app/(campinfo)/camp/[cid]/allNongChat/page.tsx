import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getChat from "@/libs/randomthing/getChat";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import ChatChoiseClient from "@/components/ChatChoiseClient";

export default async function NongChatChoise({
  params,
}: {
  params: { cid: string };
}) {
  const campId = new mongoose.Types.ObjectId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const shertManage = await getShertManageByCampId(campId, token);
  switch (shertManage.role) {
    case "nong": {
      const data = await getChat(shertManage._id, "getNongChat", token);
      if (!data.success) {
        return <BackToHome />;
      }
      return <ChatClient data={data} token={token} />;
    }
    case "pee": {
      const peeCamp = await getPeeCamp(shertManage.campModelId, token);
      const nongs = await getUserFromCamp("getNongsFromBaanId", peeCamp.baanId);
      return <ChatChoiseClient nongs={nongs} campId={campId} />;
    }
    case "peto":
      return <BackToHome />;
  }
  //เอา shertManage ของน้องมาให้เลือก
}
