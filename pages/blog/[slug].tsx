import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { ReactElement } from "react";

import CodeBlock from "../../components/CodeBlock";
import { POSTS_DIRECTORY } from "../../lib/constants";
import { getFileNames, getPost, Post } from "../../lib/posts";

type PropsWrapper = {
  readonly props: Props;
};

type Props = {
  readonly post: Post;
};

const components = {
  code: CodeBlock,
};

export default function Blog({ post }: Props): ReactElement {
  return (
    <div className="py-6 mx-auto divide-y divide-black">
      <h1 className="py-6 text-3xl font-extrabold tracking-tight text-center sm:text-4xl md:text-6xl">
        {post.data.title}
      </h1>
      <div className="flex-col mx-auto prose dark:prose-dark">
        <MDXRemote
          {...(post.content as MDXRemoteSerializeResult)}
          components={components}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = getFileNames(POSTS_DIRECTORY);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: path.parse(fileName).name,
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
}): Promise<PropsWrapper> => {
  if (params === undefined) {
    throw new Error("Undefined static props in pages/projects/[slug].tsx");
  } else {
    const fullPath: string = path.join(
      POSTS_DIRECTORY,
      (params.slug as string) + ".mdx"
    );
    const postData: Post = getPost(fullPath);
    const mdxSource = await serialize(postData.content as string);
    const props = {
      props: {
        post: {
          ...postData,
          content: mdxSource,
        },
      },
    };
    return props;
  }
};
