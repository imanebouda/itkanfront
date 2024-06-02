import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuditModel } from "../../../../models/audit.model";
import { AuditService } from "../../../../services/AuditServices/audit.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-list-audit',
  templateUrl: './list-audit.component.html',
  styleUrls: ['./list-audit.component.scss']
})
export class ListAuditComponent {
  @ViewChild('addAuditModal') addModal: ElementRef;
  @ViewChild('updateAuditModal') updateModal: ElementRef;

  formulaireRecherche: FormGroup;
  typeAuditList: any;
  addAudit: AuditModel;
  selectedAudit: AuditModel;
  audits: AuditModel[] = []; // Initialize as an empty array
  is_loading: boolean = true;

  constructor(
    private auditService: AuditService,
    private fb: FormBuilder
  ) {
    this.formulaireRecherche = this.fb.group({
      typeAudit: [''],
      annee: ['']
    });
  }

  ngOnInit(): void {
    this.loadAudits();
  }

  searchAudits() {
    // Logic to search audits based on form values
  }

  openAddAuditModal() {
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }
  
  openUpdateDialog(audit: AuditModel): void {
    console.log('Selected checklist:', audit);
    this.selectedAudit = audit;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }
  
  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedAudit = null;
    this.loadAudits();
  }

  clearSearch() {
    // Logic to clear search filters
  }

  loadAudits(): void {
    this.auditService.auditList().subscribe(
      audits => {
        this.audits = audits;
        this.is_loading = false;
      },
      error => {
        console.error('Error fetching Audits:', error);
        this.is_loading = false;
      }
    );
  }

  deleteAudit(auditData: any): void {
    // Logic to delete an audit
  }

  closeAddAuditDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
    this.loadAudits();
  }
}
