import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import getChat from "@/libs/randomthing/getChat";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function AllChat({ params }: { params: { cid: string } }) {
  const campId = new mongoose.Types.ObjectId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getChat(campId, "getAllChatFromCampId", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return <ChatClient data={data} token={token} />;
}
