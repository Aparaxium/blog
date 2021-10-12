import { footerLinks } from "../lib/constants";
import { ReactElement } from "react";

export default function Footer(): ReactElement {
  const components = footerLinks.map((site) => {
    const IconComponent = site.icon;
    return (
      <a key={site.href} href={site.href}>
        <IconComponent />
      </a>
    );
  });
  return (
    <footer>
      <div className="z-50 flex items-center justify-center space-x-8 h-14 ">
        {components}
      </div>
    </footer>
  );
}
