import type { NextApiRequest, NextApiResponse } from "next";

import { POSTS_DIRECTORY } from "../../../lib/constants";
import { getPage } from "../../../lib/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { page },
  } = req;

  const posts = await getPage(POSTS_DIRECTORY, Number(page));

  res.status(200).json(posts);
}
