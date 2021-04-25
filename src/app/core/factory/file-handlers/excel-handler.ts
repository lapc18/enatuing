import { ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FileHandler } from 'src/app/core/models/enat.models';

export class ExcelFileHandler implements FileHandler {
    fileType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension: string = '.xlsx';

    private save(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: this.fileType });
        FileSaver.saveAs(data, fileName + this.fileExtension);
    }

    public export(data: any[], fileName: string): void {
        const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data),
            workbook: XLSX.WorkBook = {
                Sheets: { [fileName]: workSheet },
                SheetNames: [fileName]
            },
            excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        this.save(excelBuffer, fileName);
    }
}