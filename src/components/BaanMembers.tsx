import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { InterBaanFront, InterUser, ShowMember } from "../../interface";


export default async function BaanMembers({ baan }: { baan: InterBaanFront }) {
  const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
  const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
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
          {nongs.map((user: ShowMember) => (
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
          {pees.map((user: ShowMember) => (
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
