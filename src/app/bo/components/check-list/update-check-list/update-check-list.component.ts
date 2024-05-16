import { Component, OnInit } from '@angular/core';
import { CheckListModel } from 'src/app/models/check-list.model';
import { CheckListService } from 'src/app/services/AuditServices/check-list.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-check-list',
  templateUrl: './update-check-list.component.html',
  styleUrls: ['./update-check-list.component.scss']
})
export class UpdateCheckListComponent implements OnInit {
  currentCheckList = new CheckListModel();

  constructor(
      private checkListService: CheckListService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
          const id = params['id'];
          if (id) {
              this.checkListService.editCheckList(id).subscribe(checkList => {
                  this.currentCheckList = checkList;
              });
          }
      });
  }

  updateCheckList() {
      this.checkListService.updateCheckList(this.currentCheckList.id, this.currentCheckList).subscribe(() => {
          this.router.navigate(['editCheckList/']);
      });
  }
}
