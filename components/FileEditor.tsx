"use client";

import { useSetRecoilState } from "recoil";
import FileTree from "./FileTree";
import { selectedFileAtom } from "@/store/atoms";
import socket from "@/lib/socket";

const FileEditor = () => {
  const setSelectedFile = useSetRecoilState(selectedFileAtom);
  return (
    <div className="min-h-[65.8vh] max-w-[30vw] min-w-[15vw] resize-x overflow-auto flex-shrink-0 bg-stone-800 border-r-2 border-black">
      <FileTree
        onSelect={(path) => {
          setSelectedFile(path);
          socket.emit("file:selected", path);
        }}
      />
    </div>
  );
};

export default FileEditor;
