import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import path from "path";

export type Post = {
  data: PostData;
  readonly content: string;
};

export type PostData = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly imgSrc: string;
  readonly path: string;
};

type Params = {
  params: {
    slug: string;
  };
};

//currently gets filename as slug
export function getFileNames(directory: string): Params[] {
  const fileNames: string[] = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        //remove extension
        slug: path.parse(fileName).name,
      },
    };
  });
}

/*
export async function markdownToHtml(markdown: string): Promise<string> {
  const processedMarkdown = await remark().use(remarkHtml).process(markdown);
  return processedMarkdown.toString();
}
*/

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

  matterResult.data.slug = fullPath;

  //convert matter result to postdata
  const postData: Post = {
    data: matterResult.data as PostData,
    content: matterResult.content,
  };

  return postData;
}

export function getMeta(directory: string): PostData[] {
  // Get file names
  const fileNames: string[] = fs.readdirSync(directory);

  //get post data
  const allPostsData = fileNames.map((fileName) => {
    const fullPath: string = path.join(directory, fileName);
    const fileContents: string = fs.readFileSync(fullPath, "utf8");
    const matterResult: matter.GrayMatterFile<string> = matter(fileContents, {
      engines: {
        yaml: (s) =>
          yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>,
      },
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
    };
    return postData;
  });

  return allPostsData;
}
