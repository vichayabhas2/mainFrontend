import { backendUrl } from "@/components/setup";
import { Register } from "../../../intreface";

export default async function userSignup(signUp: Register) {
  try {
    const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        signUp

        //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
      ),
    });

    if (!response.ok) {
      throw new Error("Failed to log-in");
    }
    return await response.json();
  } catch (err) {
    console.log("error");
  }
}
