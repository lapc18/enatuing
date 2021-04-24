import { ComponentType } from "@angular/cdk/portal";

export interface DialogFactoryOptions {
    message?: string;
    data?: Object;
    callback?: Function;
    hasBackdrop?: boolean;
    height?: number,
    width?: number,
}

export interface IDialogFactory {
    create(component: ComponentType<unknown>, options?: DialogFactoryOptions): void;
    confirmation(options?: DialogFactoryOptions): void;
    justOk(options?: DialogFactoryOptions): void;
    warning(options?: DialogFactoryOptions): void;
    information(options?: DialogFactoryOptions): void;
}