import Markdown from "markdown-to-jsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTheme } from "next-themes";
import path from "path";
import { ReactElement, useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { POSTS_DIRECTORY } from "../../lib/constants";
import { getFileNames, getPost, Post } from "../../lib/posts";

type PropsWrapper = {
  readonly props: Props;
};

type Props = {
  readonly post: Post;
};

export default function Project({ post }: Props): ReactElement {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can render
  //prevents code blocks from being in the wrong darkmode state
  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  return (
    <div className="container py-6 mx-auto divide-y divide-black">
      <h1 className="py-6 text-3xl font-extrabold tracking-tight text-center sm:text-4xl md:text-6xl">
        {post.data.title}
      </h1>
      <div className="flex-col mx-auto prose dark:prose-dark">
        <Markdown
          options={{
            overrides: {
              code({ className, children }) {
                const match = /lang-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={theme == "dark" ? vscDarkPlus : vs}
                    language={match[1]}
                    PreTag="div"
                  >
                    {children + "".replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
            },
          }}
        >
          {post.content}
        </Markdown>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getFileNames(POSTS_DIRECTORY);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<PropsWrapper> => {
  if (params === undefined) {
    throw new Error("Undefined static props in pages/projects/[slug].tsx");
  } else {
    const fullPath: string = path.join(POSTS_DIRECTORY, params.slug as string);
    const postData: Post = getPost(fullPath + ".mdx");
    const props = {
      props: {
        post: {
          ...postData,
        },
      },
    };
    return props;
  }
};
