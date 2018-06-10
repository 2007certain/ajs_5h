import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class LoginService {
    userLoggedIn:Boolean = false;
    constructor(
        private httpClient: HttpClient
    ) { }
    isUserLoggedIn(){
        let data = localStorage.getItem('data');
        if(data){
            return true;
        }else{
            return false;
        }
    }
    setUserLoggedIn(){
        this.userLoggedIn = true;
    }
    logoutUser(){
        this.userLoggedIn = false;
        localStorage.clear();
    }
    makeUserLogin(apiurl, username, password) {
        let loginBody = "username=" + username + "&password=" + password + "&grant_type=password"
        return this.httpClient.post(apiurl, loginBody, {
            headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
        })
    }
}