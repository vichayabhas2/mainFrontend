import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import getChat from "@/libs/randomthing/getChat";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function NongChat({
  params,
}: {
  params: { sid: string };
}) {
  const campMemberCardId = new mongoose.Types.ObjectId(params.sid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getChat(campMemberCardId, "getNongChat", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return <ChatClient data={data} token={token} />;
}