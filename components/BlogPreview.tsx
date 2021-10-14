import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement } from "react";

import { PostData } from "../lib/posts";
import CodeBlock from "./CodeBlock";
import Date from "./Date";

type Posts = {
  readonly posts: PostData[];
};

const components = {
  code: CodeBlock,
};

export default function BlogPreview({ posts }: Posts): ReactElement {
  return (
    <div className="container mx-auto w-1/3 divide-y divide-black dark:divide-white">
      {posts.map((post: PostData) => (
        <div className="py-4" key={post.title}>
          <Link href={post.path + post.slug} passHref>
            <h1 className="cursor-pointer text-3xl font-bold">{post.title}</h1>
          </Link>
          <div className="text-xs text-violet-300 pt-1">
            <Date dateString={post.date} />
          </div>
          <div className="prose dark:prose-dark py-4">
            <MDXRemote
              {...(post.excerpt as MDXRemoteSerializeResult)}
              components={components}
            />
          </div>
          <Link href={post.path + post.slug}>
            <a className="underline">Read more...</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
