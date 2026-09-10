import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { NewAccComponent } from './new-acc/new-acc/new-acc.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { DeveloperComponent } from './developer/developer/developer.component';
import { Component } from '@angular/core';
import { SuperAdminComponent } from './super-admin/super-admin/super-admin.component';
import { AdminComponent } from './admin/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UploadGameComponent } from './upload-game/upload-game/upload-game.component';
import { GameRequirementsComponent } from './game-requirements/game-requirements/game-requirements.component';
import { EditGameComponent } from './edit-game/edit-game/edit-game.component';
import { EditRequirementsComponent } from './edit-requirements/edit-requirements/edit-requirements.component';
import { GameDetailsComponent } from './game-details/game-details/game-details.component';
import { CustomerCartComponent } from './customer-cart/customer-cart/customer-cart.component';
import { UploadRequestsComponent } from './developer/upload-requests/upload-requests.component';
import { UploadRequestsReceived } from './admin/upload-requests/upload-requests.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {path:'newAcc', component: NewAccComponent},
    {path:'customerHome', component: CustomerComponent,canActivate: [authGuard, roleGuard(['Customer'])]},
    {path:'devHome', component: DeveloperComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'superAdminHome', component: SuperAdminComponent,canActivate: [authGuard, roleGuard(['Super Admin'])]},
    {path:'adminHome', component: AdminComponent,canActivate: [authGuard, roleGuard(['Admin'])]},
    {path:'uploadGame', component: UploadGameComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'addRequirements/:gameId', component: GameRequirementsComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'editGame/:gameId', component: EditGameComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'editReq/:gameId', component: EditRequirementsComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'gameDetails/:gameId', component: GameDetailsComponent,canActivate: [authGuard, roleGuard(['Developer','Customer','Admin','Super Admin'])]},
    {path:'cart', component: CustomerCartComponent,canActivate: [authGuard, roleGuard(['Customer'])]},
    {path:'uploadRequestsSent', component: UploadRequestsComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'uploadRequestsReceived', component: UploadRequestsReceived,canActivate: [authGuard, roleGuard(['Super Admin','Admin'])]}
];