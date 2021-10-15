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
  readonly page: PageData;
};

//TODO fix typing
export default function Home({ page }: any): ReactElement {
  return (
    <>
      <SWRConfig value={page}>
        <BlogPreview posts={page} />
      </SWRConfig>
    </>
  );
}

export const getStaticProps: GetStaticProps =
  async (): Promise<PropsWrapper> => {
    const page = await getMeta(POSTS_DIRECTORY, 0);
    return {
      props: {
        page,
      },
    };
  };
