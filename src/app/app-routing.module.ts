import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ForgotpasswordComponent } from "./components/forgotpassword/forgotpassword.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guard/auth.guard";
import { HotelDetailsComponent } from "./components/home/hotel-details/hotel-details.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'hotels', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'hotel/:hotelId/:roomId', component: HotelDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }