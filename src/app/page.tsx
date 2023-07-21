import AddDeneme from "@/components/AddDeneme";
import Denemes from "@/components/Denemes";
import { getDenemes } from "@/lib/firebase";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const denemes: IDeneme[] = await getDenemes();

  return {
    title: "Total deneme: " + denemes.length,
  };
}

export default async function Home() {
  const denemes: IDeneme[] = await getDenemes();

  return (
    <main className="flex flex-col py-20 gap-4 max-w-xl mx-auto">
      <AddDeneme />
      <Denemes denemes={denemes} />
    </main>
  );
}
