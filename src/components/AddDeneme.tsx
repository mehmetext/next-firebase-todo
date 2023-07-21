"use client";

import { addDeneme } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddDeneme() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let val = value;
    if ((val = val.trim())) {
      setLoading(true);
      await addDeneme(value);
      setValue("");
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky flex gap-2 top-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="flex-1 outline-none border p-2 rounded disabled:bg-gray-100"
        disabled={loading}
      />
      <button
        disabled={value.trim() == ""}
        className="border p-2 rounded bg-white text-gray-800 font-semibold transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        ADD
      </button>
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 rounded text-white">
          adding...
        </div>
      )}
    </form>
  );
}
