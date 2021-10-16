import { parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import { POSTS_PER_PAGE } from "./constants";

export type Post = {
  readonly data: PostData;
  readonly content: string | MDXRemoteSerializeResult;
};

//TODO find a way to serialize excerpt in index without mutability?
export type PostData = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly imgSrc?: string;
  excerpt?: string | MDXRemoteSerializeResult;
  readonly path?: string;
};

export function getFileNames(directory: string): string[] {
  const fileNames: string[] = fs.readdirSync(directory);
  return fileNames;
}

export function getPost(fullPath: string): Post {
  //const fullPath: string = path.join(directory, `${filename}.mdx`);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post
  //change to json schema to correctly parse dates from yaml
  /*
  Don't use `object` as a type. The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
  Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.
  */
  const matterResult: matter.GrayMatterFile<string> = matter(fileContents, {
    engines: {
      yaml: (s) =>
        yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>,
    },
  });

  //convert matter result to postdata
  const postData: Post = {
    data: matterResult.data as PostData,
    content: matterResult.content,
  };

  return postData;
}

export function getTotalPosts(directory: string): number {
  const fileNames: string[] = fs.readdirSync(directory);
  return fileNames.length;
}

export function getTotalPages(directory: string): number {
  const totalPosts: number = getTotalPosts(directory);
  return totalPosts / POSTS_PER_PAGE;
}

export function getPostData(directory: string, fileName: string) {
  const fullPath: string = path.join(directory, fileName);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  const matterResult: matter.GrayMatterFile<string> = matter(fileContents, {
    engines: {
      yaml: (s) =>
        yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>,
    },
    excerpt: true,
  });

  const splitPath: string[] = fullPath.split(path.sep);
  const urlPath: string = path.join(...splitPath.slice(1, -1)) + "/";

  const postData: PostData = {
    slug: path.parse(fileName).name,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    imgSrc: matterResult.data.imgSrc,
    path: urlPath,
    excerpt: matterResult.excerpt,
  };
  return postData;
}

export function sortPosts(posts: PostData[]) {
  console.log(posts[0].date);
  posts.sort((i, j) => (parseISO(i.date) > parseISO(j.date) ? 1 : -1));
  return posts;
}

async function createPage(postData: PostData[], pageNumber: number) {
  const slicedPostsData = postData.slice(
    POSTS_PER_PAGE * Number(pageNumber),
    POSTS_PER_PAGE * Number(pageNumber) + POSTS_PER_PAGE
  );

  for (let i = 0; i < slicedPostsData.length; i++) {
    slicedPostsData[i].excerpt = await serialize(
      slicedPostsData[i].excerpt as string
    );
  }

  return slicedPostsData;
}

export function getPage(
  directory: string,
  pageNumber: number
): Promise<PostData[]> {
  // Get file names
  const fileNames: string[] = getFileNames(directory);

  //get post data
  const postsData = fileNames.map((fileName) => {
    return getPostData(directory, fileName);
  });

  const sortedPostsData = sortPosts(postsData);

  const page = createPage(sortedPostsData, pageNumber);

  return page;
}
