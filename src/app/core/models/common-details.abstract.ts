import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericTypeValue } from './enat.models';


export abstract class CommonGridAbstractDetails<T> {

    public formGroup: FormGroup;
    public isEditing: boolean = false;
    public isCreating: boolean = false;

    constructor(
        public formBuilder: FormBuilder
    ) { }

    public abstract loadComponent(): void;
    public abstract onSaveChanges(): void;

    public buildForm(props: any, entity?: any): void {
        this.formGroup = this.formBuilder.group(props);
        if (entity) {
            this.formGroup.patchValue(entity);
        }
        if (!this.isEditing && !this.isCreating) {
            this.formGroup.disable();
        }
    }

    public setPropValue(prop: string, value: any): void {
        this.formGroup.controls[prop].setValue(value);
    }

    public getFormValue(): T {
        return this.formGroup.value;
    }

    public getFormValueOfProps(...props: string[]): GenericTypeValue[] {
        let result: GenericTypeValue[] = [];
        props.forEach(e => {
            result.push({
                name: e,
                value: this.formGroup.controls[e].value
            });
        });
        return result;
    }
}

