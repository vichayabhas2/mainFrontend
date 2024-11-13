import getAirQuality from "@/libs/otherBackend/getAirQuality";
import GetTimeHtml from "./GetTimeHtml";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UpdateTimeOffsetRaw } from "../../interface";
import getUserProfile from "@/libs/user/getUserProfile";
import getTimeOffset from "@/libs/user/getTimeOffset";
import { zeroTimeOffset } from "./setup";

export default async function AirQuality() {
  const session = await getServerSession(authOptions);
  var timeOffset: UpdateTimeOffsetRaw;
  if (session) {
    const user = await getUserProfile(session.user.token);
    timeOffset = await getTimeOffset(user.displayOffsetId);
  } else {
    timeOffset = zeroTimeOffset;
  }

  const airQuality = await getAirQuality();
  return (
    <table>
      <tr>
        <th>time</th>
        <th>pm2.5</th>
        <th>aqi</th>
      </tr>
      {airQuality.measurements.hourly.map((hourly, i) =>
        i == airQuality.measurements.hourly.length - 1 ? null : (
          <tr>
            <td>
              <GetTimeHtml input={hourly.ts} offset={timeOffset} />
            </td>
            <td>{hourly.pm25?.concentration}</td>
            <td>{hourly.aqi}</td>
          </tr>
        )
      )}
    </table>
  );
}
