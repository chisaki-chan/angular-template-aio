import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/store/Authentication/auth.models';
import * as validationList from './../../store/validation-access.json'

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    data_validationList: any = []
    constructor(private http: HttpClient) {
        this.data_validationList = Object.values(validationList).filter(item => typeof item === 'object' && !Array.isArray(item));
    }


    validationAccess(role: any, status: any, action: any) {
        // if (action === 'REQUEST-DETAIL-BTN-SAVE') {
        //     console.log({ role: role, status: status, action: action })

        if (this.data_validationList.length > 0) {
            let checkExist = this.data_validationList.filter((item: any) => {
                let roleMatch = item.role ? role ? Array.isArray(item.role) ? item.role.includes(role) : role === item.role : false : true;
                let statusMatch = item.status ? status ? item.status === status.toLowerCase() : false : true;
                let actionMatch = item.action ? action ? item.action === action : false : true;

                return roleMatch && statusMatch && actionMatch;
            });

            return checkExist.length > 0;
        } else {
            return false
        }
        // } else {
        //     return false
        // }

    }

}
