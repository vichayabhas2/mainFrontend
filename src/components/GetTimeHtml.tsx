import dayjs from "dayjs";
import { InterTimeOffset } from "../../interface";
import DateConv from "./Dateconv";

export default function GetTimeHtml({
  input,
  offset,
}: {
  input: Date;
  offset: InterTimeOffset;
}) {
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
  const dateObj = dayjs(input)
    .add(-offset.day, "days")
    .add(-offset.hour, "hours")
    .add(-offset.minute, "minutes")
    .toDate();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = monthArray[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return (
    <DateConv
      day={day}
      minutes={minutes}
      month={month}
      year={year}
      hours={hours}
    />
  );
}
