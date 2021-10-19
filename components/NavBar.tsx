import { IconMenu } from "@tabler/icons";
import Link from "next/link";
import { ReactElement, useState } from "react";

import ThemeToggle from "./ThemeToggle";

type Props = {
  readonly sticky?: boolean;
  readonly title: string;
};

const headerNavLinks = [
  { href: "/", title: "Home" },
  { href: "/projects", title: "Projects" },
];

export default function NavBar({ sticky, title }: Props): ReactElement {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav
      className={`flex items-center flex-wrap w-full z-50 ${
        sticky ? "sticky z-50" : ""
      }`}
    >
      <Link href="/">
        <a className="pl-4 text-xl font-bold">{title}</a>
      </Link>
      <button
        onClick={handleClick}
        className="inline-flex p-3 ml-auto  lg:hidden"
      >
        <IconMenu />
      </button>
      <div
        className={`${
          active ? "" : "hidden"
        } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="flex flex-row w-full justify-center lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto">
          <div className="py-2 mx-3">
            <ThemeToggle />
          </div>
          {headerNavLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="py-2 mx-3 font-bold">{link.title}</a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
