"use client";

import Link from "next/link";
import { InterWorkingItem } from "../../interface";
import { useRouter } from "next/navigation";

export default function WorkingItemClient({
  worlingItems,
}: {
  worlingItems: InterWorkingItem[];
}) {
    const router=useRouter()
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>งาน</th>
          <th>สถานะ</th>
          <th>link</th>
          <th>ฝ่าย</th>
          <th>จาก</th>
          <th>งานถัดไป</th>
        </tr>
        {worlingItems.map((worlingItem) => (
          <tr>
            <td onClick={()=>router.push(`trackingSheet/${worlingItem._id}`)}>{worlingItem._id.toString()}</td>
            <td>{worlingItem.name}</td>
            <td>{worlingItem.status}</td>
            <td>
              {worlingItem.link ? (
                <Link href={worlingItem.link}>{worlingItem.link}</Link>
              ) : null}
            </td>
            <td onClick={()=>router.push(`trackingSheet/part/${worlingItem.partId}`)}>{worlingItem.partName}</td>
            <td>{worlingItem.fromId?.toString()}</td>
            <td>
              {worlingItem.linkOutIds.map((o) => o.toString()).toString()}
            </td>
          </tr>
        ))}
      </table>
      
    </div>
  );
}
/**export interface InterWorkingItem {

    name: string,
    link: string|null,
    status: 'not start' | 'in process' | 'done',
    partId: mongoose.Types.ObjectId,
    linkOutIds: mongoose.Types.ObjectId[],
    fromId: mongoose.Types.ObjectId | null,
    createBy: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    password:string
} */
