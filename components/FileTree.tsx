"use client";

import socket from "@/lib/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegFolder, FaFile } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const FileTree = ({ onSelect }: { onSelect: (path: string) => void }) => {
  const [files, setFiles] = useState<Record<string, any>>([]);
  async function getFileTree() {
    const response = await axios.get("http://localhost:9000/files");
    setFiles(response.data);
  }
  useEffect(() => {
    getFileTree();
  }, []);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  return (
    <div>
      <div className="w-full p-3 bg-stone-700 mb-2"></div>
      {files && files.tree && (
        <FileTreeNode onSelect={onSelect} data={files?.tree} />
      )}
    </div>
  );
};

export default FileTree;

interface TreeNode {
  name: string;
  toggled: boolean;
  children: TreeNode[] | null;
}

interface FileTreeProps {
  data: TreeNode;
  onSelect: (path: string) => void;
}

const FileTreeNode: React.FC<FileTreeProps> = ({ data, onSelect }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderTree = (node: TreeNode, path: string) => (
    <div key={node.name} className="pl-[20px] text-white">
      {node.children && node.children.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 px-2 w-full cursor-pointer hover:bg-stone-600">
            <div className="cursor-pointer" onClick={() => toggle(node.name)}>
              {expanded[node.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>{" "}
            <FaRegFolder /> {node.name}
          </div>
          {expanded[node.name] && (
            <div className="border-[1px] border-l-gray-600 border-transparent">
              {node.children.map(
                (child) =>
                  child &&
                  renderTree(
                    child,
                    `${path}${path.length > 0 ? "/" : ""}${node.name}`
                  )
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(`${path}/${node.name}`);
          }}
          className="flex items-center gap-2 py-1 px-2 hover:bg-stone-600 cursor-pointer"
        >
          <FaFile />
          {node.name}
        </div>
      )}
    </div>
  );

  return <div>{renderTree(data, "")}</div>;
};
