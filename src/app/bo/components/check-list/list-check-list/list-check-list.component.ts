import { Component, OnInit } from '@angular/core';
import { CheckListModel } from 'src/app/models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service'; 
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-check-list',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListCheckListComponent implements OnInit {
  checkLists: CheckListModel[] = [];
  is_loading: boolean = true;
  formulaireRecherche: FormGroup;
  typeChecklistList: any[] = [];

  constructor(private checkListservice: CheckListService) {}
  
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
    this.checkListservice.CheckListList().subscribe(
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
    this.checkListservice.getTypeCheckLists().subscribe(
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
      this.checkListservice.searchCheckListsByType(typeChecklistId).subscribe(
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
    this.checkListservice.deleteCheckList(checkListData.id).subscribe(
      response => {
        console.log('CheckList deleted successfully', response);
        this.loadCheckLists(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting CheckList', error);
      }
    );
  }  
}
