"use client";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import FilePathShow from "./FilePathShow";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";

const CodeEditor = () => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [fileData, setFileData] = useState<{ data: string; path: string }>({
    data: "",
    path: "",
  });

  useEffect(() => {
    socket.on("file:read", (fileData: { data: string; path: string }) => {
      setFileData(fileData);
    });
  }, [socket]);

  function onChange(newData: string) {
    // if (isSaved) {
    socket.emit("file:write", { data: newData, path: fileData.path });
    // }
  }

  return (
    <div className="min-w-[70vw] bg-stone-900 min-h-[65.8vh] flex-1">
      <FilePathShow save={setIsSaved} isSaved={isSaved} />
      <AceEditor
        width="100%"
        fontSize={16}
        className="h-[65.8vh]"
        onChange={onChange}
        theme="tomorrow_night"
        value={fileData.data}
      />
    </div>
  );
};

export default CodeEditor;
