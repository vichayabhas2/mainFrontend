import { HospitalJson } from "../../interface"


export default async function getHospitals():Promise<HospitalJson> {


    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch("https://vaccine-app-backend.vercel.app/api/v1/hospitals")
    if(!response.ok){
        throw new Error("Fail")
    }

    return await response.json()
}