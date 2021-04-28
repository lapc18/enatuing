import { FileHandler, FileType } from 'src/app/core/models/enat.models';
import { ExcelFileHandler } from './excel-handler';
import { HtmlPngFileHandler } from './html-png-handler';

export class FileHandlerFactory {

    create(fileType: FileType): FileHandler {
        switch (fileType) {
            case FileType.excel:
                return this.excel();
            case FileType.htmlPng:
                return this.htmlToPng();
            default:
                throw new Error('Provided file type is not implemented');
        }
    }

    excel() {
        return new ExcelFileHandler();
    }

    htmlToPng() {
        return new HtmlPngFileHandler();
    }
}