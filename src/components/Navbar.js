"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { lamaLogo } from "../../public/assets";
import { useEffect } from "react";
import axios from "axios";
import { useLogout } from "@/apis";
import { showToast } from "@/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response?.success) {
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        delete axios.defaults.headers.common["Authorization"];
        router.replace("/");
        showToast({ type: "success", message: response?.message });
      } else {
        showToast({ type: "error", message: response?.message });
      }
    } catch (error) {
      showToast({ type: "error", message: error?.message });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.defaults.headers.common["Authorization"] = userId;
    } else {
      router.replace("/");
    }
  }, []);

  if (pathname !== "/" && pathname !== "/projects") {
    return null;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <Image
            alt="Lama Logo"
            width={186}
            height={54}
            src={lamaLogo?.src}
            blurDataURL={lamaLogo?.blurDataURL}
          />
        </Link>
      </div>

      {pathname?.includes("projects") && (
        <div className="flex-none">
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
