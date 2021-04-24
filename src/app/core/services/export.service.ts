import { Injectable, Inject, ElementRef, Type } from '@angular/core';
import { FileHandlerFactory } from './../factory/file-handlers/file-handler.factory';
import { FileType } from 'src/app/core/models/enat.models';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private fileFactory = new FileHandlerFactory()

  constructor() { }

  saveToFile(as: FileType, data: any[], fileName: string): void {
    const fileHandler = this.fileFactory.create(as);
    fileHandler.export(data, fileName);
  }

}
