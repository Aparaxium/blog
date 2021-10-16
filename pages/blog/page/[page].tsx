import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import path from "path";
import { ReactElement } from "react";

import BlogPreview from "../../../components/BlogPreview";
import { POSTS_DIRECTORY } from "../../../lib/constants";
import { getPage, getTotalPages, PostData } from "../../../lib/posts";

type Props = {
  posts: PostData[];
  currentPageNumber: number;
  maxPageNumber: number;
};

export default function Blog({
  posts,
  currentPageNumber,
  maxPageNumber,
}: Props): ReactElement {
  const router = useRouter();
  const thisDir = path.dirname(router.pathname);
  return (
    <>
      <BlogPreview
        baseUrl={thisDir}
        posts={posts}
        currentPageNumber={currentPageNumber}
        maxPageNumber={maxPageNumber}
      ></BlogPreview>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getTotalPages(POSTS_DIRECTORY);
  const li = [];

  for (let i = 0; i < pages; i++) {
    li.push(i);
  }
  const paths = li.map((page) => {
    return {
      params: {
        page: page.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<Props>> => {
  if (params === undefined) {
    throw new Error("Undefined static props in pages/blog/page/[page].tsx");
  }
  const posts = await getPage(POSTS_DIRECTORY, Number(params.page));
  const currentPageNumber = Number(params.page);
  const maxPageNumber = getTotalPages(POSTS_DIRECTORY);
  return {
    props: {
      posts,
      currentPageNumber,
      maxPageNumber,
    },
  };
};
