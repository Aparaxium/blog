import { ReactElement } from "react";

import Footer from "./Footer";
import Navbar from "./NavBar";

type Props = {
  readonly children?: React.ReactNode;
};

//TODO move css to _document to improve performance? (why?)
export default function Layout({ children }: Props): ReactElement {
  return (
    <div>
      <Navbar sticky={false} title={"assert(cat)"} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
