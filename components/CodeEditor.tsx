"use client";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = () => {
  return (
    <div className="min-w-[70vw] bg-stone-900 min-h-[65.8vh] flex-1">
      <AceEditor width="100%" height="65.8vh" theme="github_dark" />
    </div>
  );
};

export default CodeEditor;
