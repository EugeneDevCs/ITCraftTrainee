import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from './data.service';
import { User } from './user';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {
   
    user: User = new User();   
    users: User[];               
    tableMode: boolean = true;
    activeUsersCount = 0;
    UsersCount = 0;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadUsers();    
    }
    loadUsers() {
        this.dataService.getUsers()
            .subscribe((data: User[]) => this.users = data);
        console.log('here')
    }
    save() {
        if (this.user.id == null) {
            this.dataService.createUser(this.user)
                .subscribe((data: User) => this.users.push(data));
        } else {
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        this.cancel();
    }
    changeActivity(u: User) {
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
    delete(u: User) {
        this.dataService.deleteUser(u.id)
            .subscribe(data => this.loadUsers());
    }
    popupappear() {
        this.dataService.getUsers()
            .subscribe((data: User[]) => this.users = data);
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
}