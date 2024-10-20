"use client";

import { useRef, useState } from "react";
import { FileTrigger } from "react-aria-components";
import { Button, Card, CardBody } from "@/ui";
import { FileIcon, FolderClose, FolderOpen, RemoveIcon } from "@/assets/icons";
import { useDropzone } from "react-dropzone";
import { fromEvent } from "file-selector";
import { tv } from "tailwind-variants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const fieldStyles = tv({
  slots: {
    base: "relative flex flex-col text-snow",
    labelStyles: "ml-[7px] cursor-default text-silver block",
    descriptionStyles: "ml-[7px] block",
    errorMessageStyles: "ml-[7px] text-fuzzy block",
  },
  variants: {
    size: {
      xs: {
        base: "gap-y-[4px]",
        labelStyles: "text-[12px] leading-[18px]",
        descriptionStyles: "text-[12px] leading-[18px]",
        errorMessageStyles: "text-[12px] leading-[18px]",
      },
      sm: {
        base: "gap-y-[4px]",
        labelStyles: "text-[12px] leading-[18px]",
        descriptionStyles: "text-[12px] leading-[18px]",
        errorMessageStyles: "text-[12px] leading-[18px]",
      },
      md: {
        base: "gap-y-[4px]",
        labelStyles: "text-[12px] leading-[19px]",
        descriptionStyles: "text-[12px] leading-[19px]",
        errorMessageStyles: "text-[12px] leading-[19px]",
      },
      lg: {
        base: "gap-y-[7px]",
        labelStyles: "text-[16px] leading-[26px] font-bold",
        descriptionStyles: "text-[12px] leading-[12px]",
        errorMessageStyles: "text-[12px] leading-[12px]",
      },
    },
  },
});

export interface Folder {
  name: string;
  kind: "directory" | "file";
  path: string;
  content?: string;
  isOpen?: boolean;
  isMonaco?: boolean;
  children?: Folder[];
}

