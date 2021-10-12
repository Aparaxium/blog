import { GetStaticProps } from "next";
import { ReactElement } from "react";

import ImageCard from "../components/ImageCard";
import Landing from "../components/Landing";
import Textcard from "../components/TextCard";
import { POSTS_DIRECTORY } from "../lib/constants";
import { getMeta, PostData } from "../lib/posts";

type PropsWrapper = {
  readonly props: Props;
};

type Props = {
  readonly post: PostData[];
};

export default function Home({ post }: Props): ReactElement {
  return (
    <>
      <div className="container grid mx-auto sm:grid-cols-1 md:grid-cols-2">
        {post.map((d: PostData) => (
          <div className="m-6" key={d.title}>
            <ImageCard
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.path + d.slug}
              row={false}
              quality={35}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps =
  async (): Promise<PropsWrapper> => {
    const post: PostData[] = getMeta(POSTS_DIRECTORY);
    return {
      props: {
        post,
      },
    };
  };
