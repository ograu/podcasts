import { Link } from 'react-router-dom'

export const Header = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col mb-4 relative">
    <div className="flex justify-between">
      <h1 className="text-[#4886ab] text-[16px] font-semibold mb-1 text-left">
        <Link
          to="/"
          className="hover:underline"
        >
          Podcaster
        </Link>
      </h1>
      <div className="ml-2">
        {isLoading ? (
          <span
            className="inline-block w-3 h-3 rounded-full bg-[#4886ab] animate-pulse"
            aria-label="Loading"
          />
        ) : null}
      </div>
    </div>
    <div className="w-full h-0.5 bg-gray-200" />
  </div>
)
