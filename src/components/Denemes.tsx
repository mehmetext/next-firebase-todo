export default function Denemes({ denemes }: { denemes: IDeneme[] }) {
  return (
    <div className="flex flex-col gap-2">
      {denemes.map((deneme, i) => (
        <div
          key={deneme.id}
          className={`flex items-start justify-between gap-4 rounded-3xl pl-3 p-2 text-white ${
            i % 2 == 0 ? "bg-blue-500" : "bg-blue-700"
          }`}
        >
          <p className="font-medium">{deneme.text}</p>
          <span className="shrink-0 bg-black/20 text-xs py-1 px-2 rounded-full">
            {deneme.createdAt?.toLocaleTimeString("tr-TR", {
              timeStyle: "short",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
