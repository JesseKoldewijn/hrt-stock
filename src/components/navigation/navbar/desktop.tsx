import React from "react";
import { LinkButton } from "@/components/ui/Button";

const DesktopNavbar = () => {
  return (
    <div className="fixed inset-x-4 top-4 z-50 hidden md:block">
      <div className="flex flex-row items-center justify-between gap-4">
        <LinkButton href="/" variant="tertiary" layout="text">
          <span className="text-xl font-semibold">HRT Stock</span>
        </LinkButton>

        <div className="flex flex-row items-center justify-between gap-4">
          <LinkButton href="/countries" variant="tertiary" layout="text">
            Countries
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
