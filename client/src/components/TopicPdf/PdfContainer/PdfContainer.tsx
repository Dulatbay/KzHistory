import React, {useEffect, useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import axios from "axios";

export const PdfContainer = ({filename}: { filename: string }) => {
    const [numPages, setNumPages] = useState(0);
    const [file, setFile] = useState<Blob>();
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--header-bg-color', '#DE3163');
        axios.get(filename, {responseType: 'blob'})
            .then((response) => {
                setFile(new Blob([response.data]));
            })
            .catch((error) => {
                console.error('Error fetching document:', error);
            });
    }, [filename])

    useEffect(() => {
        return () => {
            document.documentElement.style.setProperty('--header-bg-color', '#00ABC2')
        }
    }, [])

    return (
        <div className="pdf-container">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          className="pdf-page"
                    />
                ))}
            </Document>
        </div>
    );
};
