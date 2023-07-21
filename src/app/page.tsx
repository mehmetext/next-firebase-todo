import { getDenemes } from "@/lib/firebase";

export default async function Home() {
  const denemes: IDeneme[] = await getDenemes();

  return <main className="">denemes</main>;
}
