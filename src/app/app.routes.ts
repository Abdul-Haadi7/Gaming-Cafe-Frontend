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

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {path:'newAcc', component: NewAccComponent},
    {path:'customerHome', component: CustomerComponent,canActivate: [authGuard, roleGuard(['Customer'])]},
    {path:'devHome', component: DeveloperComponent,canActivate: [authGuard, roleGuard(['Developer'])]},
    {path:'superAdminHome', component: SuperAdminComponent,canActivate: [authGuard, roleGuard(['Super Admin'])]},
    {path:'adminHome', component: AdminComponent,canActivate: [authGuard, roleGuard(['Admin'])]}
];