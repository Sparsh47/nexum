import { selectedFileAtom } from "@/store/atoms";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

const FilePathShow = ({
  isSaved,
  save,
}: {
  isSaved: boolean;
  save: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedFile = useRecoilValue(selectedFileAtom);
  return (
    <div className="flex items-center justify-between px-5">
      {selectedFile.length > 0 && (
        <p className="text-white">
          {selectedFile
            ? selectedFile.split("/").filter(Boolean).join("\t\t►\t\t")
            : ""}
          {isSaved ? null : "*"}
        </p>
      )}
      {/* {isSaved ? null : (
        <button
          onClick={() => save(true)}
          className="p-2 bg-stone-900 text-white"
        >
          Save
        </button>
      )} */}
    </div>
  );
};

export default FilePathShow;
