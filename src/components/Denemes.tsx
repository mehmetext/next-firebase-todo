export default function Denemes({ denemes }: { denemes: IDeneme[] }) {
  return (
    <div className="flex flex-col gap-2">
      {denemes.map((deneme) => (
        <div
          key={deneme.id}
          className="flex justify-between gap-4 bg-blue-500 rounded p-2 text-white"
        >
          <p className="font-medium">
            {deneme.text}{" "}
            <span className="text-xs text-white/50">({deneme.id})</span>
          </p>
          <span>
            {deneme.createdAt?.toLocaleTimeString("tr-TR", {
              timeStyle: "short",
            })}{" "}
            -{" "}
            {deneme.createdAt?.toLocaleDateString("tr-TR", {
              dateStyle: "long",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
