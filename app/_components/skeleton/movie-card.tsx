import React from "react";

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="relative h-96 w-60 flex-shrink-0 animate-pulse cursor-pointer overflow-hidden rounded-lg bg-gray-300">
      <div className="h-full w-full">
        <div className="h-full w-full rounded-lg bg-gray-400"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-4">
        <div className="mb-2 h-4 w-3/4 rounded bg-gray-400"></div>
        <div className="flex items-center">
          <span className="mr-1 h-4 w-6 rounded bg-gray-400"></span>
          <span className="h-4 w-6 rounded bg-gray-400"></span>
        </div>
        <div className="mt-2 h-4 w-1/2 rounded bg-gray-400"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
