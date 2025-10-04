"use client";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import {
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { getImagePath } from "@/utils/imageToCdn";

export const HamburgerMenu = ({
  scrolled,
}: {
  scrolled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <ResponsivePageContainer>
      <div className="flex custom-md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Open Menu"
        >
          <Bars3Icon
            className={`h-8 w-8 ${scrolled ? "text-primary" : "text-primary"}`}
          />
        </button>
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed flex flex-col w-full inset-0 bg-white z-50 min-h-screen">
            <div className="flex justify-between items-center p-4">
              <Link href="/">
                <Image
                  src={getImagePath("/common/renewLogo.png")}
                  alt="Renew Dental Logo"
                  width={110}
                  height={50}
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
                aria-label="Close Menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="border-[0.5px] border-strokeColour" />
            <nav className="flex flex-col py-4 space-y-4 overflow-y-auto gap-2 h-full bg-white px-4 custom-sm:px-12 z-[999] relative flex-grow">
              <div className="flex flex-col gap-6 space-y-4">
                <div className="text-black font-dmSans font-medium text-medium-l w-full text-left">
                  <Link href="/">Home</Link>
                </div>

                <div className="text-black font-dmSans font-medium text-medium-l w-full text-left">
                  <Link href="/about">About Us</Link>
                </div>

                <div className="text-black font-dmSans font-medium text-text-md-medium w-full text-left">
                  <Link href="/contact">Contact Us</Link>
                </div>
              </div>
            </nav>
          </div>
        </Transition>
      </div>
    </ResponsivePageContainer>
  );
};
