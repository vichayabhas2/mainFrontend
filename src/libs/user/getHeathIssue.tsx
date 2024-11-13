import { getBackendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { Id, InterHeathIssue } from "../../../interface";

export default async function getHeathIssue(
    id: Id
): Promise<InterHeathIssue> {
    const response = await fetch(
        `${getBackendUrl()}/${userPath}/getHeathIssue/params/${id}`,
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
