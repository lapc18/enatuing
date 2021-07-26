import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogFactoryOptions, IDialogFactory } from "../../models/dialog-factory.models";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { InformationComponent } from "./information/information.component";
import { JustOkComponent } from "./just-ok/just-ok.component";
import { WarningComponent } from "./warning/warning.component";

@Injectable()
export class DialogFactory implements IDialogFactory{

    constructor(
        private dialog: MatDialog
    ){}

    create(component: ComponentType<unknown>, options?: DialogFactoryOptions): void {
        this.dialog.open(component, {
            data: {
                message: options && options.message? options.message : '',
                data: options && options.data ? options.data : {},
                callback: options && options.callback ? () => options.callback() : void 0,
            },
            hasBackdrop: options.hasBackdrop ? options.hasBackdrop : true,
            height: `${options.height ? options.height : '300px'}`,
            width: `${options.width ? options.width : '800px'}`,
        });
    }

    confirmation(options?: DialogFactoryOptions): void {
        this.create(ConfirmationComponent, options);
    }

    justOk(options?: DialogFactoryOptions): void {
        this.create(JustOkComponent, options);
    }

    warning(options?: DialogFactoryOptions): void {
        this.create(WarningComponent, options);
    }

    information(options?: DialogFactoryOptions): void {
        this.create(InformationComponent, options);
    }
}