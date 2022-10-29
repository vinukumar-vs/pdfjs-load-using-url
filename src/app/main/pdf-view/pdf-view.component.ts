import { Component, Input, OnInit } from '@angular/core';
import { PdfHandlerService } from 'src/app/pdf-handler.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {

  @Input() viewData;
  totalPages: number;
  pageNumber: number = 1;

  pdf: any;

  constructor(private pdfHandlerService: PdfHandlerService) {
  }

  ngOnInit() {
    this.setInitialProof();
  }

  setInitialProof() {
    this.pdfHandlerService.setPdfDocObjects({url: "helloworld.pdf"}).then((pdf) => {
      this.pdf = pdf;
      this.totalPages = this.pdf.pdfInfo.numPages;
      this.generateView(this.pageNumber);
    });

  }

  generateView(pageNumber) {
    this.pdf.getPage(pageNumber).then((page) => {
      //
      // Fetch the first page
      //
      // const scale = 1;
      // const viewport = page.getViewport({ scale });
      // viewport.width = viewport.viewBox[2];// 1900;
      // viewport.height = viewport.viewBox[3];// 1700;
      // // Support HiDPI-screens.
      // const outputScale = window.devicePixelRatio || 1;


      //
      // Prepare canvas using PDF page dimensions
      //
      // let canvas: any = document.getElementById("main-canvas");
      // const context = canvas.getContext("2d");
      // canvas.width =  Math.floor(viewport.width * outputScale);
      // canvas.height = Math.floor(viewport.height * outputScale);

      // canvas.style.width = Math.floor(viewport.width) + "px";
      // canvas.style.height = Math.floor(viewport.height) + "px";

      // var transform = [1, 0, 0, -1, 0, viewport.height]
      // const transform = outputScale !== 1
      // ? [outputScale, 0, 0, outputScale, 0, 0]
      // : null;

      //
      // Render PDF page into canvas context
      //
      // const renderContext = {
      //   canvasContext: context,
      //   // transform,
      //   viewport,
      // };


      // Solution 2
      // ref: https://mozilla.github.io/pdf.js/examples/index.html#rendering-the-page
      var scale = 2;
      var viewport = page.getViewport(scale);
      // Support HiDPI-screens.
      var outputScale = window.devicePixelRatio || 1;

      var canvas: any = document.getElementById('main-canvas');
      var context = canvas.getContext('2d');

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";

      var transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;

      var renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport
      };

      // // Solution 3
      // // Default solution - Working
      // let scale = 1.5;
      // let viewport = page.getViewport(scale);
      // // let textLayerDiv: any = document.getElementById("page_1");
      // let canvas: any = document.getElementById('main-canvas');
      // let context = canvas.getContext('2d');
      // canvas.height = viewport.height;
      // canvas.width = viewport.width;
      // let renderContext = {
      //   canvasContext: context,
      //   viewport: viewport
      // };
      page.render(renderContext);

      page.getTextContent().then(function (textContent) {

        // let textLayer = new TextLayerBuilder({
        //   textLayerDiv: textLayerDiv,
        //   pageIndex: pageNumber - 1,
        //   viewport: viewport
        // });
        // textLayer.setTextContent(textContent);
        // textLayer.render(20);
      });
    });
  }

  changePagePrevious() {
    this.pageNumber = this.pageNumber - 1;
    if (this.pageNumber == 0) {
      alert("firstPage");
      this.pageNumber = 1;
    }
    else {
      this.generateView(this.pageNumber)
    }
  }

  changePageNext() {
    this.pageNumber = this.pageNumber + 1;

    if (this.pageNumber >= this.totalPages) {
      alert("LastPage");
      this.pageNumber = 641;
    }
    else {
      this.generateView(this.pageNumber)
    }
  }

}
