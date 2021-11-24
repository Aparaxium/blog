import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement } from "react";

import { PostData } from "../lib/posts";
import CodeBlock from "./CodeBlock";
import Date from "./Date";
import Pagination from "./Pagination";

type Props = {
  posts: PostData[];
  currentPageNumber: number;
  totalPageNumber: number;
  baseUrl: string;
};

const mdxComponents = {
  code: CodeBlock,
};

export default function BlogPreview({
  posts,
  currentPageNumber,
  totalPageNumber,
  baseUrl,
}: Props): ReactElement {
  return (
    <div className="container mx-auto md:w-1/2 w-full p-6">
      <Pagination
        baseUrl={baseUrl}
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPageNumber}
      ></Pagination>
      {posts.map((post: PostData) => (
        <div className="py-6 w-full" key={post.title}>
          <Link href={"/" + post.path + post.slug} passHref replace>
            <h1 className="cursor-pointer text-3xl font-bold">{post.title}</h1>
          </Link>
          <div className="divide-y divide-black dark:divide-white w-full">
            <div className="text-xs text-violet-300 py-1">
              <Date dateString={post.date} />
            </div>
            <div className="prose dark:prose-dark max-w-none py-4">
              <MDXRemote
                {...(post.excerpt as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            </div>
          </div>
          <Link href={"/" + post.path + post.slug} replace>
            <a className="underline text-violet-600">Read more...</a>
          </Link>
        </div>
      ))}
      <Pagination
        baseUrl={baseUrl}
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPageNumber}
      ></Pagination>
    </div>
  );
}
