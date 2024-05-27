import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckListModel } from 'src/app/models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.scss']
})
export class AddCheckListComponent implements OnInit {
  @Input() addCheckList: CheckListModel;
  @Output() closeAddDialog = new EventEmitter<void>();
 
  addCheckListForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';
  typeCheckListOptions: any[] = [];

  @ViewChild('addModal') addModal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private checkListService: CheckListService
  ) {
    this.addCheckListForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
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
    if (this.addCheckListForm.valid) {
      this.is_loading = true;
      const formData = this.addCheckListForm.value;

      this.checkListService.addCheckList(formData).subscribe(
        () => {
          this.is_loading = false;
          this.closeAddDialog.emit();
          const modal = new Modal(this.addModal.nativeElement);
          modal.hide();
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error adding checklist: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
    }
  }
}
