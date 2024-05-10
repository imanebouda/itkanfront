import { Component } from '@angular/core';
import {AuditModel} from "../../../../models/audit.model";
import {AuditService} from "../../../../services/AuditServices/audit.service";
import {Subscription} from "rxjs";
import {ProcessusService} from "../../../../services/processus/processus.service";
//import {AuditModel} from "../audit.module";

@Component({
  selector: 'app-list-audit',
  templateUrl: './list-audit.component.html',
  styleUrls: ['./list-audit.component.scss']
})
export class ListAuditComponent {
    Afficher_params: Subscription;
  audits :AuditModel[];
   /*constructor(private auditService :AuditService) {
   //this.audits = auditService.auditList();
       //auditService.auditList().subscribe()
       auditService.auditList().subscribe(p=>{
           //console.log(p);
           this.audits=p;

       })
   }*/
    constructor(private auditService: AuditService,private  processus_src : ProcessusService) {
        this.loadAudits();
    }

    loadAudits() {
        this.auditService.auditList().subscribe(
            audits => this.audits = audits,
            error => console.error('Error fetching audits:', error)
        );
    }
    deleteAudit(auditData: any): void {
        this.auditService.deleteAudit(auditData)
            .subscribe(
                (response) => {
                    console.log('Audit supprimé avec succès', response);
                    // Faire quelque chose avec la réponse si nécessaire
                },
                (error) => {
                    console.error('Erreur lors de la suppression de l\'audit', error);
                    // Gérer l'erreur si nécessaire
                }
            );
    }
  /* GetAllProcessus() {
        this.Afficher_params = this.processus_src.GetAllProcessus().subscribe((res: any) => {
            console.log(res);
            if (res) {
                -------------------------------- Les rôles -------------------------------
                if (res.length > 0) {
                    this.processusList  = res.map((element: any) => ({
                        value: element.id,
                        label: element.libelle // Utilisez libelle au lieu de label si c'est le nom correct de la propriété
                    }));
                }
            } else {
                this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
            }
        });
    }*/

    /*deleteAudit(id: number): void {
    this.auditService.deleteAudit(id).subscribe(
        response => {
    console.log('Audit supprimé avec succès', response);
    // Traitez la réponse ou affichez un message de succès à l'utilisateur si nécessaire

        },
            error => {
    console.error('Erreur lors de la suppression de l\'audit', error);
    // Affichez un message d'erreur à l'utilisateur ou effectuez une autre action en cas d'erreur

        }
        );
   }*/
    /*deleteAudit(audit: AuditModel) {
        const message = confirm("Are you sure you want to delete this audit?");
        if (message) {
            this.auditService.deleteAudit(audit.id!).subscribe(() => {
                console.log('Audit deleted successfully');
                // Optionally, update the audits list after successful deletion
                this.loadAudits();
            });
        }
    }*/
   /*
    deleteAudit(audit: AuditModel) {
        let message = confirm("Êtes-vous sûr de vouloir supprimer cet audit ?");
        if (message) {
            this.auditService.deleteAudit(audit.id!).subscribe(() => {
                console.log('Audit supprimé avec succès');
                // Optionnellement, vous pouvez mettre à jour la liste des audits après la suppression réussie
                this.audits = this.audits.filter(a => a.id !== audit.id);
            });
        }
    }*/
    /*deleteAudit(audit : AuditModel){
       let message =confirm("Are you sue to delete this audit?")
        if (message)
            this.auditService.deleteAudit(audit.id!).subscribe(()=>{
                console.log('Audit supprimé avec succès');

            });

    }*//*
     deleteProduct(product:ProductModel){
    let message =confirm("Are you sure to delete this product ? ");
    if(message)
    this.productService.deleteProduct(product.idProduct!).subscribe(()=>{
      this.loadProducts();

    });
  }*/

}
