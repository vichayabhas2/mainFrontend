import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/BackToHome";
import { HelthIsueBody } from "../../../interface";
import getHelthIsue from "@/libs/user/getHelthIsue";
import HelthIshueClient from "@/components/HelthIshueClient";

export default async function name() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  var helthIshue: HelthIsueBody;
  if (user.helthIsueId) {
    helthIshue = await getHelthIsue(user.helthIsueId);
  } else {
    helthIshue = {
      food: "",
      medicine: "",
      chronicDisease: "",
      extra: "",
      isWearing: false,
      spicy: false,
    };
  }
  return<HelthIshueClient helthIshue={helthIshue} token={session.user.token}/>

}
