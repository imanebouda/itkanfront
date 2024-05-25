import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckListModel } from 'src/app/models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-list-check-list',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListCheckListComponent implements OnInit {
  checkLists: CheckListModel[] = [];
  is_loading: boolean = true;
  formulaireRecherche: FormGroup;
  typeChecklistList: { label: string; value: number }[] = [];
  selectedCheckList: CheckListModel;
  addChecklist : CheckListModel;

  @ViewChild('updateModal') updateModal: ElementRef;
  @ViewChild('addModal') addModal: ElementRef;

  constructor(private checkListService: CheckListService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCheckLists();
    this.loadTypeCheckLists();
  }

  initializeForm(): void {
    this.formulaireRecherche = new FormGroup({
      typeChecklist: new FormControl('')
    });
  }

  loadCheckLists(): void {
    this.checkListService.getCheckListList().subscribe(
      checkLists => {
        this.checkLists = checkLists;
        this.is_loading = false;
      },
      error => {
        console.error('Error fetching checkLists:', error);
        this.is_loading = false;
      }
    );
  }

  loadTypeCheckLists(): void {
    this.checkListService.getTypeCheckLists().subscribe(
      typeChecklists => {
        this.typeChecklistList = typeChecklists.map(tc => ({ label: tc.type, value: tc.id }));
      },
      error => {
        console.error('Error fetching type checklists:', error);
      }
    );
  }

  searchCheckLists(): void {
    const typeChecklistId = this.formulaireRecherche.get('typeChecklist')?.value;
    if (typeChecklistId) {
      this.is_loading = true;
      this.checkListService.searchCheckListsByType(typeChecklistId).subscribe(
        checkLists => {
          this.checkLists = checkLists;
          this.is_loading = false;
        },
        error => {
          console.error('Error searching checkLists:', error);
          this.is_loading = false;
        }
      );
    } else {
      this.loadCheckLists();
    }
  }

  clearSearch(): void {
    this.formulaireRecherche.reset();
    this.loadCheckLists();
  }

  deleteCheckList(checkListData: CheckListModel): void {
    this.checkListService.deleteCheckList(checkListData.id).subscribe(
      response => {
        console.log('CheckList deleted successfully', response);
        this.loadCheckLists(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting CheckList', error);
      }
    );
  }

  openUpdateDialog(checkList: CheckListModel): void {
    console.log('Selected checklist:', checkList);
    this.selectedCheckList = checkList;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }
  openAddCheckListModal(): void {
    console.log('add checklist:');
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }

  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedCheckList = null;
  }
  closeAddDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
  }
}
