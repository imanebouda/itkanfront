import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckListModel } from 'src/app/models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service';

@Component({
  selector: 'app-update-check-list',
  templateUrl: './update-check-list.component.html',
  styleUrls: ['./update-check-list.component.scss']
})
export class UpdateCheckListComponent implements OnInit {
  @Input() selectedCheckList: CheckListModel;
  @Output() closeUpdateDialog = new EventEmitter<void>();
  updateCheckListForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';
  typeCheckListOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private checkListService: CheckListService
  ) {
    this.updateCheckListForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],
     // typeCheckListAudit: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.selectedCheckList) {
      this.updateCheckListForm.patchValue(this.selectedCheckList);
    }
    this.loadTypeCheckLists();
  }

  loadTypeCheckLists(): void {
    this.checkListService.getTypeCheckLists().subscribe(
      typeChecklists => {
        this.typeCheckListOptions = typeChecklists;
      },
      error => {
        console.error('Error fetching type checklists:', error);
      }
    );
  }

  submitForm() {
    if (this.updateCheckListForm.valid) {
      this.is_loading = true;
      const formData = this.updateCheckListForm.value;
  
      // Convertir les valeurs en nombres
      const typechecklistId = parseInt(formData.typechecklist_id, 10); // Convertir l'identifiant en nombre entier
      const typeCheckListAuditId = typechecklistId; // Utiliser le même identifiant pour typeCheckListAuditId
      const typeCheckListAuditType = formData.typechecklist_id; // Utiliser directement la valeur de typechecklist_id pour le type
  
      // Créer un objet conforme à la structure de la requête envoyée par Swagger
      const requestBody = {
        id: this.selectedCheckList.id,
        name: formData.name,
        niveau: formData.niveau,
        code: formData.code,
        description: formData.description,
        typechecklist_id: typechecklistId, // Utiliser l'identifiant converti
       /* typeCheckListAudit: {
          id: formData.typechecklist_id,
          type: typeCheckListAuditType // Utiliser directement la valeur de typechecklist_id
        }*/
        
      };
      console.log("ee",typechecklistId);
      console.log("ee",typeCheckListAuditId);
      console.log("ee",typeCheckListAuditType);
  
      this.checkListService.updateCheckList(this.selectedCheckList.id, requestBody).subscribe(
        () => {
          this.is_loading = false;
          this.closeUpdateDialog.emit();
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error updating checklist: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
      console.log(this.updateCheckListForm);
      
    }

  }
  

  closeDialog() {
    this.closeUpdateDialog.emit(); // Emit event to close the dialog
  }

  // Méthode pour mettre à jour les champs typechecklist_id et typeCheckListAudit.id simultanément
  updateTypeCheckList(event: any) {
    const selectedTypeId = event.target.value;
    this.updateCheckListForm.patchValue({
      typechecklist_id: selectedTypeId,
      typeCheckListAudit: { id: selectedTypeId }
    });
  }
}
