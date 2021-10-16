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
    <div className="p-4 container mx-auto text-center divide-y divide-black dark:divide-white">
      <h1 className="p-4 mb-5 font-extrabold tracking-tight text-4xl md:text-6xl">
        Projects
      </h1>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 mx-auto">
        {posts.map((d: PostData) => (
          <ImageCard
            key={d.title}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.path + d.slug}
            hover={true}
            gradient={true}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const posts = await getPage(PROJECTS_DIRECTORY);
  return {
    props: {
      posts,
    },
  };
};
