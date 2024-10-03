import getAllCampSize from "@/libs/camp/getAllCampSize";
import mongoose from "mongoose";

export default async function WelfareServer({
  campId,
  token,
}: {
  campId: mongoose.Types.ObjectId;
  token: string;
}) {
  const sizeDetail = await getAllCampSize(campId);
  return (
    <table>
      <tr>
        <th>กลุ่ม</th>
        <th>น้อง S</th>
        <th>น้อง M</th>
        <th>น้อง L</th>
        <th>น้อง XL</th>
        <th>น้อง XXL</th>
        <th>น้อง 3XL</th>
        <th>พี่{sizeDetail.groupName} S</th>
        <th>พี่{sizeDetail.groupName} M</th>
        <th>พี่{sizeDetail.groupName} L</th>
        <th>พี่{sizeDetail.groupName} XL</th>
        <th>พี่{sizeDetail.groupName} XXL</th>
        <th>พี่{sizeDetail.groupName} 3XL</th>
        {sizeDetail.isHavePeto ? (
          <>
            <th>ปีโต S</th>
            <th>ปีโต M</th>
            <th>ปีโต L</th>
            <th>ปีโต XL</th>
            <th>ปีโต XXL</th>
            <th>ปีโต 3XL</th>
          </>
        ) : null}
      </tr>
      <tr>
        <td>{sizeDetail.name}</td>
        <td>{sizeDetail.nongSize.sizeS}</td>
        <td>{sizeDetail.nongSize.sizeM}</td>
        <td>{sizeDetail.nongSize.sizeL}</td>
        <td>{sizeDetail.nongSize.sizeXL}</td>
        <td>{sizeDetail.nongSize.sizeXXL}</td>
        <td>{sizeDetail.nongSize.size3XL}</td>
        <td>{sizeDetail.peeSize.sizeS}</td>
        <td>{sizeDetail.peeSize.sizeM}</td>
        <td>{sizeDetail.peeSize.sizeL}</td>
        <td>{sizeDetail.peeSize.sizeXL}</td>
        <td>{sizeDetail.peeSize.sizeXXL}</td>
        <td>{sizeDetail.peeSize.size3XL}</td>
        {sizeDetail.isHavePeto ? (
          <>
            <td>{sizeDetail.petoSize.sizeS}</td>
            <td>{sizeDetail.petoSize.sizeM}</td>
            <td>{sizeDetail.petoSize.sizeL}</td>
            <td>{sizeDetail.petoSize.sizeXL}</td>
            <td>{sizeDetail.petoSize.sizeXXL}</td>
            <td>{sizeDetail.petoSize.size3XL}</td>
          </>
        ) : null}
      </tr>
      {sizeDetail.baanSizes.map((data) => (
        <tr>
          <td>{data.name}</td>
          <td>{data.nongSize.sizeS}</td>
          <td>{data.nongSize.sizeM}</td>
          <td>{data.nongSize.sizeL}</td>
          <td>{data.nongSize.sizeXL}</td>
          <td>{data.nongSize.sizeXXL}</td>
          <td>{data.nongSize.size3XL}</td>
          <td>{data.peeSize.sizeS}</td>
          <td>{data.peeSize.sizeM}</td>
          <td>{data.peeSize.sizeL}</td>
          <td>{data.peeSize.sizeXL}</td>
          <td>{data.peeSize.sizeXXL}</td>
          <td>{data.peeSize.size3XL}</td>
          {sizeDetail.isHavePeto ? (
            <>
              <td>{data.petoSize.sizeS}</td>
              <td>{data.petoSize.sizeM}</td>
              <td>{data.petoSize.sizeL}</td>
              <td>{data.petoSize.sizeXL}</td>
              <td>{data.petoSize.sizeXXL}</td>
              <td>{data.petoSize.size3XL}</td>
            </>
          ) : null}
        </tr>
      ))}
      {sizeDetail.partSizes.map((data) => (
        <tr>
          <td>{data.name}</td>
          <td>{data.nongSize.sizeS}</td>
          <td>{data.nongSize.sizeM}</td>
          <td>{data.nongSize.sizeL}</td>
          <td>{data.nongSize.sizeXL}</td>
          <td>{data.nongSize.sizeXXL}</td>
          <td>{data.nongSize.size3XL}</td>
          <td>{data.peeSize.sizeS}</td>
          <td>{data.peeSize.sizeM}</td>
          <td>{data.peeSize.sizeL}</td>
          <td>{data.peeSize.sizeXL}</td>
          <td>{data.peeSize.sizeXXL}</td>
          <td>{data.peeSize.size3XL}</td>
          {sizeDetail.isHavePeto ? (
            <>
              <td>{data.petoSize.sizeS}</td>
              <td>{data.petoSize.sizeM}</td>
              <td>{data.petoSize.sizeL}</td>
              <td>{data.petoSize.sizeXL}</td>
              <td>{data.petoSize.sizeXXL}</td>
              <td>{data.petoSize.size3XL}</td>
            </>
          ) : null}
        </tr>
      ))}
    </table>
  );
}
