export interface IntreActionPlan {
    id: string,
    action: string,
    partId: string,
    placeIds: string[],
    start: Date,
    end: Date,
    headId: string,
    body: string,
    _id:string
}
export interface InterBaanBack {
    id: string,
    name: string,
    fullName: string | null,
    campId: string,
    peeIds: string[],
    nongIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: Map<string, boolean>,
    peeHaveBottleMapIds: Map<string, boolean>,
    peeModelIds: string[],
    nongModelId: string,
    mapPeeCampIdByPartId: Map<string, string>,                    ///////////////////////i
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    link: string | null,
    styleId: string,
    boySleepPlaceId: string | null,
    girlSleepPlaceId: string | null,
    nomalPlaceId: string | null,
    mapShertManageIdByUserId: Map<string, string>,
    _id:string
}
export interface InterBuilding {
    id: string,
    name: string,
    placeIds: string[],
    actionPlanIds: string[],
    fridayActIds: string[],
    _id:string
}
export interface InterCampBack {
    id: string,
    nameId: string,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: string[],
    peeIds: string[],
    nongIds: string[],
    partIds: string[],
    petoIds: string[],
    authorizeIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    dataLock: boolean,
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    nongModelIds: string[],
    peeModelIds: string[],
    petoModelIds: string[],
    nongPendingIds: Map<string, string>,                            /////////////i
    nongPassIds: Map<string, string>,                               ////////////////////i
    open: boolean,
    peePassIds: Map<string, string>,//<userId,partId>               ////////////////////////i
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: Map<string, boolean>,
    peeHaveBottleMapIds: Map<string, boolean>,
    petoHaveBottleMapIds: Map<string, boolean>,
    nongSureIds: string[],
    baanIds: string[],
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: string,
    actionPlanIds: string[],
    workItemIds: string[],
    nongPaidIds: string[],
    nongInterviewIds: Map<string, string>,                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string,
    mapShertManageIdByUserId: Map<string, string>,
    registerSheetLink: string,
    peeLock: boolean,
    outRoundIds: string[],
    _id:string,
    campName:string
}
export interface InterCampStyle {
    id: string,
    refId: string,
    types: 'camp' | 'baan',
    _id:string
}
export interface InterFrydayAct {
    id: string,
    company: string,
    date: Date,
    staffId: string[],
    limit: number,
    studentId: string[],
    placeId: string,
    _id:string
}
export interface InterHelthIsue {
    id: string,
    userId: string,
    _id:string
}
export interface InterNameContainer {
    id: string,
    campIds: string[],
    name: string,
    _id:string
}
export interface InterNongCampBack {
    id: string,
    campId: string,
    baanId: string,
    nongIds: string[],
    nongShertManageIds: string[],
    _id:string
    //mapNongCampIdByUserId: Map<string, string>
}
export interface InterPartBack {
    id: string,
    nameId: string,
    campId: string,
    peeIds: string[],
    petoIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: Map<string, boolean>,
    petoHaveBottleMapIds: Map<string, boolean>,
    peeModelIds: string[],
    petoModelId: string,
    mapPeeCampIdByBaanId: Map<string, string>,                                     /////////////////i
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    actionPlanIds: string[],
    workItemIds: string[],
    placeId: string | null,
    mapShertManageIdByUserId: Map<string, string>,
    _id:string
}
export interface InterPartNameContainer {
    id: string,
    campIds: string[],
    name: string,
    partIds: string[],
    _id:string
}
export interface InterPeeCamp {
    id: string,
    campId: string,
    partId: string,
    baanId: string, peeIds: string[],
    peeShertManageIds: string[],
    _id:string

}
export interface InterPetoCamp {
    id: string,
    campId: string,
    partId: string,
    petoShertManageIds: string,
    petoIds: string[],
    _id:string
}
export interface InterPlace {
    id: string,
    buildingId: string,
    flore: string,
    room: string,
    actionPlanIds: string[],
    fridayActIds: string[],
    boySleepBaanIds: string[],
    girlSleepBaanIds: string[],
    normalBaanIds: string[],
    sleepCap: number,
    actCap: number,
    studyCap: number,
    _id:string
}
export interface InterShertManage {
    id: string,
    userId: string,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    campModelId: string,
    role: 'nong' | 'pee' | 'peto',
    recive: number,
    recived: number,
    _id:string
}
export interface InterSong {
    id: string,
    name: string,
    campIds: string[],
    baanIds: string[],
    auther: string,
    time: TimeRanges,
    link: string,
    userLikeIds: string[],
    _id:string
}
export interface InterUser {
    id: string,//                          id ของ mongodb
    name: string,//                        ชื่อจริง
    lastname: string,//                    นามสกุล
    nickname: string,//                    ชื่อเล่น
    email: string,//updateable             email
    password: string,//                    รหัสผ่าน
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    studentId: string | null,//            รหัสประจำตัวนิสิต
    gender: 'Male' | 'Female',//           เพศ
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',//ขนาดเสื้อ
    helthIsueId: string | null,//          รหัสปัญหาสุขภาพ
    haveBottle: boolean,//                 มีกระติกน้ำหรือไม่
    mode: 'nong' | 'pee',//                การมองเห็นของพี่
    nongCampIds: string[],//               เคยเป็นน้องค่ายอะไรบ้าง
    peeCampIds: string[],//                เคยเป็นพี่บ้านค่ายอะไรบ้าง
    petoCampIds: string[],//               เคยเป็นพี่ปีโตค่ายอะไรบ้าง
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,//กรุปของนิสิต
    role: 'pee' | 'nong' | 'admin' | 'peto',//บทบาท
    filterIds: string[],//                 
    registerIds: string[],//               
    authorizeIds: string[],//              ได้รับอนุญาตให้จัดการค่ายอะไรบ้าง
    fridayActIds: string[],//              ลง friday activity อะไรบ้าง
    fridayActEn: boolean,//                ได้รับอนุญาติให้ลง friday activity หรือไม่
    fridayAuth: boolean,//                 ได้รับอนุญาติให้จัดการ friday activity หรือไม่
    likeSongIds: string[],//               ชอบเพลงอะไรบ้าง
    shertManageIds: string[],//            เป็นสมาชิกค่ายอะไรบ้าง
    createdAt: Date,//
    tel: string,   //                      เบอร์โทรศัพท์
    linkHash: string,//                    รหัสการเข้าถึงลิ้งในการทำงาน default 'null'
    citizenId: string,//                     รหัสประจำตัวประชาชน
    _id:string
}
export interface InterWorkingItem {
    id: string,
    name: string,
    link: string,
    status: 'not start' | 'in process' | 'done',
    partId: string,
    campId: string,
    linkOutIds: string[],
    fromId: string,
    createBy:string,
    _id:string
}
export interface InterSize {
    id: string | null,
    sizeS: number,
    sizeM: number,
    sizeL: number,
    sizeXL: number,
    sizeXXL: number,
    size3XL: number,

}

