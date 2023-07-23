"use client";

//Firebase
import { deleteDeneme } from "@/lib/firebase";

//Zustand
import { useAppStore } from "@/lib/stores/app";

//Next
import { useRouter } from "next/navigation";

//React
import { useState } from "react";

export default function Deneme({
  deneme,
  isOdd,
}: {
  deneme: IDeneme;
  isOdd: boolean;
}) {
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();
  const updateEditingDeneme = useAppStore((store) => store.updateEditingDeneme);

  const handleDelete = async (id: string) => {
    updateEditingDeneme(null);
    setDeleting(true);
    await deleteDeneme(id);
    router.refresh();
  };

  return (
    <div
      key={deneme.id}
      className={`relative flex items-start justify-between gap-4 rounded-3xl pl-3 p-2 text-white ${
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
      <div
        className={`absolute -top-1 -left-1 -right-1 -bottom-1 flex items-center justify-center bg-black/50 rounded text-white transition ${
          deleting
            ? "scale-100 opacity-100 cursor-wait"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        deleting...
      </div>
    </div>
  );
}
