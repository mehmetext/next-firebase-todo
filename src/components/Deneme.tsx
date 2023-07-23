"use client";

import { deleteDeneme } from "@/lib/firebase";
import { useAppStore } from "@/lib/stores/app";
import { useRouter } from "next/navigation";

export default function Deneme({
  deneme,
  isOdd,
}: {
  deneme: IDeneme;
  isOdd: boolean;
}) {
  const router = useRouter();
  const updateEditingDeneme = useAppStore((store) => store.updateEditingDeneme);

  const handleDelete = async (id: string) => {
    await deleteDeneme(id);
    router.refresh();
  };

  return (
    <div
      key={deneme.id}
      className={`flex items-start justify-between gap-4 rounded-3xl pl-3 p-2 text-white ${
        isOdd ? "bg-blue-500" : "bg-blue-700"
      }`}
    >
      <p className="font-medium">{deneme.text}</p>
      <div className="flex items-center justify-center gap-1">
        <span className="shrink-0 bg-black/20 text-xs py-1 px-2 rounded-full">
          {deneme.createdAt?.toLocaleTimeString("tr-TR", {
            timeStyle: "short",
          })}
        </span>
        <div
          onClick={() => updateEditingDeneme(deneme)}
          className="h-6 w-6 flex items-center justify-center bg-black/20 rounded-full cursor-pointer select-none"
        >
          E
        </div>
        <div
          onClick={() => {
            handleDelete(deneme.id);
          }}
          className="h-6 w-6 flex items-center justify-center bg-black/20 rounded-full cursor-pointer select-none"
        >
          x
        </div>
      </div>
    </div>
  );
}
