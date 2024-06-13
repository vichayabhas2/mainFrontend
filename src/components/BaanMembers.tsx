"use client";
import {
  InterBaanFront,
  InterUser,
  RoleCamp,
  ShowMember,
} from "../../interface";
import { useRouter } from "next/navigation";

export default function BaanMembers({
  baan,
  campRole,
  pees,
  nongs,
}: {
  baan: InterBaanFront;
  campRole: RoleCamp;
  nongs: ShowMember[];
  pees: ShowMember[];
}) {
  const router = useRouter();
  return (
    <main className="text-center p-5">
      <div>
        <div>รายชื่อน้องบ้าน{baan.fullName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            {campRole !== "nong" ? (
              <>
                <th>ค้างคืนหรือไม่</th>
                <th>id</th>
                <th>รหัสประจำตัวนิสิต</th>
                <th>เบอร์โทรศัพท์</th>
                <th>email</th>
                <th>มีกระติกน้ำหรือไม่</th>
                <th>ขนาดเสื้อ</th>
                <th>กรุปของนิสิต</th>
                <th>ปัญหาสุขภาพ</th>
              </>
            ) : null}
          </tr>
          {pees.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              {campRole !== "nong" ? (
                <>
                  <td>{user.sleep} </td>
                  <td>{user._id.toString()}</td>
                  <td>{user.studentId}</td>
                  <td>{user.tel}</td>
                  <td>{user.email}</td>
                  <td>{user.haveBottle}</td>
                  <td>{user.shertSize}</td>
                  <td>{user.group}</td>
                  {user.helthIsueId ? (
                    <td
                      onClick={() => {
                        router.push(
                          `/helthIshue/${user.helthIsueId?.toString()}`
                        );
                      }}
                    >
                      {user.helthIsueId.toString()}
                    </td>
                  ) : (
                    <td> null</td>
                  )}
                </>
              ) : null}
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>รายชื่อพี่บ้าน{baan.fullName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            {campRole !== "nong" ? (
              <>
                <th>ค้างคืนหรือไม่</th>
                <th>id</th>
                <th>รหัสประจำตัวนิสิต</th>
                <th>เบอร์โทรศัพท์</th>
                <th>email</th>
                <th>มีกระติกน้ำหรือไม่</th>
                <th>ขนาดเสื้อ</th>
                <th>กรุปของนิสิต</th>
                <th>ปัญหาสุขภาพ</th>
              </>
            ) : null}
          </tr>
          {pees.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              {campRole !== "nong" ? (
                <>
                  <td>{user.sleep} </td>
                  <td>{user._id.toString()}</td>
                  <td>{user.studentId}</td>
                  <td>{user.tel}</td>
                  <td>{user.email}</td>
                  <td>{user.haveBottle}</td>
                  <td>{user.shertSize}</td>
                  <td>{user.group}</td>
                  {user.helthIsueId ? (
                    <td
                      onClick={() => {
                        router.push(
                          `/helthIshue/${user.helthIsueId?.toString()}`
                        );
                      }}
                    >
                      {user.helthIsueId.toString()}
                    </td>
                  ) : (
                    <td> null</td>
                  )}
                </>
              ) : null}
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
}
