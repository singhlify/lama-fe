"use client";

import Lottie from "lottie-react";
import { loader } from "../../public/assets";

export const Loader = () => {
  return (
    <div className="max-w-xs mx-auto my-8">
      <Lottie animationData={loader} loop={true} />
    </div>
  );
};
