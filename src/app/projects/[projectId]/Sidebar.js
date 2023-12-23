"use client";

import { lamaLogo } from "../../../../public/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const highlighter = "bg-violet-800 text-white hover:text-black";

const Sidebar = ({ projectId = "" }) => {
  const pathname = usePathname();

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex">
        <l1>
          <Link href="/">
            <Image
              alt="Lama Logo"
              width={186}
              height={54}
              src={lamaLogo?.src}
              blurDataURL={lamaLogo?.blurDataURL}
            />
          </Link>
        </l1>
        <div className="flex flex-col justify-between h-full py-6">
          <div className="mb-auto h-full">
            <li>
              <Link
                className={pathname?.includes("files") ? highlighter : ""}
                href={`/projects/${projectId}/files`}
              >
                Files
              </Link>
            </li>
            <li>
              <Link
                className={pathname?.includes("widget") ? highlighter : ""}
                href={`/projects/${projectId}/widget`}
              >
                Widget Configuration
              </Link>
            </li>
          </div>

          <div className="mt-auto">
            <div className="divider"></div>
            <li>
              <Link
                className={pathname?.includes("settings") ? highlighter : ""}
                href={`/projects/${projectId}/settings`}
              >
                Settings
              </Link>
            </li>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
