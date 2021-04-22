import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ContactsEntity } from "src/app/core/domain/contacts/contacts.entity";
import { Contact } from "src/app/core/domain/contacts/contacts.models";
import { CommonGridAbstractDetails } from "src/app/core/models/common-details.abstract";


@Component({
    selector: 'dynamic-detail-contact.component',
    templateUrl: './dynamic-detail-contact.component.html',
    styleUrls: ['./dynamic-detail-contact.component.scss']
})
export class DynamicDetailContactComponent extends CommonGridAbstractDetails<Contact> implements OnInit {
    
    private contactsEntity: ContactsEntity;
    public contact: Contact = null;
    
    constructor(
        // private store: Store<{  }>,
        public formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<DynamicDetailContactComponent>
      ) {
        super(formBuilder);
        this.loadComponent();
    }

    ngOnInit(): void {
        console.log(this.contact);
        this.buildContactForm();
    }

    public loadComponent(): void {
        this.contact = this.data ? { ...this.data['contact'] } : null;
        this.isEditing = this.data ? this.data['isEditing'] : false;
        this.isCreating = this.data ? this.data['isCreating'] : false;
    }

    public onSaveChanges(): void {
        this.dialogRef.close();
    }
    
    public formToEntity(): void {
         this.contactsEntity = new ContactsEntity('','','','');
    }

    private buildContactForm(): void {
        const form: any = {
            name: ['', Validators.required],
            position: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            telephoneNumber: ['', [Validators.minLength(10), Validators.required]],
            ext: [''],
            phoneNumber: ['', Validators.minLength(10)],
        }
        this.contact ? super.buildForm(form, this.contact) : super.buildForm(form);
        
    }



}