import { redirect } from "next/navigation";

export default function Home() {
  redirect("/abook");
  return <div></div>;
}
