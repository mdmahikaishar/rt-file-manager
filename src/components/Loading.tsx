export default function Loading({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 aspect-square border-b-4 border-b-white rounded-full animate-spin"></div>
        <p className="text-2xl font-semibold text-slate-500">{text}</p>
      </div>
    </div>
  );
}
