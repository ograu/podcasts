export function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-col mb-4">
      <h1 className="text-[#4886ab] text-[16px] font-semibold mb-1 text-left">
        {title}
      </h1>
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  )
}
