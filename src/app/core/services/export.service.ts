import { Injectable, Inject, ElementRef, Type } from '@angular/core';
import { FileHandlerFactory } from './../factory/file-handlers/file-handler.factory';
import { FileType } from 'src/app/core/models/enat.models';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private fileHandlerFactory = new FileHandlerFactory()

  constructor() { }

  saveToFile(as: FileType, data: any[], fileName: string): void {
    const fileHandler = this.fileHandlerFactory.create(as);
    fileHandler.export(data, fileName);
  }

}
