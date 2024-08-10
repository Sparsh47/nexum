"use client";

import CodeEditor from "@/components/CodeEditor";
import FileEditor from "@/components/FileEditor";
import Terminal from "@/components/Terminal";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full flex-1">
          <div className="flex items-center">
            <FileEditor />
            <CodeEditor />
          </div>
        </div>
        <div className="w-full flex-1">
          <Terminal />
        </div>
      </div>
    </RecoilRoot>
  );
}
