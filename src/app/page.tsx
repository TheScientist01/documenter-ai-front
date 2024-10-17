"use client";

import { useEffect, useRef, useState } from "react";
import { DropFolder, Folder } from "./_components";
import JavaFilePreview from "./_components/java-preview";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, atomDark, a11yDark, coldarkDark, dracula, darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Logo from "@/assets/images/logo.png"
import Image from "next/image";

export default function Home() {
  const [folder, setFolder] = useState<Folder[]>([]);
  const [filePaths, setFilePaths] = useState<any>(null);
  const [folderError, setFolderError] = useState<string>("");
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [activeFilePath, setActiveFilePath] = useState<string>("")

  const handleFileClick = (path: string) => {
    const file = filePaths.find((file: any) => file.path.split("/").slice(2).join("/") === path)

    if (!!file) {
      setActiveFilePath(path)
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setSelectedFileContent(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleMouseUp = () => {
    if (codeContainerRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (codeContainerRef.current.contains(range.commonAncestorContainer)) {
          const selectedText = selection.toString();
          if (selectedText) {
            setSelectedText(selectedText);

            // Calculate the position of the selected text
            const rect = range.getBoundingClientRect();
            const containerRect = codeContainerRef.current.getBoundingClientRect();

            // Adjust the button position to be relative to the container
            setButtonPosition({
              top: rect.top - containerRect.top - 40, // Place it above the selected text with an offset
              left: rect.left - containerRect.left,
            });

            // Add delay for visibility to create smooth animation
            setTimeout(() => {
              setIsButtonVisible(true);
            }, 50); // Short delay to ensure transition works properly
          } else {
            setIsButtonVisible(false);
          }
        }
      }
    }
  };

  const handleButtonClick = () => {
    console.log(`You selected: "${selectedText}"`);
  };

  useEffect(() => {
    const selection = window.getSelection();
    if (!buttonPosition || (selection && selection.toString() === '')) {
      setIsButtonVisible(false);
    }
  }, [buttonPosition, window?.getSelection()]);

  return (
    <div style={styles.wrapper}>
      {/* Sidebar with DropFolder */}
      {/* @ts-ignore */}
      <div style={styles.sidebar}>
        {/* <h2 className="text-black font-semibold text-[20px]">Documenter AI</h2> */}
        <div className="rounded-lg w-full">
          <DropFolder
            folder={folder}
            folderError={folderError}
            activeFile={activeFilePath}
            setFolder={setFolder}
            setFolderError={setFolderError}
            setFilePaths={setFilePaths}
            handleFileClick={handleFileClick}
          />
        </div>
      </div>

      {/* Main content area */}
      {/* @ts-ignore */}
      <div style={styles.mainContent}>
        {selectedFileContent ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <div ref={codeContainerRef} onMouseUp={handleMouseUp} className="h-[calc(100vh-20px)] overflow-auto" >
              <SyntaxHighlighter language="java" style={darcula} showLineNumbers>
                {selectedFileContent}
              </SyntaxHighlighter>
            </div>
            {buttonPosition && (
              <button
                style={{
                  position: 'absolute',
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                  background: '#2158BB',
                  color: 'white',
                  border: 'none',
                  borderRadius: "7px",
                  padding: '5px 20px',
                  cursor: 'pointer',
                  opacity: isButtonVisible ? 1 : 0,
                  transform: `translateY(${isButtonVisible ? '0' : '-10px'})`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: isButtonVisible ? 'auto' : 'none',
                }}
                onClick={handleButtonClick}
              >
                Get documentation
              </button>
            )}
          </div>
        ) : (
          <div style={styles.logoContainer}>
            <Image
              src={Logo}
              width={300}
              height={150}
              alt="Logo"
              // @ts-ignore
              style={styles.logo}
            />
          </div>
        )}
      </div>
    </div>
  );
}


const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  sidebar: {
    width: '300px',
    backgroundColor: '#252526',
    padding: '20px',
    borderRight: '1px solid #333',
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '20px',
    overflow: "auto",
  },
  voidContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '4px',
    width: '100%',
    padding: '20px',
  },
  voidText: {
    color: '#ffffff',
    fontSize: '1.2rem',
  },

  logoContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
  },
  logo: {
    opacity: 0.6,
    mixBlendMode: 'multiply',
  },
};