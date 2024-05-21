import { backendUrl, userPath } from "@/components/setup";

export default async function changeModeToPee(password:string,token:string){
    const response=await fetch(`${backendUrl}/${userPath}/changeModeToPee/params/${password}`,{
        method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
}