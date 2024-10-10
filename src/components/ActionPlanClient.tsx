"use client";

import { useRouter } from "next/navigation";
import {
  InterTimeOffset,
  showActionPlan,
} from "../../interface";
import GetTimeHtml from "./GetTimeHtml";

export default function ActionPlanClient({
  actionPlans,
  timeOffset,
}: {
  actionPlans: showActionPlan[];
  timeOffset: InterTimeOffset;
}) {
  const router = useRouter();
  return (
    <div className="text-center p-5 text-white rounded-3xl"
    style={{
      backgroundColor:"#961A1D",
      width:"80%",
      marginLeft:"10%",
      padding:"10px",
    }}
    >
      <table
      style={{
        width:"100%",
      }}
      >
        <tr style={{border:"solid", borderColor:"white"}}>
          <th>id</th>
          <th>start</th>
          <th>end</th>
          <th>partName</th>
          <th>action</th>
          <th>สถานที่</th>
          <th>ผู้ตัดสินใจสูงสุด</th>
          <th>เบอร์โทร</th>
          <th>body</th>
        </tr>
        {actionPlans.map((actionPlan) => {
          //console.log(actionPlan);

          return (
            <tr  style={{border:"solid", borderColor:"white"}}>
              <td
                onClick={() => {
                  router.push(`/actionPlan/${actionPlan._id}`);
                }}
              >
                {actionPlan._id.toString()}
              </td>
              <td>
                <GetTimeHtml offset={timeOffset} input={actionPlan.start} />
              </td>
              <td>
                <GetTimeHtml offset={timeOffset} input={actionPlan.end} />
              </td>
              <td
                onClick={() => {
                  router.push(`/actionPlan/part/${actionPlan.partId}`);
                }}
              >
                {actionPlan.partName}
              </td>
              <td>{actionPlan.action}</td>
              <td>{actionPlan.placeName.toString()}</td>
              <td>{actionPlan.headName}</td>
              <td>{actionPlan.headTel}</td>
              <td>{actionPlan.body}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
