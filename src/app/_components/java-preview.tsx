import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const JavaFilePreview: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');
  const [selectedText, setSelectedText] = useState<string>('');
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    // Filter out only .java files
    const javaFiles = uploadedFiles.filter(
      (file) => file.type === 'text/x-java-source' || file.name.endsWith('.java')
    );
    setFiles(javaFiles);
  };

  const handleFileClick = (file: File) => {
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
          }
        }
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".java" multiple onChange={handleFileUpload} />
      <div style={{ marginTop: '20px' }}>
        <h3>Uploaded Files:</h3>
        <ul>
          {files.map((file, index) => (
            <li
              key={index}
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => handleFileClick(file)}
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedFileContent && (
        <div style={{ marginTop: '20px' }}>
          <h3>File Preview:</h3>
          <div ref={codeContainerRef} onMouseUp={handleMouseUp}>
            <SyntaxHighlighter language="java" style={dark}>
              {selectedFileContent}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {selectedText && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>Selected Text:</h3>
          <pre>{selectedText}</pre>
        </div>
      )}
    </div>
  );
};

export default JavaFilePreview;
