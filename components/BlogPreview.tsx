import Link from "next/link";
import { useRouter } from "next/router";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";

import { PostData } from "../lib/posts";
import CodeBlock from "./CodeBlock";
import Date from "./Date";

const components = {
  code: CodeBlock,
};

export default function BlogPreview(): ReactElement {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((response) => response.json());

  // The API URL includes the page index, which is a React state.
  const { data } = useSWR(`/api/blog/${pageIndex}`, fetcher);
  if (!data) return <div>loading...</div>;

  console.log(pageIndex, data);

  useEffect(() => {
    if (router.isReady && router.query.page) {
      setPageIndex(Number(router.query.page));
    }
  }, []);

  return (
    <div className="container mx-auto w-1/3">
      {data.posts.map((post: PostData) => (
        <div className="py-6" key={post.title}>
          <Link href={post.path + post.slug} passHref>
            <h1 className="cursor-pointer text-3xl font-bold">{post.title}</h1>
          </Link>
          <div className="divide-y divide-black dark:divide-white">
            <div className="text-xs text-violet-300 py-1">
              <Date dateString={post.date} />
            </div>
            <div className="prose dark:prose-dark py-4">
              <MDXRemote
                {...(post.excerpt as MDXRemoteSerializeResult)}
                components={components}
              />
            </div>
          </div>
          <Link href={post.path + post.slug}>
            <a className="underline text-violet-600">Read more...</a>
          </Link>
        </div>
      ))}

      <div className="flex flex-row">
        <button
          className={`${pageIndex === 0 ? "hidden" : ""}`}
          onClick={() => {
            setPageIndex(pageIndex - 1);
            router.push("?page=" + (pageIndex - 1), undefined, {
              shallow: true,
            });
          }}
        >
          Previous
        </button>
        <button
          className={`w-full flex justify-end ${
            pageIndex === data.maxPages - 1 ? "hidden" : ""
          }`}
          onClick={() => {
            setPageIndex(pageIndex + 1);
            router.push("?page=" + (pageIndex + 1), undefined, {
              shallow: true,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
