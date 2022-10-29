import { Injectable } from '@angular/core';
import * as PDFJS from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfHandlerService {

  url: String;
  pdfDoc: any = {};
  pageObjectPromise: any = {};

  constructor() {
    PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  }

  setPdfDocObjects(data) {
    let self = this;
    self.url = data.url;
    let docId = data.docId;
    return new Promise((resolve, reject) => {
      self.url = '/assets/' + data.url;
      PDFJS.getDocument(this.url).then((_pdfDoc) => {
      self.pdfDoc[docId] = _pdfDoc;
        resolve(_pdfDoc);
      }, (error) => {
        reject(error);
      });
    });

  }

  generateThumbnail(page, data) {

  }
}
