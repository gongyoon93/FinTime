import { redirect } from "next/navigation";

export default function Home() {
  redirect("/history");
  return <div></div>;
}
