import { pdfjs, Document, Page, Outline } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
import React, { useState, useCallback } from 'react';
import { useAsync } from 'react-use';

import './PDFViewer.less';

if (pdfjs?.GlobalWorkerOptions?.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}


export const PDFViewer = ({ children }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = useCallback((document) => {
    const { numPages: nextNumPages } = document;
    setNumPages(nextNumPages);
    setPageNumber(1);
  }, []);

  const onItemClick = useCallback(
    ({ pageNumber: nextPageNumber }) => setPageNumber(nextPageNumber),
    []
  );

  const changePage = useCallback(
    (offset) =>
      setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset),
    []
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);

  const nextPage = useCallback(() => changePage(1), [changePage]);

  const render = useAsync(async () => {
    const child = React.Children.only(children);
    if (!child) return null;

    const blob = await pdf(child).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [children]);

  const rendrerLoader = () => <div className="loader"></div>;

  return (
    <Document
      file={render.value}
      onLoadSuccess={onDocumentLoadSuccess}
      onItemClick={onItemClick}
      loading={rendrerLoader}
    >
      {/* <Outline className="custom-classname-outline" onItemClick={onItemClick} /> */}
      <Page renderMode="svg" pageNumber={pageNumber} />
      {numPages > 1 && (
        <div className="page-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={previousPage}
            type="button"
          >
            ‹
          </button>
          <span>
            {`${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </Document>
  );
};
