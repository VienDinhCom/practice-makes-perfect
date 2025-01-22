import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/Content';
import classes from './Main.module.scss';
import useMedia from '../../hooks/useMedia';

function getPlainTextContent(file) {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Could not read the file!'));
    };
  });
}

export default function Main() {
  const [files, setFiles] = useState({});
  const [activeFileId, setActiveFileId] = useState(null);

  const isDesktop = useMedia(
    ['(max-width: 1024px)', '(min-width: 1025px)'],
    [false, true],
    true
  );

  async function _addFiles(file) {
    const id = Date.now();

    setActiveFileId(id);

    switch (file.type) {
      case 'text/plain':
        const fileContent = await getPlainTextContent(file);

        setFiles({
          ...files,
          [id]: {
            name: file.name,
            size: file.size,
            type: file.type,
            textContent: fileContent,
          },
        });
        break;

      case 'application/pdf':
        setFiles({
          ...files,
          [id]: {
            name: file.name,
            size: file.size,
            type: file.type,
            pdfURL: URL.createObjectURL(file),
          },
        });
        break;

      default:
        alert(`Could not open ${file.type} files!`);
        setActiveFileId(null);
        break;
    }
  }

  return (
    <main className={classes.root}>
      {isDesktop && (
        <Sidebar
          getFiles={_addFiles}
          files={files}
          activeFileId={activeFileId}
          setActiveFileId={id => setActiveFileId(id)}
        ></Sidebar>
      )}
      <Content
        getFiles={_addFiles}
        files={files}
        activeFileId={activeFileId}
        setActiveFileId={id => setActiveFileId(id)}
      ></Content>
    </main>
  );
}
