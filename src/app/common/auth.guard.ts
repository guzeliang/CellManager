import { Injectable }          from '@angular/core';
import { CanActivate, Router } from'@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _cookieService: CookieService) {}
    
    public canActivate() {
        if (this._cookieService.get('name')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
