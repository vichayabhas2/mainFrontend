"use client";

import { useRouter } from "next/navigation";
import { InterUser } from "../../interface";
import FinishButton from "./FinishButton";
import TopMenuItem from "./TopMenuItem";

export default function MenuPeeClient({ user }: { user: InterUser }) {
  const router = useRouter();
  return (
    <div >
      {user.authPartIds.length ? (
        <FinishButton
          text="ฝ่ายที่ได้รับอนุญาต"
          onClick={() => {
            router.push("/authPart");
          }}
        />
      ) : null}
      <FinishButton text="tracking sheet" onClick={()=>{router.push("/trackingSheet")}}/>
      <FinishButton text="action plan" onClick={()=>{router.push("/actionPlan")}}/>
      <FinishButton text="สถานที่" onClick={()=>{router.push("/place")}}/>
      <FinishButton text="Update Mode" onClick={()=>{router.push("/updateMode")}}/>
    </div>
  );
}
