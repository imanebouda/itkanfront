import { TypeCheckListModel } from "./type-check-list.model";

export class CheckListModel{
    id !: number ;
    name !: string;
    niveau !: string;
    code !: string;
    description !: string;
    //Audit?: AuditModel;
    type : TypeCheckListModel;
}