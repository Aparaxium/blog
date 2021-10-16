import { GetStaticProps, GetStaticPropsResult } from "next";
import { ReactElement } from "react";

import ImageCard from "../components/ImageCard";
import { PROJECTS_DIRECTORY } from "../lib/constants";
import { getPage, PostData } from "../lib/posts";

type Props = {
  readonly posts: PostData[];
};

export default function Projects({ posts }: Props): ReactElement {
  return (
    <div className="py-6 mx-auto text-center divide-y divide-black">
      <h1 className="py-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
        What We Have Done.
      </h1>
      <div className="flex flex-col mx-auto">
        {posts.map((d: PostData) => (
          <ImageCard
            key={d.title}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.path + d.slug}
            row={false}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const posts = await getPage(PROJECTS_DIRECTORY, 0);
  return {
    props: {
      posts,
    },
  };
};
