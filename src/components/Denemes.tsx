import Deneme from "./Deneme";

export default function Denemes({ denemes }: { denemes: IDeneme[] }) {
  return (
    <div className="relative flex flex-col gap-2">
      {denemes.map((deneme, i) => (
        <Deneme key={deneme.id} deneme={deneme} isOdd={i % 2 == 0} />
      ))}
      {/*  <div
        className={`absolute -top-1 -left-1 -right-1 -bottom-1 flex p-3 justify-center bg-black/50 rounded text-white transition ${
          loading
            ? "scale-100 opacity-100 cursor-wait"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        loading...
      </div> */}
    </div>
  );
}
