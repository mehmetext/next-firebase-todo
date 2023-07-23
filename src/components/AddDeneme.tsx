"use client";

import { addDeneme, updateDeneme } from "@/lib/firebase";
import { useAppStore } from "@/lib/stores/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export default function AddDeneme() {
  const router = useRouter();

  const { editingDeneme, updateEditingDeneme } = useAppStore(
    (store) => ({
      editingDeneme: store.editingDeneme,
      updateEditingDeneme: store.updateEditingDeneme,
    }),
    shallow
  );

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingDeneme) {
      setValue(editingDeneme.text);
    } else {
      setValue("");
    }
  }, [editingDeneme]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let val = value;
    if ((val = val.trim())) {
      setLoading(true);
      if (editingDeneme) {
        updateEditingDeneme(null);
        await updateDeneme({ ...editingDeneme, text: val });
      } else {
        await addDeneme(value);
      }
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
        className="flex-1 outline-none border p-2 rounded disabled:bg-gray-100 focus:border-blue-500 transition"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={value.trim() == ""}
        className="border p-2 rounded bg-white text-gray-800 font-semibold transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-100"
      >
        {editingDeneme ? "UPDATE" : "ADD"}
      </button>
      {editingDeneme && (
        <button
          onClick={() => updateEditingDeneme(null)}
          type="button"
          className="border p-2 rounded bg-white text-gray-800 font-semibold transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-100"
        >
          CANCEL
        </button>
      )}
      <div
        className={`absolute -top-1 -left-1 -right-1 -bottom-1 flex items-center justify-center bg-black/50 rounded text-white transition ${
          loading
            ? "scale-100 opacity-100 cursor-wait"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        loading...
      </div>
    </form>
  );
}
