import mongoose from "mongoose";
import { utils, writeFile } from "xlsx";
import {
  InterSize,
  InterActionPlan,
  MapObjectId,
  MyMap,
  InterTimeOffset,
  ShowMember,
  ShowNong,
} from "../../interface";
import dayjs from "dayjs";

const deploy = false;
export function startSize(): Map<
  "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  number
> {
  const size: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number> = new Map();
  const s: ("S" | "M" | "L" | "XL" | "XXL" | "3XL")[] = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
  ];
  s.forEach((e: "S" | "M" | "L" | "XL" | "XXL" | "3XL") => {
    size.set(e, 0);
  });
  return size;
}
export function swop(
  olds: mongoose.Types.ObjectId | null,
  news: mongoose.Types.ObjectId | null,
  array: mongoose.Types.ObjectId[]
): mongoose.Types.ObjectId[] {
  if (!olds) {
    if (news) {
      array.push(news);
    }
    return array;
  }
  const re = array.filter((e) => e != olds);
  if (news) {
    re.push(news);
  }
  return re;
}
export function calculate(
  input: unknown | number | undefined,
  plus: unknown | number | undefined,
  minus: unknown | number | undefined
) {
  return (input as number) + (plus as number) - (minus as number);
}
export const resOk = { success: true };
export const resError = { success: false };

export function sizeMapToJson(
  input: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>
): InterSize {
  const out: InterSize = {
    _id: null,
    sizeS: input.get("S") as number,
    sizeM: input.get("M") as number,
    sizeL: input.get("L") as number,
    sizeXL: input.get("XL") as number,
    sizeXXL: input.get("XXL") as number,
    size3XL: input.get("3XL") as number,
  };
  return out;
}
export function sizeJsonMod(
  size: "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  count: number,
  input: InterSize
): InterSize {
  switch (size) {
    case "S":
      input.sizeS = input.sizeS + count;
    case "M":
      input.sizeM = input.sizeM + count;
    case "L":
      input.sizeL = input.sizeL + count;
    case "XL":
      input.sizeXL = input.sizeXL + count;
    case "XXL":
      input.sizeXXL = input.sizeXXL + count;
    case "3XL":
      input.size3XL = input.size3XL + count;
  }
  return input;
}

export function mapBoolToArray(
  input: Map<mongoose.Types.ObjectId, boolean>
): mongoose.Types.ObjectId[] {
  var out: mongoose.Types.ObjectId[] = [];
  input.forEach((v: boolean, k: mongoose.Types.ObjectId) => {
    if (v) {
      out.push(k);
    }
  });
  return out;
}
export function mapStringToMyMap(
  input: Map<mongoose.Types.ObjectId, string>
): MyMap[] {
  var out: MyMap[] = [];
  input.forEach((value: string, key: mongoose.Types.ObjectId) => {
    out.push({ key, value });
  });
  return out;
}
export function mapObjectIdToMyMap(
  input: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>
): MapObjectId[] {
  var out: MapObjectId[] = [];
  input.forEach(
    (value: mongoose.Types.ObjectId, key: mongoose.Types.ObjectId) => {
      out.push({ key, value });
    }
  );
  return out;
}
/*export function myMapToMapString(input: MyMap[]): Map<string, string> {
    const map: Map<string, string> = new Map
    input.forEach((v) => {
        map.set(v.key, v.value)
    })
    return map

}*/

