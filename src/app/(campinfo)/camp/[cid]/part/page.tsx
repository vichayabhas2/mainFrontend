import getCamp from "@/libs/camp/getCamp"
import getPart from "@/libs/camp/getPart"
import mongoose from "mongoose"
import { InterPartFront } from "../../../../../../interface"
import ChoicePartChatClient from "@/components/ChoicePartChatClient"

export default async function PartChoice({params}:{params:{cid:string}}){
    const camp=await getCamp(new mongoose.Types.ObjectId(params.cid))
    const parts:InterPartFront[]=[]
    var i=0
    while(i<camp.partIds.length){
        const part=await getPart(camp.partIds[i++])
        parts.push(part)
    }
    return<ChoicePartChatClient parts={parts}/>
    //เอาทุกฝ่ายในค่ายมาให้เลือกให้อ่านแชต
}