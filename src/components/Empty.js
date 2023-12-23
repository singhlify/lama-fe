"use client";

import Image from "next/image";
import { emptyCreateNewProject } from "../../public/assets";

export const Empty = () => {
  return (
    <div className="max-w-5xl mx-auto my-8">
      <div className="max-w-xs mx-auto">
        <Image
          alt="Empty Create New Project"
          width={500}
          height={340}
          src={emptyCreateNewProject?.src}
          blurDataURL={emptyCreateNewProject?.blurDataURL}
        />
      </div>

      <p className="text-center text-slate-700 my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit
      </p>
    </div>
  );
};
