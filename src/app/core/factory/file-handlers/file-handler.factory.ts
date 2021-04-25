import { FileHandler, FileType } from 'src/app/core/models/enat.models';
import { ExcelFileHandler } from './excel-handler';

export class FileHandlerFactory {

    create(fileType: FileType): FileHandler {
        if (fileType == FileType.excel) return this.excel();
        
        throw new Error('Provided file type not implemented');
    }

    excel() {
        return new ExcelFileHandler();
    }
}