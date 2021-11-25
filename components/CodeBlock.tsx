import { useTheme } from "next-themes";
import { ReactElement, useEffect, useState } from "react";
//TODO use async, need to find out why tree shaking is not working
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  prism,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  className: string;
  children: ReactElement;
};

export default function CodeBlock({
  className,
  children,
}: Props): ReactElement {
  const { theme } = useTheme();
  const match = /language-(\w+)/.exec(className || "");
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can render
  //prevents code blocks from being in the wrong darkmode state
  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  return match ? (
    <SyntaxHighlighter
      style={theme == "dark" ? vscDarkPlus : prism}
      language={match[1]}
      PreTag="div"
    >
      {children + "".replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
}
