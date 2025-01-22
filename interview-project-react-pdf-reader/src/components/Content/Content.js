import React from 'react';
import PDFViewer from './PDFViewer';
import PlainTextViewer from './PlainTextViewer';
import classes from './Content.module.scss';
import fileIcon from '../../images/file-icon.svg';
import UploadButton from '../UploadButton/UploadButton';
import logo from '../../images/logo.png';
import fileIconSm from '../../images/file-icon-sm.svg';
import useMedia from '../../hooks/useMedia';

export default function Content({
  activeFileId,
  setActiveFileId,
  getFiles,
  files,
}) {
  const activeFile = files[activeFileId];
  const fileArray = [];

  for (const id in files) {
    if (files.hasOwnProperty(id)) {
      const file = files[id];

      fileArray.push({
        file,
        id,
      });
    }
  }

  const isMobile = useMedia(
    ['(max-width: 1024px)', '(min-width: 1025px)'],
    [true, false],
    false
  );

  function _openFile(id) {
    setActiveFileId(id);
  }

  return (
    <article className={classes.root}>
      {isMobile && (
        <header className={classes.header}>
          <div>
            <img
              className={classes.logo}
              src={logo}
              height={45}
              alt="Reader Zone"
            />
          </div>
          <UploadButton getFiles={getFiles}></UploadButton>
        </header>
      )}
      <section className={classes.body}>
        {activeFile ? (
          <>
            <h1 className={classes.title}>
              <img
                className={classes.fileIcon}
                src={fileIcon}
                alt={activeFile.name}
              />{' '}
              {activeFile.name}
            </h1>
            <div className={classes.content}>
              {activeFile.type === 'text/plain' && (
                <PlainTextViewer file={activeFile}></PlainTextViewer>
              )}
              {activeFile.type === 'application/pdf' && (
                <PDFViewer file={activeFile}></PDFViewer>
              )}
            </div>
          </>
        ) : (
          <div className={classes.none}>
            <p>Please upload a file!</p>
            <p className={classes.noneSmallText}>Supported files: .pdf, .txt</p>
          </div>
        )}
      </section>
      {fileArray.length > 0 && isMobile && (
        <footer className={classes.footer}>
          <h2 className={classes.footerTitle}>Files</h2>
          <ul className={classes.fileList}>
            {fileArray.map(({ file, id }) => (
              <li
                key={id}
                className={
                  classes.fileItem +
                  (parseInt(id) === parseInt(activeFileId)
                    ? ` ${classes.fileItemActive}`
                    : '')
                }
                onClick={() => _openFile(id)}
              >
                <img
                  className={classes.fileItemImg}
                  src={fileIconSm}
                  alt={file.name}
                />{' '}
                {file.name}{' '}
                <span className={classes.fileItemSize}>
                  ({(file.size / 1024).toFixed(2)} Kb)
                </span>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
