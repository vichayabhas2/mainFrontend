import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { InterBaanFront, InterUser } from "../../intreface";

export default async function BaanMembers({ baan }: { baan: InterBaanFront }) {
  const nongs = await getUserFromCamp("getNongsFromBaanId", baan.id);
  const pees = await getUserFromCamp("getPeesFromBaanId", baan.id);
  return (
    <main className="text-center p-5">
      <div>
        <div>รายชื่อน้องบ้าน{baan.fullName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
          </tr>
          {nongs.map((user: InterUser) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
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
          </tr>
          {pees.map((user: InterUser) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
}
