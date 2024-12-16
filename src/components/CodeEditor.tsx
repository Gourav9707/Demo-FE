import React, { HTMLAttributes, PropsWithChildren } from "react";
import CodeMirror from '@uiw/react-codemirror';

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    code?: string;
    handleChange?: (value: string) => void;
  }
>;

const CodeEditor = ({ code, handleChange }: Props) => {
  return (
    <CodeMirror
      value={code}
      onChange={handleChange}
      height="340px"
      theme="dark"
    />
  );
};

export default CodeEditor;
