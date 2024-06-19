//"use client";

import { InterActionPlan, showActionPlan } from "../../interface";

export default function ActionPlandClient({
  actionPlands,
}: {
  actionPlands: showActionPlan[];
}) {
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
        {actionPlands.map((actionPland) => (
          <tr>
            <td>{actionPland._id.toString()}</td>
            <td>{actionPland.start.toISOString()}</td>
            <td>{actionPland.end.toISOString()}</td>
            <td>{actionPland.partName}</td>
            <td>{actionPland.action}</td>
            <td>{actionPland.placeName.toString()}</td>
            <td>{actionPland.headName}</td>
            <td>{actionPland.headTel}</td>
            <td>{actionPland.body}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
