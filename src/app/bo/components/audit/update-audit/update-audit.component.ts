import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditModel } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/AuditServices/audit.service';

@Component({
  selector: 'app-update-audit',
  templateUrl: './update-audit.component.html',
  styleUrls: ['./update-audit.component.scss']
})
export class UpdateAuditComponent implements OnInit {
  @Input() selectedAudit: AuditModel;
  @Output() closeUpdateDialog = new EventEmitter<void>();

  updateAuditForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auditService: AuditService
  ) {
    this.updateAuditForm = this.fb.group({
        nomAudit: ['', Validators.required],
        typeAudit: ['', Validators.required],
        dateAudit: ['', Validators.required],
        status: ['', Validators.required],
        description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.selectedAudit) {
      this.updateAuditForm.patchValue(this.selectedAudit);
    }
  }

  submitForm() {
    if (this.updateAuditForm.valid) {
      this.is_loading = true;
      const formData = this.updateAuditForm.value;

      this.auditService.updateAudit(this.selectedAudit.id, formData).subscribe(
        () => {
          this.is_loading = false;
          // Logic to handle successful update, e.g., close modal or notify parent component
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error updating audit: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
    }
  }
}
