import React from 'react';
import classes from './PlainTextViewer.module.scss';

export default function PlainTextViewer({ file }) {
  return file.textContent.split('\n').map((i, key) => {
    return (
      <p className={classes.line} key={key}>
        {i}
      </p>
    );
  });
}
