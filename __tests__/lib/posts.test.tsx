import { getFileNames } from "../../lib/posts";

test("getFileNames(), Takes this directory and returns a list of file names that includes this file", () => {
  const test = getFileNames("./tests/lib/");
  expect(test.includes("posts.test.tsx"));
});
