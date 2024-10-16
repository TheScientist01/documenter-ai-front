"use client";

import { useState } from "react";
import { DropFolder, Folder } from "./_components";
import JavaFilePreview from "./_components/java-preview";

export default function Home() {
  const [folder, setFolder] = useState<Folder[]>([]);
  const [filePaths, setFilePaths] = useState<any>(null);
  const [folderError, setFolderError] = useState<string>("");

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center justify-center w-full h-full min-h-[calc(100vh*3/4)]">
        <div className="flex flex-col gap-3">
          <h2 className="text-black font-semibold text-[20px]">
            Documenter AI
          </h2>
          <div className="border rounded-lg">
            <DropFolder
              folder={folder}
              folderError={folderError}
              setFolder={setFolder}
              setFolderError={setFolderError}
              setFilePaths={setFilePaths}
            />

            <JavaFilePreview></JavaFilePreview>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
