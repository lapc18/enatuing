import { Injectable, Inject, ElementRef, Type } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export enum FileType {
  excel = 'excel'
}

interface FileHandler {
  fileType: string;
  fileExtension: string;
  export: (data: any[], fileName: string) => void;
}

class ExcelFileHandler implements FileHandler {
  fileType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension: string = '.xlsx';

  private save(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public export(data: any[], fileName: string): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data),
      wb: XLSX.WorkBook = { Sheets: { [fileName]: workSheet }, SheetNames: [fileName] },
      excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    this.save(excelBuffer, fileName);
  }

  static exportFromTable(tableRef: ElementRef): void {
    return
  }

}

class FileHandlerFactory {
  fileTypes = {
    [FileType.excel]: ExcelFileHandler
  }

  createHandler(fileType: FileType): FileHandler {
    const Handler = this.fileTypes[fileType];
    return new Handler();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private fileFactory = new FileHandlerFactory()

  constructor() { }

  exportData(as: FileType, data: any[], fileName: string): void {
    const fileHandler = this.fileFactory.createHandler(as);
    fileHandler.export(data, fileName);
  }

}
