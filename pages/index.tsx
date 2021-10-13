import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { ReactElement } from "react";

import BlogPreview from "../components/BlogPreview";
import { POSTS_DIRECTORY } from "../lib/constants";
import { getMeta, PostData } from "../lib/posts";

type PropsWrapper = {
  readonly props: Posts;
};

type Posts = {
  readonly posts: PostData[];
};

export default function Home({ posts }: Posts): ReactElement {
  return (
    <>
      <BlogPreview posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps =
  async (): Promise<PropsWrapper> => {
    const posts: PostData[] = getMeta(POSTS_DIRECTORY);

    for (let i = 0; i < posts.length; i++) {
      posts[i].excerpt = await serialize(posts[i].excerpt as string);
    }

    return {
      props: {
        posts,
      },
    };
  };
