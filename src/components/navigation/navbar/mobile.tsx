import React from "react";
import { FaHome } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { LinkButton } from "@/components/ui/Button";

const MobileNavbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-tertiary-1-400 px-4 py-3 md:hidden">
      <div className="flex flex-row items-center justify-around gap-4">
        <LinkButton href="/" variant="secondary" layout="text">
          <FaHome className="h-5 w-5 fill-secondary-400" />
          <span className="sr-only">Home</span>
        </LinkButton>
        <span className="text-xl font-semibold">HRT Stock</span>
        <LinkButton href="/countries" variant="secondary" layout="text">
          <FaFlag className="h-5 w-5 fill-secondary-400" />
          <span className="sr-only">Countries</span>
        </LinkButton>
      </div>
    </div>
  );
};

export default MobileNavbar;
