import { Component } from '@angular/core';
import { CheckListModel } from '../../../../models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service'; 
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from 'src/app/services/services';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-site-audit',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListCheckListComponent {
  checkLists: CheckListModel[];
  Afficher_params: Subscription;
  currentCheckList = new CheckListModel();
  is_loading: boolean = true;
  FormmulaireRecherche: FormGroup;
  categorieList: any = [];
  public generalService: GeneralService;
  skip: any = 0;
    take: any = 10;
    order: any = 'DESC';
    colone: any = 'ID';
    totalRecords: any = 0;
    listDeclaration: any[] = [];
    formulaireRecherche: FormGroup;
    detailProcessus :any ;
    canActivate :any ;
    imageUrl: any = 'assets/layout/images/user-cicrle.svg';
    selectedOdsToPrint: any;
  
    Header_info: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_ddp: any;
    if_show_detail: boolean = false;
    data_selected_phrasier: any;
    data_selected_processus: any;
    NamePilote: string ;
    processesWithPilots: any[]=[];
    typeChecklistList: any;
  constructor(private checkListservice: CheckListService) {
      
  }
  ngOnInit(): void {
    this.DisplayCheckListAudit();
    this.loadCheckLists();
    this.formulaireRecherche = new FormGroup({
      code: new FormControl(''), // Vous pouvez fournir une valeur par défaut si nécessaire
      titre: new FormControl(''),
      typeChecklist: new FormControl('')
    });
    
  }
  SearchCheckListAudit() {
  //this.skip = 0;
 // this.take = 10;
  setTimeout(() => {
      this.DisplayCheckListAudit();
  }, 100);
}
ClearSearch(){}
DisplayCheckListAudit() {
 
  
}

loadCheckLists() {
  this.checkListservice.CheckListList().subscribe(
    checkLists => {
      this.checkLists = checkLists;
      this.totalRecords = this.checkLists.length;
      this.is_loading = false;
    },
    error => {
      console.error('Error fetching checkLists:', error);
      this.is_loading = false;
    }
  );
}

  deleteCheckList(checkListData: CheckListModel): void {
      this.checkListservice.deleteCheckList(checkListData.id, checkListData)
          .subscribe(
              (response: any) => {
                  console.log('CheckList supprimé avec succès', response);
                  // Faire quelque chose avec la réponse si nécessaire
              },
              (error: any) => {
                  console.error('Erreur lors de la suppression du CheckList', error);
                  // Gérer l'erreur si nécessaire
              }
          );
          
  }
  searchCheckLists(): void {

  }
  clearSearch(): void {
  
  }
  initializeForm(): void {
    this.formulaireRecherche = new FormGroup({
      code: new FormControl(''),
      titre: new FormControl(''),
      typeChecklist: new FormControl('')
    });
  }

  
}
