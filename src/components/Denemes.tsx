"use client";

import { deleteDeneme, updateDeneme } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Denemes({ denemes }: { denemes: IDeneme[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteDeneme(id);
    setLoading(false);
    router.refresh();
  };

  const handleEdit = async (deneme: IDeneme) => {
    const val = prompt("Update Deneme:", deneme.text);

    if (val && val.trim() != "") {
      setLoading(true);
      console.log(val);
      await updateDeneme({ ...deneme, text: val });
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {denemes.map((deneme, i) => (
        <div
          key={deneme.id}
          className={`flex items-start justify-between gap-4 rounded-3xl pl-3 p-2 text-white ${
            i % 2 == 0 ? "bg-blue-500" : "bg-blue-700"
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
              onClick={() => {
                handleEdit(deneme);
              }}
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
      ))}
      <div
        className={`absolute -top-1 -left-1 -right-1 -bottom-1 flex p-3 justify-center bg-black/50 rounded text-white transition ${
          loading
            ? "scale-100 opacity-100 cursor-wait"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        loading...
      </div>
    </div>
  );
}
