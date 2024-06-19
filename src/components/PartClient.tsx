"use client";

import { useRouter } from "next/navigation";
import { InterPartFront, InterUser, ShowMember } from "../../interface";
import BackToHome from "./BackToHome";

export default async function PartClient(
  part: InterPartFront,
  user: InterUser,
  pees: ShowMember[],
  petos: ShowMember[]
) {
  if (user.mode == "nong") {
    return null
  }

  const router = useRouter();
  return (
    <main className="text-center p-5">
      <div>
        <div>รายชื่อพี่บ้านฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>

            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {pees.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shertSize}</td>
              <td>{user.group}</td>
              {user.helthIsueId ? (
                <td
                  onClick={() => {
                    router.push(`/helthIshue/${user.helthIsueId?.toString()}`);
                  }}
                >
                  {user.helthIsueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>รายชื่อปีโตฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {petos.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shertSize}</td>
              <td>{user.group}</td>
              {user.helthIsueId ? (
                <td
                  onClick={() => {
                    router.push(`/helthIshue/${user.helthIsueId?.toString()}`);
                  }}
                >
                  {user.helthIsueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
}
