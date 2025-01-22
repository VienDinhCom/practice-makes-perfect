import React from 'react';
import classes from './UploadButton.module.scss';
import uploadIcon from '../../images/upload-icon.svg';

export default function UploadButton({ getFiles }) {
  return (
    <label className={classes.upload} htmlFor="uploadFile">
      <input
        className={classes.uploadInput}
        id="uploadFile"
        type="file"
        onChange={event => {
          if (event.target.files.length) getFiles(event.target.files[0]);
        }}
        accept="application/pdf,text/plain"
      ></input>
      <img
        className={classes.uploadIcon}
        src={uploadIcon}
        height={22}
        alt="Upload Files"
      />
      Upload Files
    </label>
  );
}
