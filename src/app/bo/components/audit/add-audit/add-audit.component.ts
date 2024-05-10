import { Component } from '@angular/core';
import {AuditModel} from "../../../../models/audit.model";
import {AuditService} from "../../../../services/AuditServices/audit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent {
   newAudit = new AuditModel();
   constructor(private auditService:AuditService,private router : Router) {

   }
   addAudit(){
    //this.auditService.addAudit(this.newAudit);

       console.log(this.newAudit);
       this.auditService.addAudit(this.newAudit).subscribe( (p)=>{
           console.log('res',p);
       });
   }

}
