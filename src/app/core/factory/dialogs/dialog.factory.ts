import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogFactoryOptions, IDialogFactory } from "../models/dialog-factory.models";

@Injectable()
export class DialogFactory implements IDialogFactory{


    constructor(
        private dialog: MatDialog
    ){}


    create(component: ComponentType<unknown>, options?: DialogFactoryOptions): void {
        this.dialog.open(component, {
            data: {
                message: options.message || '',
                data: options.data || {},
                callback: () => options.callback() || void 0,
            },
            hasBackdrop: options.hasBackdrop ? options.hasBackdrop : false,
            height: `${options.height ? options.height : ''}`,
            width: `${options.width ? options.width : ''}`,
        });
    }

    justOk(options?: DialogFactoryOptions): void {
        //this.create();
    }

    warning(options?: DialogFactoryOptions): void {
        
    }

    information(options?: DialogFactoryOptions): void {
        
    }


}