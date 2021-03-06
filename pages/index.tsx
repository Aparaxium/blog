import { GetStaticProps, GetStaticPropsResult } from "next";
import { ReactElement } from "react";

import BlogPreview from "../components/BlogPreview";
import { POSTS_DIRECTORY } from "../lib/constants";
import { getPage, getTotalPages, PostData } from "../lib/posts";

type Props = {
  posts: PostData[];
  totalPageNumber: number;
};

const BLOG_PAGES_URL = "/blog/page";

export default function Home({ posts, totalPageNumber }: Props): ReactElement {
  return (
    <>
      <BlogPreview
        posts={posts}
        currentPageNumber={0}
        totalPageNumber={totalPageNumber}
        baseUrl={BLOG_PAGES_URL}
      ></BlogPreview>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const posts = await getPage(POSTS_DIRECTORY, 0);
  const totalPageNumber = getTotalPages(POSTS_DIRECTORY);
  return {
    props: {
      posts,
      totalPageNumber,
    },
  };
};
