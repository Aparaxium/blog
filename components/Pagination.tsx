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
    <div className="flex flex-row w-full">
      <div className="w-1/2">
        <Link href={baseUrl + "/" + `${currentPageNumber - 1}`} passHref>
          <button className={`${currentPageNumber === 0 ? "hidden" : ""}`}>
            Previous
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-end ">
        <Link href={baseUrl + "/" + `${currentPageNumber + 1}`} passHref>
          <button
            className={`${
              currentPageNumber === maxPageNumber - 1 ? "hidden" : ""
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
