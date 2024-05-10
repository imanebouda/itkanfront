import {Component, OnInit} from '@angular/core';
import {AuditModel} from "../../../../models/audit.model";
import {AuditService} from "../../../../services/AuditServices/audit.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-audit',
  templateUrl: './update-audit.component.html',
  styleUrls: ['./update-audit.component.scss']
})
export class UpdateAuditComponent implements OnInit{
    currentAudit=new AuditModel();

    constructor(
       private  auditService:AuditService,
       private activatedRoute :ActivatedRoute,
       private router : Router
        ) {


    }
    ngOnInit() {
       // this.currentAudit=this.auditService.editAudit(this.activatedRoute.snapshot.params['id']);
        this.auditService.editAudit(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
            this.currentAudit=p;
           // this.newCategoryId = this.currentProduct.category?.idCatecory!;
        });
    }
    updateAudit(){
        //this.auditService.updateAudit(this.currentAudit);
       // this.currentProduct.category=this.categories.find(c=>c.idCatecory==this.newCategoryId);
       // this.auditService.updateAudit(this.currentAudit).subscribe(p =>{
            //this.router.navigate(['products-list'])

        //})

        this.auditService.updateAudit(this.currentAudit.id, this.currentAudit).subscribe(p => {
            // Traitement des résultats de la mise à jour
            this.router.navigate(['list']);
        });
    }


}
