import { WorkSheet, WorkBook, utils as xlsxUtils, write as xlsxWrite} from 'xlsx';
import { saveAs } from 'file-saver';
import { FileHandler } from 'src/app/core/models/enat.models';

export class ExcelFileHandler implements FileHandler {
    contentType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension: string = '.xlsx';
    
    private save(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: this.contentType });
        saveAs(data, fileName + this.fileExtension);
    }

    public export(data: any[], fileName: string): void {
        const workSheet: WorkSheet = xlsxUtils.json_to_sheet(data),
            workbook: WorkBook = {
                Sheets: { [fileName]: workSheet },
                SheetNames: [fileName]
            },
            excelBuffer: any = xlsxWrite(workbook, { bookType: 'xlsx', type: 'array' });

        this.save(excelBuffer, fileName);
    }
}