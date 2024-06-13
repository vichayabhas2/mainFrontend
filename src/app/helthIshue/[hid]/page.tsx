import getHelthIsue from "@/libs/user/getHelthIsue";
import mongoose from "mongoose";

export default async function HelthIshuePage({ params }: { params: { hid: string } }) {
    const helthIsueId = new mongoose.Types.ObjectId(params.hid)
    const helthIshue = await getHelthIsue(helthIsueId)
    return <div
        className="flex flex-row h-auto"
    >
        <div className="w-1/5 h-auto relative rounded-t-lg">

        </div>

        <div className="w-3/5 h-auto p-[10px]">
            <div className="text-left pl-5">
                <div className="text-3xl"></div>
                {helthIshue.userId.toString()}

                <div className="text-2xl my-10">

                </div>
            </div>
        </div>
        <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
    </div>

}