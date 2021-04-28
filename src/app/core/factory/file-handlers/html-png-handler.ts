import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { ElementRef } from '@angular/core';
import { FileHandler } from 'src/app/core/models/enat.models';

export class HtmlPngFileHandler implements FileHandler {
    contentType: string = 'image/png';
    fileExtension: string = '.png';

    public export(data: Blob, fileName: string): void {
        FileSaver.saveAs(data, fileName + this.fileExtension);
    }
}