export function DropFolder({
  folder,
  folderError,
  activeFile,
  setFolder,
  setFolderError,
  setFilePaths,
  setDeletedPath,
  handleFileClick
}: {
  folder: Folder[];
  folderError: string;
  activeFile: string;
  setFolder: (folder: Folder[]) => void;
  setFolderError: (error: string) => void;
  setFilePaths: (filePaths: any) => void;
  setDeletedPath?: (paths: any) => void;
  handleFileClick: (path: string) => void
}) {
  const [rootFolderName, setRootFolderName] = useState<string>("");
  const [selectedFileContent, setSelectedFileContent] = useState<string>("");
  const [dragEnter, setDragEnter] = useState<boolean>(false);

  function folderSizeValidator(fileList: File[]): boolean {
    // in Bytes
    let size: number = 0;

    fileList?.forEach((file: File) => (size += file.size));

    // in Megabyte
    return size / 1024 ** 2 < 512;
  }

  function sortFolder(folders: Folder[]): Folder[] {
    folders.sort((a, b) => {
      if (a.kind === "directory" && b.kind === "file") {
        return -1; // Folders come before files
      } else if (a.kind === "file" && b.kind === "directory") {
        return 1; // Files come after folders
      } else {
        // return 0; // Maintain the original order for items of the same kind
        return a.name.localeCompare(b.name);
      }
    });

    // Map and recursively sort children
    return folders.map((folder, index, array) => {
      const existingNames = array.slice(0, index).map((item) => item.name); // Get names of previous folders
      let newName = folder.name; // Default to existing name

      // If the name already exists, append a number to make it unique
      let counter = 1;
      while (existingNames.includes(newName)) {
        newName = `${folder.name} (${counter})`;
        counter++;
      }

      return {
        ...folder,
        name: newName,
        children: folder?.children ? sortFolder(folder.children) : [], // Recursively sort children
      };
    });
  }

  function filterIgnoredFolders(gitignoreContent: string): string[] {
    const ignoredFolders: string[] = [];

    const lines = gitignoreContent.split("\n");
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        ignoredFolders.push(trimmedLine);
      }
    });

    return ignoredFolders;
  }

  function filterStringByGitignoreRules(
    str: string,
    gitignoreRules: string[]
  ): string | null {
    // Convert gitignore rules to regular expressions
    const patterns = gitignoreRules.map((rule) => {
      // Escape special characters in rule and convert it to a regex pattern
      const regexPattern = rule
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
      return new RegExp(regexPattern);
    });

    // Check if the string matches any of the patterns
    for (const pattern of patterns) {
      if (pattern.test(str)) {
        return null; // String matches a gitignore rule, so filter it out
      }
    }
    // String does not match any gitignore rules, so keep it
    return str;
  }

  function convertToFolderStructure(filePaths: any[]): Folder[] {
    const rootFolder: Folder = {
      name: "",
      kind: "directory",
      children: [],
      isOpen: false,
      isMonaco: false,
      path: "",
    };

    for (const filePath of filePaths) {
      const path: string =
        filePath?.path?.slice(1) || filePath.webkitRelativePath;

      const parts: string[] = path.split("/");
      let currentFolder: Folder = rootFolder;

      for (let i = 0; i < parts.length - 1; i++) {
        const folderName: string = parts[i];

        let folder: Folder | undefined = currentFolder.children?.find(
          (child) => child.name === folderName && child.kind === "directory"
        );

        if (!folder) {
          folder = {
            name: folderName,
            kind: "directory",
            children: [],
            isOpen: false,
            isMonaco: false,
            path: path.split("/").slice(0, -1).join("/"),
          };
          if (currentFolder.children) {
            currentFolder.children.push(folder);
          } else {
            currentFolder.children = [folder];
          }
        }

        currentFolder = folder;
      }

      const fileName: string = parts[parts.length - 1];

      if (currentFolder.children) {
        currentFolder.children.push({
          name: fileName,
          kind: "file",
          content: filePath.content,
          path: path || filePath.path,
        });
      } else {
        currentFolder.children = [
          {
            name: fileName,
            kind: "file",
            content: filePath.content,
            path: path || filePath.path,
          },
        ];
      }
    }

    if (rootFolder.children && rootFolder.children.length === 1) {
      return rootFolder.children;
    }

    return [rootFolder];
  }

  const openFolder = async (filePaths: any[]) => {
    setFilePaths(filePaths);

    const showFile = async (file: any, callback: (e: any) => void) => {
      const reader = new FileReader();
      reader.onload = callback;
      reader.onerror = (e) => {
        console.log(e);
      };
      reader.onabort = (e) => {
        console.log(e);
      };
      reader.readAsText(file);
    };

    const getFiles = async (files: any[]) => {
      const promises = [];

      for (let i = 0; i < filePaths.length; i++) {
        const file = filePaths[i];
        const key = i;
        if (file.kind !== "directory" && file.name.includes(".py")) {
          promises.push(
            new Promise<void>(async (resolve) => {
              await showFile(file, (e) => {
                files[key] = Object.assign(filePaths[key], {
                  content: e?.target?.result,
                });
                resolve();
              });
            })
          );
        }

        files[key] = filePaths[key];
      }

      await Promise.all(promises);
    };

    const ignoreFiles = async (text: string) => {
      const ignoreRules = filterIgnoredFolders(text as unknown as string);
      const newFilePaths = filePaths.filter(
        (file) =>
          filterStringByGitignoreRules(
            file.webkitRelativePath.split("/").slice(1).join("/"),
            ignoreRules
          ) !== null
      );

      if (folderSizeValidator(newFilePaths)) {
        const folderStructure = convertToFolderStructure(newFilePaths);

        setRootFolderName(folderStructure[0].name);

        setFolder(sortFolder(folderStructure[0]?.children as Folder[]));
      } else {
        setFolderError("Project size can't be bigger than 512Mb");
      }
    };

    const ignoreFile = filePaths.find((file) => file.name === ".gitignore");

    if (ignoreFile) {
      await showFile(ignoreFile, (e) => ignoreFiles(e?.target?.result));
    } else {
      if (folderSizeValidator(filePaths)) {
        // let files: any[] = [];
        // await getFiles(files);
        setFolderError("");
        setRootFolderName(filePaths[0].name);

        setFolder(
          sortFolder([
            ...filePaths.map((file: any) => ({
              name: file.name,
              kind: "file" as "file",
              path: file.webkitRelativePath,
            })),
          ])
        );
      } else {
        setFolderError("Project size can't be bigger than 512Mb");
      }
    }
  };

  function FolderComponent({
    folder,
    folders,
    setFolder,
    indentLevel,
    setPreviewFile,
  }: {
    folder: Folder;
    folders: Folder[];
    setFolder: (folder: any) => void;
    indentLevel: number;
    setPreviewFile?: (e: any) => void;
  }) {
    const handleRemoveFile = (file: Folder) => {
      function deleteFolder(folders: Folder[]): Folder[] {
        return folders
          ? folders.filter((child) => {
            if (child.path === file.path) {
              // Found the target folder, exclude it from the result
              return false;
            } else if (child.children) {
              // Recursively filter children
              child.children = deleteFolder(child.children);
            }
            return true;
          })
          : folders;
      }

      setDeletedPath && setDeletedPath(file.path);

      const updatedFolders = deleteFolder([...folders]);

      const sanitizedFolderPath = file.path.replace(/^\/|\/$/g, "");

      const regex = new RegExp(`^/${sanitizedFolderPath}(/|$)`);

      setFilePaths((prev: any[]) =>
        !prev
          ? prev
          : prev.filter(
            (element) =>
              !regex.test(
                "/" +
                (element.path
                  ? element.path.split("/").slice(2).join("/")
                  : element.name)
              )
          )
      );

      setFolder(updatedFolders);
    };

    return (
      <div className="w-full select-none">
        {folder.kind === "directory" ? (
          <Accordion
            file={folder}
            files={folder.children}
            folders={folders}
            indentLevel={indentLevel}
            setFolder={setFolder}
            handleRemoveFile={handleRemoveFile}
            setPreviewFile={setPreviewFile}
          />
        ) : (
          <div
            className={`flex h-11 w-full items-center justify-between border-b border-tuna pr-5 hover:bg-tuna [&>div]:hover:!opacity-100 ${activeFile === folder.path && "bg-[#0058C1] bg-opacity-50"}`}
            style={{ paddingLeft: `${indentLevel * 20 + 20}px` }}
            onClick={() => setPreviewFile && setPreviewFile(folder.path)}
          >
            <div className="flex items-center gap-0.5">
              <FileIcon />
              <div className="select-none" key={Math.random()}>
                {folder?.name}
              </div>
            </div>
            <div
              onClick={() => handleRemoveFile(folder)}
              className="h-4 cursor-pointer opacity-0 hover:scale-[115%]"
            >
              <RemoveIcon />
            </div>
          </div>
        )}
      </div>
    );
  }

  const Accordion = ({
    file,
    files,
    folders,
    indentLevel,
    setFolder,
    handleRemoveFile,
    setPreviewFile,
  }: {
    file: Folder;
    files: any;
    folders: Folder[];
    indentLevel: number;
    setFolder: (folder: any) => void;
    handleRemoveFile: (file: Folder) => void;
    setPreviewFile?: (e: any) => void;
  }) => {
    const editorRef = useRef<any>(null);
    const tabs = files
      .filter((folder: any) => folder.kind === "file")
      .map((folder: any) => ({
        tabName: folder?.name,
        uri: "uri" + folder?.name,
        value: folder?.content || "",
        language: "python",
      }));

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    // Don't remove this function!
    function handleCode(e: any) {
      e.stopPropagation();
      e.preventDefault();

      editorRef.current = null;

      function findAndOpenFolderAndUpdate(): Folder[] {
        function searchAndUpdate(folders: Folder[]): Folder[] {
          return folders.map((folder) => {
            if (folder.path === file.path) {
              return { ...folder, isMonaco: !file.isMonaco };
            } else if (folder.children) {
              return { ...folder, children: searchAndUpdate(folder.children) };
            }
            return folder;
          });
        }

        return searchAndUpdate(folders);
      }

      setFolder(findAndOpenFolderAndUpdate());
    }

    const handleSwitch = () => {
      function findAndOpenFolderAndUpdate(): Folder[] {
        function updateDescendants(
          children: Folder[],
          isOpen: boolean
        ): Folder[] {
          return children.map((child) => {
            const updatedChild: Folder = { ...child, isOpen };
            if (updatedChild.children) {
              // Recursively update descendants
              updatedChild.children = updateDescendants(
                updatedChild.children,
                isOpen
              );
            }
            return updatedChild;
          });
        }
        function searchAndUpdate(folders: Folder[]): Folder[] {
          return folders.map((folder) => {
            if (folder.path === file.path) {
              const updatedFolder: Folder = {
                ...folder,
                isOpen: !folder.isOpen,
              };
              // If it's closing, close all its descendants too
              if (!updatedFolder.isOpen && updatedFolder.children) {
                updatedFolder.children = updateDescendants(
                  updatedFolder.children,
                  false
                );
              }
              return updatedFolder;
            } else if (folder.children) {
              return { ...folder, children: searchAndUpdate(folder.children) };
            }
            return folder;
          });
        }

        return searchAndUpdate(folders);
      }

      setFolder(findAndOpenFolderAndUpdate());
    };

    return (
      <div>
        <div
          onClick={handleSwitch}
          className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded border-b border-tuna pr-5 hover:bg-tuna [&>div>div]:hover:!opacity-100"
          style={{ paddingLeft: `${indentLevel * 20 + 20}px` }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-0.5">
              {file.isOpen ? <FolderOpen /> : <FolderClose />}
              <div>{file.name}</div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveFile(file);
              }}
              className="h-4 cursor-pointer opacity-0 hover:scale-[115%]"
            >
              <RemoveIcon />
            </div>
          </div>
          {/* <div onClick={handleCode}>
            <SwitchArrowsIcon />
          </div> */}
        </div>
        {file.isOpen &&
          !file.isMonaco &&
          file.children &&
          file.children.map((child) => (
            <FolderComponent
              key={child.name}
              folder={child}
              folders={folders}
              setFolder={setFolder}
              indentLevel={indentLevel + 1}
              setPreviewFile={setPreviewFile}
            />
          ))}
        {/* {file.isOpen && file.isMonaco && (
          <div className="mt-2">
            <MonacoEditor
              mode="read"
              editorRef={editorRef}
              currentTab={currentTab}
              tabs={tabs}
              setCurrentTab={(tab) => setCurrentTab(tab)}
              onBlur={() => {}}
              onFocus={() => {}}
              isRequest={true}
            />
          </div>
        )} */}
      </div>
    );
  };

  function FolderStructure({
    folders,
    setFolder,
    setPreviewFile,
  }: {
    folders: Folder[];
    setFolder: (folder: Folder[]) => void;
    setPreviewFile?: (e: any) => void;
  }) {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg">
          {folders?.map((folder) => (
            <FolderComponent
              key={Math.random()}
              folder={folder}
              folders={folders}
              setFolder={setFolder}
              indentLevel={0}
              setPreviewFile={setPreviewFile}
            />
          ))}
        </div>
        <div className="absolute bottom-[-25px] left-2 text-[12px] text-fuzzy">
          {folderError}
        </div>
      </div>
    );
  }

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    multiple: false,
    onDragLeave: () => {
      setDragEnter(false);
    },
    //@ts-ignore
    getFilesFromEvent: (event) => droppedItemHeirarchyProber(event),
  });

  async function droppedItemHeirarchyProber(e: any) {
    function normalizePath(folder: Folder): Folder {
      return {
        ...folder,
        path: folder.path.split("/").slice(2).join("/"),
        children: folder?.children
          ? folder.children.map((child: Folder) => normalizePath(child))
          : [], // Recursively sort children
      };
    }

    if (e.type === "drop") {
      setDragEnter(false);
      const filesDataPromise = fromEvent(e);
      const heirarchyDetails = await probeFolders(e);

      const filesData = await filesDataPromise;

      const rootElement = normalizePath(
        heirarchyDetails[heirarchyDetails.length - 1]
      );

      if (
        rootElement.children &&
        !rootElement?.children?.find((child: any) => child.name === "output")
      ) {
        rootElement.children = [...rootElement.children];
      }

      setFilePaths(
        [...(filesData as any)].filter(
          (file) =>
            !file?.path.includes(".git/") &&
            !file?.path.includes(".DS_Store") &&
            !file?.path.includes("node_modules")
        )
      );
      setRootFolderName(rootElement.name);
      setFolder(sortFolder(rootElement?.children as Folder[]));
      setFolderError("");

      return { filesData, heirarchyDetails };
    } else if (e.type === "dragenter") {
      setDragEnter(true);
    }
  }

  async function probeFolders(event: any) {
    const heirarchyDetails: any[] = [];

    const rootHandle =
      await event.dataTransfer.items[0].getAsFileSystemHandle();

    const path = `/${rootHandle?.name}`;

    await traverseDirectory(rootHandle, path, heirarchyDetails);

    return heirarchyDetails;
  }

  async function traverseDirectory(
    dirHandle: any,
    currentPath: any,
    heirarchyDetails: any
  ) {
    const folderDetails: Folder = {
      name: dirHandle.name,
      kind: dirHandle.kind,
      path: currentPath,
      isOpen: false,
      children: [],
    };

    for await (const [name, handle] of dirHandle.entries()) {
      const path = `${currentPath}/${name}`;

      if (![".DS_Store", ".git", "node_modules"].includes(name)) {
        if (handle.kind === "file") {
          const file = { path, name: handle.name, kind: handle.kind };
          folderDetails.children && folderDetails.children.push(file);
        } else if (handle.kind === "directory") {
          const childDetails = await traverseDirectory(
            handle,
            path,
            heirarchyDetails
          );
          folderDetails.children && folderDetails.children.push(childDetails);
        }
      }
    }

    heirarchyDetails.push(folderDetails);
    return folderDetails;
  }

  function handleRemove() {
    setDeletedPath && folder.map((folder) => setDeletedPath(folder.path));
    setFolder([]);
  }

  return (
    <div className="w-full">
      {folder?.length ? (
        <div className="flex items-center justify-between px-3 pb-2 text-base font-bold">
          <div>{rootFolderName ? rootFolderName.toUpperCase() : "PROJECT"}</div>
          <div onClick={handleRemove} className="h-4 cursor-pointer">
            <RemoveIcon />
          </div>
          <FileTrigger
            allowsMultiple
            onSelect={(e) => {
              if (e) {
                const filePaths = [...(e as any)];
                if (folderSizeValidator(filePaths)) {
                  // let files: any[] = [];
                  // await getFiles(files);
                  // @ts-ignore
                  setFolder((prev: any) =>
                    sortFolder([
                      ...prev,
                      ...filePaths.map((file: any) => ({
                        name: file.name,
                        kind: "file" as "file",
                        path:
                          file.webkitRelativePath !== ""
                            ? file.webkitRelativePath
                            : file.name,
                      })),
                    ])
                  );

                  setFilePaths((prev: any) =>
                    prev ? [...prev, ...filePaths] : filePaths
                  );
                }
              }
            }}
          >
            {/* <Button
              size="xs"
              color="primary"
              className="ml-3 bg-transparent p-0 text-[15px] text-coral outline-none hover:text-snow"
            >
              add files
            </Button> */}
          </FileTrigger>
        </div>
      ) : null}
      <div className="flex w-full flex-col items-center gap-5">
        <div
          className={`w-full h-full ${dragEnter
            ? "border-2 border-dashed bg-smoke rounded-lg"
            : `bg-shark ${folderError && "border-fuzzy"}`
            }`}
        >
          <div className="!p-0">
            {!folder?.length ? (
              <div
                className="relative flex h-[calc(100vh-50px)] flex-col items-center justify-center gap-1 rounded-[12px] p-[39px]"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p className="text-[18px] font-semibold">
                  {dragEnter
                    ? "Drop to upload project"
                    : "Drag and drop your project here to upload"}
                </p>
                {!dragEnter ? (
                  <FileTrigger
                    // allowsMultiple
                    onSelect={(e) => {
                      if (e) {
                        const filePaths = ([...(e as any)]);
                        if (folderSizeValidator(filePaths)) {
                          // let files: any[] = [];
                          // await getFiles(files);
                          // @ts-ignore
                          setFolder((prev: any) =>
                            sortFolder([
                              ...prev,
                              ...filePaths.map((file: any) => ({
                                name: file.name,
                                kind: "file" as "file",
                                path:
                                  file.webkitRelativePath !== ""
                                    ? file.webkitRelativePath
                                    : file.name,
                              })),
                            ])
                          );

                          setFilePaths((prev: any) =>
                            prev ? [...prev, ...filePaths] : filePaths
                          );
                        }
                      }
                    }}
                  >
                    <div className="flex gap-1">
                      <div>Or</div>
                      <Button
                        size="xs"
                        color="primary"
                        className="my-auto bg-transparent !p-0 text-[16px] text-coral"
                      >
                        choose your files
                      </Button>
                    </div>
                  </FileTrigger>
                ) : null}
              </div>
            ) : (
              <div>
                <FolderStructure
                  folders={folder}
                  setFolder={setFolder}
                  setPreviewFile={handleFileClick}
                />
              </div>
            )}
            {selectedFileContent && (
              <div style={{ marginTop: "20px" }}>
                <h3>File Preview:</h3>
                <SyntaxHighlighter language="java" style={dark}>
                  {selectedFileContent}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