export function isInTime(start: Date, end: Date): boolean {
  const now = new Date(Date.now());
  return now > start && now < end;
}
export function plusActionPlan(
  input: InterActionPlan,
  minute: number
): InterActionPlan {
  const {
    start,
    end,
    partId,
    placeIds,

    action,
    headId,
    body,
    _id,
    partName,
  } = input;
  return {
    start: dayjs(start).add(minute, "minutes").toDate(),
    end: dayjs(end).add(minute, "minutes").toDate(),
    partId,
    placeIds,

    action,
    headId,
    body,
    _id,
    partName,
  };
}
const backendUrl=process.env.BACKEND_URL
export function getBackendUrl(){
  return 'http://localhost:5001'
}
export const userPath = "api/v1/auth";
export function hasKey(
  input: MyMap[] | MapObjectId[],
  id: mongoose.Types.ObjectId
): boolean {
  var i = 0;
  while (i < input.length) {
    if (input[i++].key === id) {
      return true;
    }
  }
  return false;
}
export function getValue(input: MyMap[], id: mongoose.Types.ObjectId): string {
  var i = 0;
  while (i < input.length) {
    if (!input[i++].key.toString().localeCompare(id.toString())) {
      return input[i - 1].value;
    }
  }
  return "";
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
}
export const sendNotification = () => {
  if (!("Notification" in window)) {
    throw new Error("Your browser does not support push notification");
  }
  Notification.requestPermission().then((Permission) => {
    const notificationOptions = {
      body: "Welcome to Javascript Push Notification",
      //icon:"./image.png"
    };
    new Notification("Push Notification", notificationOptions);
  });
};
export function addTime(input: Date, add: InterTimeOffset): Date {
  return dayjs(input)
    .add(-add.day, "days")
    .add(-add.hour, "hours")
    .add(-add.minute, "minutes")
    .toDate();
}
const removeDups = (
  arr: mongoose.Types.ObjectId[]
): mongoose.Types.ObjectId[] => {
  let unique: mongoose.Types.ObjectId[] = arr.reduce(function (
    acc: mongoose.Types.ObjectId[],
    curr: mongoose.Types.ObjectId
  ) {
    if (!acc.includes(curr)) acc.push(curr);
    return acc;
  },
  []);
  return unique;
};
export function generateExcelData(data: any, fileName: string) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelData = writeFile(workbook, `${fileName}.xlsx`, {
    compression: true,
  });
  return excelData;
}
export function downToShowNong({
  name,
  nickname,
  lastname,
  gender,
  id,
}: ShowMember): ShowNong {
  return { name, nickname, lastname, gender, id };
}
////////////////////////////////////////////////////////////////////////////////////
export function peeLookupNong<TValue>(
  pees: TValue[],
  nongs: TValue[]
): TValue[] {
  const mp = pees.length;
  const mn = nongs.length;
  var n = 0;
  var p = 0;
  const outs: TValue[] = [];
  var i = 0;
  if (mp > mn) {
    var count = mp / (mn + 1);
    console.log(count);
    const exc = mp % (mn + 1);
    if (exc) {
      outs.push(pees[p++]);
      count--;
    }
    var j = 0;
    while (j < count) {
      outs.push(pees[p++]);
      j++;
    }
    while (i < mn) {
      outs.push(nongs[n++]);
      if (exc > ++i) {
        outs.push(pees[p++]);
      }
      var j = 0;
      while (j < count) {
        outs.push(pees[p++]);
        j++;
      }
    }
  } else {
    var count = mn / (mp - 1);
    console.log(count);
    const exc = mn % (mp - 1);
    outs.push(pees[p++]);
    if (exc) {
      outs.push(nongs[n++]);
      count--;
    }
    var j = 0;
    while (j < count) {
      outs.push(nongs[n++]);
      j++;
    }
    while (i < mp - 2) {
      outs.push(pees[p++]);
      if (exc > ++i) {
        outs.push(nongs[n++]);
      }
      var j = 0;
      while (j < count) {
        outs.push(nongs[n++]);
        j++;
      }
    }
    outs.push(pees[p++]);
  }
  return outs;
}
export const departures = [
  "วิศวกรรมเคมี (Chemical Engineering)",
  "วิศวกรรมเคมีและกระบวนการ (นานาชาติ) (Chemical and Process Engineering)",
  "วิศวกรรมเครื่องกล (Mechanical Engineering)",
  "วิศวกรรมเรือ (Naval Architecture and Marine Engineering)",
  "วิศวกรรมยานยนต์ (Automotive Engineering)",
  "วิศวกรรมไฟฟ้า (Electrical Engineering)",
  "วิศวกรรมโยธา (Civil Engineering)",
  "วิศวกรรมโลหการและวัสดุ (Metallurgical and Materials Engineering)",
  "วิศวกรรมสิ่งแวดล้อม (Environmental Engineering)",
  "วิศวกรรมสำรวจ (Survey Engineering)",
  "วิศวกรรมทรัพยากรธรณี (Georesources Engineering)",
  "วิศวกรรมปิโตรเลียม (Petroleum Engineering)",
  "วิศวกรรมอุตสาหการ (Industrial Engineering)",
  "วิศวกรรมคอมพิวเตอร์ (Computer Engineering)",
  "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (หลักสูตร Sandbox) (Computer Engineering and Digital Technology)",
  "วิศวกรรมนิวเคลียร์และรังสี (Nuclear and Radiological Engineering)",
  "วิศวกรรมนาโน (นานาชาติ)** (Nano-Engineering)",
  "วิศวกรรมการออกแบบและการผลิตยานยนต์ (นานาชาติ)** (Automotive Design and Manufacturing Engineering)",
  "วิศวกรรมอากาศยาน (นานาชาติ)** (Aerospace Engineering)",
  "วิศวกรรมสารสนเทศและการสื่อสาร (นานาชาติ)** (Information and Communication Engineering)",
  "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (นานาชาติ)** (Robotics and Artificial Intelligence Engineering)",
] as const;
export const zeroTimeOffset: InterTimeOffset = {
  userId: new mongoose.Types.ObjectId(),
  minute: 0,
  hour: 0,
  day: 0,
  _id: new mongoose.Types.ObjectId(),
};