"use client";

import { useState } from "react";
import { DropFolder, Folder } from "./_components";

export default function Home() {
  const [folder, setFolder] = useState<Folder[]>([]);
  const [filePaths, setFilePaths] = useState<any>(null);
  const [folderError, setFolderError] = useState<string>("");

  return (
    <div className="grid items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-gray-200 w-full h-full">
        <DropFolder
          folder={folder}
          folderError={folderError}
          setFolder={setFolder}
          setFolderError={setFolderError}
          setFilePaths={setFilePaths}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
