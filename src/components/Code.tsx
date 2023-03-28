"use client";

import { FC, useEffect, useState } from "react";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import darkTheme from "prism-react-renderer/themes/nightOwl";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}
const Code: FC<CodeProps> = ({ code, show, language, animationDelay, animated }) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [animated, animationDelay, code, show]);

  // number of lines
  const lines = text.split(/\r\n|\r|\n/);

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, style, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-auto lg:w-fit lg:min-w-full bg-transparent duration-100 py-0 no-scrollbar border border-slate-200 dark:border-slate-700 rounded-md p-8 mt-4 overflow-x-auto"
          }
          style={{ ...style, paddingTop: 32, paddingBottom: 32 }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });
            return (
              <div key={"lines-" + i} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...restToken } = getTokenProps({ token, key: i });
                  return <span key={index} {...restToken} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
