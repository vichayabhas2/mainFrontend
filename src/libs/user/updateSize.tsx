import { backendUrl, userPath } from "@/components/setup";

export default async function updateSize(
  size: "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  token: string
) {
    alert(size)
    console.log(size)
    console.log('ggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  const response = await fetch(`${backendUrl}/${userPath}/updateSize/params/${size}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if(!response.ok){
    alert(response.status)
  }
}
