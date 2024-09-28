import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import getChat from "@/libs/randomthing/getChat";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function AllChat({
  params,
}: {
  params: { cid: string; pid: string };
}) {
  const campId = new mongoose.Types.ObjectId(params.cid);
  const partId = new mongoose.Types.ObjectId(params.pid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const shertManage = await getShertManageByCampId(campId, token);
  if (shertManage.role == "nong") {
    return <BackToHome />;
  }
  const data = await getChat(partId, "getPartChat", token);
  return <ChatClient data={data} token={token} />;
}
