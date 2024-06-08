import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditModel } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/AuditServices/audit.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent implements OnInit {
  @Input() addAudit: AuditModel;
  @Output() closeAddDialog = new EventEmitter<void>();
  typeAuditOptions: any[] = [];
  addAuditForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';

  @ViewChild('addAuditModal') addModal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auditService: AuditService
  ) {
    this.addAuditForm = this.fb.group({
      nomAudit: ['', Validators.required],
      typeAuditId: ['', Validators.required],
      dateAudit: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
      /*name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],*/
    });
  }

  ngOnInit(): void {
    this.loadTypeAudits();
  }

  loadTypeAudits(): void {
    this.auditService.getTypeAudits().subscribe(
      typeAudits => {
        this.typeAuditOptions = typeAudits;
      },
      error => {
        console.error('Error fetching type audit:', error);
      }
    );
  }

  submitForm() {
    if (this.addAuditForm.valid) {
      this.is_loading = true;
      const formData = this.addAuditForm.value;

      this.auditService.addAudit(formData).subscribe(
        () => {
          this.is_loading = false;
          this.closeAddDialog.emit();
          const modal = new Modal(this.addModal.nativeElement);
          modal.hide();
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error adding audit: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
    }
  }
}
