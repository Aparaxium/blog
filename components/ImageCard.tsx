import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

import { DEFAULT_IMAGE } from "../lib/constants";

type Props = {
  readonly title: string;
  readonly description: string;
  readonly imgSrc?: string;
  readonly href?: string;
  readonly gradient?: boolean;
  readonly hover?: boolean;
  readonly row?: boolean;
  readonly quality?: number;
};

export default function ImageCard({
  title,
  description,
  imgSrc = DEFAULT_IMAGE,
  href = "/",
  gradient,
  hover,
  row,
  quality = 90,
}: Props): ReactElement {
  return (
    <ul>
      <div
        className={`flex h-72 ${row ? "flex-row " : "flex-col"} ${
          hover ? "transform transition-all hover:-translate-y-1" : ""
        }`}
      >
        <Link href={href} passHref>
          <div
            className={`relative cursor-pointer h-full ${row ? "w-1/2" : ""}`}
          >
            <Image
              title={title}
              alt={title}
              className="absolute"
              src={imgSrc}
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              quality={quality}
            />
            <div
              className={`${
                gradient ? "h-full bg-gradient-to-t from-black relative" : ""
              }`}
            />
          </div>
        </Link>
        <div
          className={`flex flex-col justify-center ml-4 divide-y divide-black dark:divide-white ${
            row ? "w-1/2" : ""
          }`}
        >
          <Link href={href} passHref>
            <a className="items-center m-4 text-4xl font-bold text-center cursor-pointer ">
              {title}
            </a>
          </Link>
          <p className="p-6 text-center">{description}</p>
        </div>
      </div>
    </ul>
  );
}
