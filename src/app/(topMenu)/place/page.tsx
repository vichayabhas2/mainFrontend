import BackToHome from "@/components/BackToHome";
import BuildingClient from "@/components/BuildingClient";
import getAllBuilding from "@/libs/randomthing/getAllBuilding";
import { useSession } from "next-auth/react";

export default async function Placepage(){
    const buildings=await getAllBuilding()
    const {data:session}=useSession()
    if(!session){
        return <BackToHome/>
    }
    return<BuildingClient buildings={buildings} token={session.user.token} />
}