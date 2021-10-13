import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement } from "react";

import { PostData } from "../lib/posts";
import CodeBlock from "./CodeBlock";

type Posts = {
  readonly posts: PostData[];
};

const components = {
  code: CodeBlock,
};

export default function BlogPreview({ posts }: Posts): ReactElement {
  return (
    <>
      {posts.map((post: PostData) => (
        <div className="border-black w-full" key={post.title}>
          <div className="flex-col mx-auto prose dark:prose-dark">
            <Link href={post.path + post.slug} passHref>
              <h2>{post.title}</h2>
            </Link>
            <MDXRemote
              {...(post.excerpt as MDXRemoteSerializeResult)}
              components={components}
            />
          </div>
        </div>
      ))}
    </>
  );
}
