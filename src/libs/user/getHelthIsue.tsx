import { backendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { InterHelthIsue } from "../../../interface";

export default async function getHelthIsue(
    id: mongoose.Types.ObjectId
): Promise<InterHelthIsue> {
    const response = await fetch(
        `${backendUrl}/${userPath}/getHelthIsue/params/${id}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error("Fail");
    }
    return await response.json();
}
