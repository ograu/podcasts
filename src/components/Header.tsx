import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="flex flex-col mb-4">
      <h1 className="text-[#4886ab] text-[16px] font-semibold mb-1 text-left">
        <Link
          to="/"
          className="hover:underline"
        >
          Podcaster
        </Link>
      </h1>
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  )
}
