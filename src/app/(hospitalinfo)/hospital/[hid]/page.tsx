import Image from "next/image";

import getHospital from "@/libs/getHospital";

export default async function HospitalDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const HospitalDetail = await getHospital(params.hid);

  return (
    <main className="text-center p-5">
      <div>
        <Image
          src={HospitalDetail.data.picture}
          alt="htfugyy"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5">{HospitalDetail.data.name}</div>
        <div className="text-md mx-5">{HospitalDetail.data.address}</div>
        <div className="text-md mx-5">{HospitalDetail.data.tel}</div>
      </div>
    </main>
  );
}
