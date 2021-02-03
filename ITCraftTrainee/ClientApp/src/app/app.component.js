var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';
let AppComponent = class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.user = new User();
        this.tableMode = true;
        this.activeUsersCount = 0;
        this.UsersCount = 0;
    }
    ngOnInit() {
        this.loadUsers();
    }
    loadUsers() {
        this.dataService.getUsers()
            .subscribe((data) => this.users = data);
    }
    save() {
        if (this.user.id == null) {
            this.dataService.createUser(this.user)
                .subscribe((data) => this.users.push(data));
        }
        else {
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        this.cancel();
    }
    changeActivity(u) {
        this.user = u;
        if (this.user.active == false) {
            this.user.active = true;
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        else {
            this.user.active = false;
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        this.cancel();
    }
    cancel() {
        this.user = new User();
        this.tableMode = true;
    }
    delete(u) {
        this.dataService.deleteUser(u.id)
            .subscribe(data => this.loadUsers());
    }
    popupappear() {
        this.dataService.getUsers()
            .subscribe((data) => this.users = data);
        this.UsersCount = this.users.length;
        for (let u of this.users) {
            if (u.active == true)
                this.activeUsersCount += 1;
        }
        this.cancel();
        this.tableMode = false;
    }
    closepopup() {
        this.activeUsersCount = 0;
        this.cancel();
        this.tableMode = true;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map