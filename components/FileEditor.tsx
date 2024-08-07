import FileTree from "./FileTree";

const FileEditor = () => {
  return (
    <div className="min-h-[65.8vh] max-w-[30vw] min-w-[15vw] resize-x overflow-auto flex-shrink-0 bg-stone-800 border-r-2 border-black">
      <FileTree />
    </div>
  );
};

export default FileEditor;
