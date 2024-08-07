/** @jsxImportSource react */
import type { JSX } from "react";

import { qwikify$ } from "@builder.io/qwik-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import { useCallback, useState } from "react";

const navUrls = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "News",
    url: "/news/",
  },
  {
    name: "Calendar",
    url: "/calendar/",
  },
  {
    name: "Files",
    url: "/files/",
  },
  {
    name: "Trustees",
    url: "/trustees/",
  },
];

type NavigationProperties = {
  readonly imagesAmount: number;
  readonly pathName: string;
};

function RNavigation({
  imagesAmount,
  pathName,
}: NavigationProperties): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MIN_IMAGES = 1;

  const toggleIsOpen = useCallback((isOpen: boolean): void => {
    setIsMenuOpen(isOpen);
  }, []);

  return (
    <Navbar
      className="mx-auto max-w-7xl rounded-lg bg-white shadow-md shadow-sky-50"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={toggleIsOpen}
    >
      <NavbarContent className="pl-0">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
        />
        <NavbarBrand>
          {}
          <h1 className="m-2 border-b-2 border-sky-700 text-sm font-bold text-sky-700 sm:text-2xl">
            Sterett Creek Village Trustee
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 md:flex md:flex-wrap">
        {navUrls.map((item) => {
          return (
            <NavbarItem
              className="text-sky-700"
              isActive={pathName === item.url}
              key={item.name}
            >
              <Link href={item.url}>{item.name}</Link>
            </NavbarItem>
          );
        })}
        {imagesAmount >= MIN_IMAGES && (
          <NavbarItem
            className="text-sky-700"
            isActive={"/gallery" === pathName}
            key="gallery"
          >
            <Link href="/gallery">Pictures</Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="mt-4 rounded-lg">
        {navUrls.map((item) => {
          return (
            <NavbarItem
              className="text-sky-700"
              isActive={pathName === item.url}
              key={item.name}
            >
              <Link href={item.url}>{item.name}</Link>
            </NavbarItem>
          );
        })}
        {imagesAmount >= MIN_IMAGES && (
          <NavbarItem
            className="text-sky-700"
            isActive={"/gallery" === pathName}
            key="gallery"
          >
            <Link href="/gallery">Pictures</Link>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}

export const Navigation = qwikify$(RNavigation, { eagerness: "load" });
