"use client";

import { useRouter } from "next/navigation";
import { InterActionPlan, showActionPlan } from "../../interface";
import DateConv from "./Dateconv";

export default function ActionPlandClient({
  actionPlands,
}: {
  actionPlands: showActionPlan[];
}) {
  const router=useRouter()
  return (
    <div>
      <table>
        <tr>
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
        {actionPlands.map((actionPland) => {
          //console.log(actionPland);
          const monthArray = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const dateE = new Date(actionPland.end);
          const dateS = new Date(actionPland.start);
          const dayS = String(dateS.getDate()).padStart(2, "0");
          const monthS = monthArray[dateS.getMonth()];
          const yearS = dateS.getFullYear();
          const hoursS = String(dateS.getHours()).padStart(2, "0");
          const minutesS = String(dateS.getMinutes()).padStart(
            2,
            "0"
          );

          const dayE = String(dateE.getDate()).padStart(2, "0");
          const monthE = monthArray[dateE.getMonth()];
          const yearE = dateE.getFullYear();
          const hoursE = String(dateE.getHours()).padStart(2, "0");
          const minutesE = String(dateE.getMinutes()).padStart(
            2,
            "0"
          );
          return (
            <tr>
              <td onClick={()=>{router.push(`/actionPlan/${actionPland._id}`)}}>{actionPland._id.toString()}</td>
              <td>
                <DateConv
                  day={dayS}
                  month={monthS}
                  year={yearS}
                  hours={hoursS}
                  minutes={minutesS}
                />
              </td>
              <td>
                <DateConv
                  day={dayE}
                  month={monthE}
                  year={yearE}
                  hours={hoursE}
                  minutes={minutesE}
                />
              </td>
              <td onClick={()=>{router.push(`/actionPlan/part/${actionPland.partId}`)}}>{actionPland.partName}</td>
              <td>{actionPland.action}</td>
              <td>{actionPland.placeName.toString()}</td>
              <td>{actionPland.headName}</td>
              <td>{actionPland.headTel}</td>
              <td>{actionPland.body}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
