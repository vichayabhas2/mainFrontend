import mongoose from "mongoose";
import {
  InterBaanBack,
  InterBaanFront,
  InterCampBack,
  InterCampFront,
  InterPartBack,
  InterPartFront,
  InterSize,
  InterWorkingItem,
  InterActionPlan,
  MapObjectId,
  MyMap,
} from "../../intreface";
import dayjs from "dayjs";
import { InterTimeOffset, ShowMember, ShowNong } from "../../interface";
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
/*export function conBaanBackToFront(input: InterBaanBack): InterBaanFront {
  const {
    name,
    fullName,
    campId,
    peeIds,
    nongIds,
    nongHelthIsueIds,
    peeHelthIsueIds,
    nongShertSize,
    peeShertSize,
    songIds,
    nongHaveBottle,
    peeHaveBottle,
    nongHaveBottleMapIds,
    peeHaveBottleMapIds,
    peeModelIds,
    nongModelId,
    nongShertManageIds,
    peeShertManageIds,
    link,
    styleId,
    boySleepPlaceId,
    girlSleepPlaceId,
    mapShertManageIdByUserId,
    nomalPlaceId,
    _id,
    peeSleepIds,
    nongSleepIds,
    groupRef,
  } = input;
  return {
    name,
    fullName,
    campId,
    link,
    peeHaveBottle,
    nomalPlaceId,
    nongHaveBottle,
    nongHelthIsueIds,
    nongIds,
    nongModelId,
    nongShertManageIds,
    peeHelthIsueIds,
    peeIds,
    peeShertManageIds,
    peeModelIds,
    peeShertSize: sizeMapToJson(peeShertSize),
    nongShertSize: sizeMapToJson(nongShertSize),
    songIds,
    styleId,
    boySleepPlaceId,
    girlSleepPlaceId,
    groupRef,
    peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
    nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
    mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
    _id,
    peeSleepIds,
    nongSleepIds,
  };
}
export function conCampBackToFront(input: InterCampBack): InterCampFront {
  const {
    nameId,
    round,
    dateStart,
    dateEnd,
    boardIds,
    peeIds,
    nongIds,
    partIds,
    petoIds,
    authorizeIds,
    nongHelthIsueIds,
    peeHelthIsueIds,
    petoHelthIsueIds,
    dataLock,
    nongShertSize,
    peeShertSize,
    petoShertSize,
    nongModelIds,
    peeModelIds,
    petoModelIds,
    nongPendingIds, /////////////i
    nongPassIds, ////////////////////i
    open,
    peePassIds, //<userId,partId>               ////////////////////////i
    songIds,
    nongHaveBottle,
    peeHaveBottle,
    petoHaveBottle,
    nongHaveBottleMapIds,
    peeHaveBottleMapIds,
    petoHaveBottleMapIds,
    nongSureIds,
    baanIds,
    nongShertManageIds,
    peeShertManageIds,
    petoShertManageIds,
    link,
    allDone,
    lockChangePickup,
    pictureUrls,
    campStyleId,
    actionPlanIds,
    workItemIds,
    nongPaidIds,
    nongInterviewIds, ////////////////////////////////i
    registerModel,
    memberStructre,
    mapShertManageIdByUserId,
    logoUrl,
    registerSheetLink,
    peeLock,
    outRoundIds,
    campName,
    _id,
    peeSleepIds,
    peeSleepModel,
    nongSleepIds,
    nongSleepModel,
    baanBordId,
    partNameIds,
    partBoardId,
    partCoopId,
    partRegiterId,
    partPeeBaanId,
    groupName,
    peeDataLock,
    petoDataLock,
    haveCloth,
    actionPlanOffset,
    currentNong,
    currentPee,
  } = input;
  return {
    partIds,
    open,
    peeHaveBottle,
    peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
    peeHelthIsueIds,
    peeIds,
    peeModelIds,
    peePassIds: mapObjectIdToMyMap(peePassIds),
    peeShertManageIds,
    peeShertSize: sizeMapToJson(peeShertSize),
    petoHaveBottle,
    petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
    petoHelthIsueIds,
    petoIds,
    petoModelIds,
    petoShertManageIds,
    petoShertSize: sizeMapToJson(petoShertSize),
    pictureUrls,
    nameId,
    nongHaveBottle,
    nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
    nongHelthIsueIds,
    nongIds,
    nongInterviewIds: mapStringToMyMap(nongInterviewIds),
    nongModelIds,
    nongPaidIds,
    nongPassIds: mapStringToMyMap(nongPassIds),
    nongPendingIds: mapStringToMyMap(nongPendingIds),
    nongShertManageIds,
    nongShertSize: sizeMapToJson(nongShertSize),
    nongSureIds,
    registerModel,
    round,
    actionPlanIds,
    allDone,
    authorizeIds,
    baanIds,
    boardIds,
    campStyleId,
    link,
    lockChangePickup,
    dataLock,
    dateEnd,
    dateStart,
    memberStructre,
    workItemIds,
    songIds,
    logoUrl,
    mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
    registerSheetLink,
    peeLock,
    outRoundIds,
    campName,
    _id,
    peeSleepIds,
    peeSleepModel,
    nongSleepIds,
    nongSleepModel,
    baanBordId,
    partNameIds,
    partBoardId,
    partCoopId,
    partRegiterId,
    partPeeBaanId,
    groupName,
    peeDataLock,
    petoDataLock,
    haveCloth,
    actionPlanOffset,
    currentNong,
    currentPee,
  };
}
export function conPartBackToFront(input: InterPartBack): InterPartFront {
  const {
    nameId,
    campId,
    peeIds,
    petoIds,
    peeHelthIsueIds,
    petoHelthIsueIds,
    peeShertSize,
    petoShertSize,
    peeHaveBottle,
    petoHaveBottle,
    peeHaveBottleMapIds,
    petoHaveBottleMapIds,
    peeModelIds,
    petoModelId,
    peeShertManageIds,
    petoShertManageIds,
    actionPlanIds,
    workItemIds,
    mapShertManageIdByUserId,
    placeId,
    partName,
    peeSleepIds,
    _id,
  } = input;

  return {
    actionPlanIds,
    workItemIds,
    campId,
    nameId,
    peeHaveBottle,
    peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
    peeHelthIsueIds,
    peeIds,
    peeModelIds,
    peeShertManageIds,
    peeShertSize: sizeMapToJson(peeShertSize),
    petoHaveBottle,
    petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
    petoHelthIsueIds,
    petoIds,
    petoModelId,
    petoShertManageIds,
    petoShertSize: sizeMapToJson(petoShertSize),
    placeId,
    mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
    partName,
    peeSleepIds,
    _id,
  };
}*/
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

export const backendUrl = deploy
  ? "https://main-backend-seven.vercel.app"
  : "http://localhost:5000";
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
import * as XLSX from "xlsx";
import React from "react";

//import { Observable } from 'rxjs/Observable';
export class AppComponent {
  

  fireEvent(data:any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      data
    );

    /* new format */
    var fmt = "0.00";
    /* change cell format of range B2:D4 */
    var range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } };
    for (var R = range.s.r; R <= range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell || cell.t != "n") continue; // only format numeric cells
        cell.z = fmt;
      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    var fmt = "@";
    wb.Sheets["Sheet1"]["F"] = fmt;

    /* save to file */
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
}

import { utils, writeFile } from "xlsx";

export function generateExcelData(data: any) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelData = writeFile(workbook, "products.xlsx", {
    compression: true,
  });
  return excelData;
}
export function downloadExcelFile(data: any) {
  const excelData = generateExcelData(data);
  const blob = new Blob([excelData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.xlsx");
  document.body.appendChild(link);
  link.click();
}
export function downToShowNong({name,nickname,lastname,gender,id}:ShowMember):ShowNong{
  return {name,nickname,lastname,gender,id}

}