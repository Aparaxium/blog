import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import BlogPreview from "../components/BlogPreview";
import { POSTS_DIRECTORY } from "../lib/constants";
import { getMeta, PageData } from "../lib/posts";

type PropsWrapper = {
  readonly props: Posts;
};

type Posts = {
  readonly posts: PageData;
};

//TODO fix typing
export default function Home({ posts }: any): ReactElement {
  return (
    <>
      <SWRConfig value={posts}>
        <BlogPreview />
      </SWRConfig>
    </>
  );
}

export const getStaticProps: GetStaticProps =
  async (): Promise<PropsWrapper> => {
    const posts = await getMeta(POSTS_DIRECTORY, 0);
    return {
      props: {
        posts,
      },
    };
  };
