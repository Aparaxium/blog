import Link from "next/link";

type Props = {
  currentPageNumber: number;
  maxPageNumber: number;
  baseUrl: string;
};

export default function Pagination({
  currentPageNumber,
  maxPageNumber,
  baseUrl,
}: Props) {
  return (
    <div className="flex flex-row ">
      <Link href={baseUrl + "/" + `${currentPageNumber - 1}`} passHref>
        <button className={`${currentPageNumber === 0 ? "hidden" : ""}`}>
          Previous
        </button>
      </Link>
      <Link href={baseUrl + "/" + `${currentPageNumber + 1}`} passHref>
        <button
          className={`w-full flex justify-end ${
            currentPageNumber === maxPageNumber - 1 ? "hidden" : ""
          }`}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
