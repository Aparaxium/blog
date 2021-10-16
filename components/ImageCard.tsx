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
  quality = 90,
}: Props): ReactElement {
  return (
    <ul
      className={`w-full p-4
      ${hover ? "transform transition-all hover:-translate-y-1" : ""} `}
    >
      <Link href={href} passHref>
        <a className="flex flex-col h-64 relative cursor-pointer ">
          <div className=" h-full">
            <Image
              title={title}
              alt={title}
              className="absolute"
              src={imgSrc}
              layout="fill"
              objectFit="cover"
              quality={quality}
            />
            <div
              className={`${
                gradient ? "h-full bg-gradient-to-t from-black relative" : ""
              }`}
            />
          </div>
          <div className=" flex flex-col w-full h-full absolute justify-end divide-y divide-white text-gray-100">
            <h3 className="items-center p-2 text-4xl font-bold text-center ">
              {title}
            </h3>
            <p className="p-2 text-center truncate">{description}</p>
          </div>
        </a>
      </Link>
    </ul>
  );
}
