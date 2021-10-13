import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";


@Injectable()
export class ListResolver implements Resolve<User[]>{
    pageNumber= 1;
    pageSize=6;
    likeParam ='Likers'
    constructor(private userService:UserService,private router:Router,private alertify:AlertifyService) {  
    }
    resolve(route:ActivatedRouteSnapshot):Observable<User[] | any>{
        return this.userService.getUsers(this.pageNumber,this.pageSize,null,this.likeParam).pipe(
            catchError(error =>{
                this.alertify.error('يوجد مشكلة ف عرض البيانات');
                this.router.navigate(['']);
                return of(null);
            }
             
            )
        )
    }
}