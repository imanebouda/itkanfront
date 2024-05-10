import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { ParametrageService } from 'src/app/services/services';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['./update-site.component.scss']
})
export class UpdateSiteComponent {
/* ------------------------------ Les variables globales ----------------------------- */
Afficher_params: Subscription;
Modifier: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
@Input('data_selected_parametrage') data_selected_parametrage: any; // data de l'utilisateur
is_loading: boolean = true;
/* ----------------------- les variables du formulaire ---------------------- */
Formmulaire_update_parametrage: FormGroup;
IsFiled: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
    private generalService: GeneralService,
    private site_service : SiteService
) {
    /* ---------------------- Initialisation du formulaire ---------------------- */
    this.Formmulaire_update_parametrage = new FormGroup({
        ID: new FormControl(null, Validators.required),
        /* ---------------------------- les champs requis --------------------------- */
        Libelle: new FormControl(null, [
            Validators.required,
        ]),
        Description: new FormControl(null, [
            Validators.required
        ])
    });
}

ngOnInit(): void {
    
    let fields: any[] = [
        'ID',
        'Libelle',
        'Description'
    ];
    fields.forEach((element) => {
        this.Formmulaire_update_parametrage.get(element).setValue(
            this.data_selected_parametrage.hasOwnProperty(element)
                ? this.data_selected_parametrage?.[element]
                : null
        );
    });
            
    setTimeout(() => {
        this.is_loading = false;
    }, 500);
}

/* -------------------------------------------------------------------------- */
/*                             Gestion des erreurs                            */
/* -------------------------------------------------------------------------- */

error(message: any) {
    this.is_loading = false;
    this.Error = 1;
    this.ApiMessage = message;
    this.Disabled = false;
    this.Ifmessage = true;
    setTimeout(() => {
        this.Ifmessage = false;
    }, 3000);
}

success(message: any, if_same_as_logger: boolean = false) {
    /* -------------------------------------------------------------------------- */
    /*                       Si c'est un self UPDATE DE Parametrage                      */
    /* -------------------------------------------------------------------------- */
    if (if_same_as_logger) {
        /* -------------------------------------------------------------------------- */
        /*                               UPDATE SESSION                               */
        /* -------------------------------------------------------------------------- */
        let session_data: any[] = [
            {
                key: 'name',
                value: this.Formmulaire_update_parametrage.value
                    .name,
            },
            {
                key: 'value',
                value: this.Formmulaire_update_parametrage.value
                    .value,
            },
        ];
        this.generalService.set_DataSession(session_data);
    }

    this.Error = 0;
    this.ApiMessage = message;
    this.Ifmessage = true;
    setTimeout(() => {
        this.ClosePopUp(true);
        this.Ifmessage = false;
        this.Error = 0;
        this.ApiMessage = '';
        this.Disabled = false;
        this.is_loading = false;
    }, 500);
}

get FormulaireErrors() {
    return this.Formmulaire_update_parametrage.controls;
}

/* ------------------------ Lors du click sur valider ----------------------- */

SubmitForm() {
    this.IsFiled = true;
    
    if (this.Formmulaire_update_parametrage.valid) {
        this.is_loading = true;
        this.Disabled = true;
        this.CallApiUpdate();
    } else {
        this.error('Formulaire invalide !');
    }
}

CallApiUpdate() {
    this.Modifier = this.site_service 
        .ModifieParametrage(this.Formmulaire_update_parametrage.value)
        .subscribe((r: any) => {
            r = JSON.parse(r);

            switch (r?.['msg']) {
                case 'Modifié':
                    this.success(
                        'site modifié(e)'
                    );
                    break;
                default:
                    this.error(r?.['msg']);
                    break;
            }
        });
}

/* ----------------------------- Fermer le popup ---------------------------- */
ClosePopUp(state: boolean) {
    this.FermerPopUp.emit(state);
}

/* -- Lors de la destruction du composant pour ne pas avoir les memories leaks --*/

ngOnDestroy(): void {
    let unsubscribe_liste: any[] = [
        this.Modifier,
        this.Restaurer,
        this.Afficher_params,
    ];
    unsubscribe_liste.forEach((element: any) => {
        if (element) {
            element.unsubscribe();
        }
    });
}
}