//////////////////////////////////////////////////////////

export interface InterBaanFront {
    id: string,
    name: string,
    fullName: string | null,
    campId: string,
    peeIds: string[],
    nongIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    nongShertSize: InterSize,//
    peeShertSize: InterSize,//
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: string[],//
    peeHaveBottleMapIds: string[],//
    peeModelIds: string[],
    nongModelId: string,
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    link: string | null,
    styleId: string,
    boySleepPlaceId: string | null,
    girlSleepPlaceId: string | null,
    nomalPlaceId: string | null,
    mapShertManageIdByUserId: MyMap[],
    _id:string
}

export interface InterCampFront {
    id: string,
    nameId: string,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: string[],
    peeIds: string[],
    nongIds: string[],
    partIds: string[],
    petoIds: string[],
    authorizeIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    dataLock: boolean,
    nongShertSize: InterSize,
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    nongModelIds: string[],
    peeModelIds: string[],
    petoModelIds: string[],
    nongPendingIds: MyMap[],                            /////////////i
    nongPassIds: MyMap[],                               ////////////////////i
    open: boolean,
    peePassIds: MyMap[],//<userId,partId>               ////////////////////////i
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: string[],
    peeHaveBottleMapIds: string[],
    petoHaveBottleMapIds: string[],
    nongSureIds: string[],
    baanIds: string[],
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: string,
    actionPlanIds: string[],
    workItemIds: string[],
    nongPaidIds: string[],
    nongInterviewIds: MyMap[],                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string,
    mapShertManageIdByUserId: MyMap[],
    registerSheetLink: string,
    peeLock: boolean,
    outRoundIds: string[],
    _id:string,
    campName:string
}
export interface InterPartFront {
    id: string,
    nameId: string,
    campId: string,
    peeIds: string[],
    petoIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: string[],
    petoHaveBottleMapIds: string[],
    peeModelIds: string[],
    petoModelId: string,
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    actionPlanIds: string[],
    workItemIds: string[],
    placeId: string | null,
    mapShertManageIdByUserId: MyMap[],
    _id:string
}
export interface MyMap {
    key: string,
    value: string
}
export interface InterLostAndFound {
    campId: string | null,
    type: 'lost' | 'found',
    name: string,
    detail: string,
    userId: string,
    placeId: string | null,
    buildingId: string | null,
    _id:string
}
export interface Register {
    name: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string,
    gender: 'Male' | 'Female',
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    haveBottle: boolean,
    tel: string,
    citizenId: string
}
export interface UpdateCamp {
    dataLock: boolean,
    open: boolean,
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    logoUrl: string,
    dateStart: Date,
    dateEnd: Date,
    registerSheetLink: string,
    peeLock: boolean
}
export interface CreateCamp {
    nameId: string,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: string[],
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',

}