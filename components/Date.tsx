import { formatISO,parseISO } from "date-fns";
import { ReactElement } from "react";

type Props = {
  dateString: string;
};

export default function Date({ dateString }: Props): ReactElement {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {formatISO(date, { representation: "date" })}
    </time>
  );
}
