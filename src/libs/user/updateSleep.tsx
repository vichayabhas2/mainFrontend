import { backendUrl, userPath } from "@/components/setup";
import getUserProfile from "./getUserProfile";

export default async function updateSleep(sleep:boolean,token:string){
    const user = await getUserProfile(token);
  if (user.likeToSleepAtCamp!=sleep) {
    const response = await fetch(`${backendUrl}/${userPath}/updateSleep`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache:'no-store'
    });
  }
}