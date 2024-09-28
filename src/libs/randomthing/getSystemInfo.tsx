import { backendUrl } from "@/components/setup";

export default async function getSystemInfo(): Promise<{systemMode:string}> {
    const res = await fetch(`${backendUrl}/randomthing/getSystemInfo`, {
      cache: "no-store",
    });
    return await res.json();
  }