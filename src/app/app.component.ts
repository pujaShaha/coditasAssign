import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coditasAssignment';
  userData ;
  userDetail ;
  isDetails = false ;
  totalUser = 0 ;
  users;
  selectedOpn = -1;
  dataOfUser = [];
  p = 1;
  count = 5;
  datalength = 0;
  isDataLoaded = true ;
  constructor(private http : HttpClient) {

  }

  ngOnInit() {
    this.http.get('https://api.github.com/users')
    .subscribe(data => {
        this.users = data;
        this.datalength = this.users.length;
        this.totalUser = this.datalength;
        this.isDataLoaded = false ;
    })
  }

  searchUser(searchText) {
    this.p = 1
    this.isDataLoaded = true;
    this.userData = [];
    this.users = [];
    this.datalength = 0 ;
    this.totalUser = 0;
    this.http.get("https://api.github.com/search/users" + '?q=' + searchText)
    .subscribe(data => {
      this.userData = data;
      this.users= this.userData.items;
      console.log('userData', this.users);
      this.datalength = this.users.length;
      this.totalUser = this.userData.total_count;
      this.isDataLoaded = false ;
    })
  }

  userDetails(userName) {
    for(let i=0; i<this.users.length ; i++) {
      if(this.users[i].isDetails) {
        this.users[i]['isDetails'] = false ;
      }
    }
    this.isDetails = false ;
    this.userDetail = [];
    this.http.get("https://api.github.com/users/" + userName +"/repos")
    .subscribe(data => {
      this.users.forEach(user => {
        if(user.login == userName)
        {
          user['isDetails'] = true;
        }
      });
      this.userDetail = data;
    })
  }

  sortUser(event: any) {
    this.isDataLoaded = true ;
    this.selectedOpn = event.target.value;
    if(this.selectedOpn == 1) {
      this.isDataLoaded = false ;
      this.users.sort(function(a, b){
        var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    }
     else if(this.selectedOpn == 2) {
      this.isDataLoaded = false ;
      this.users.sort(function(a, b){
        var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase()
        if (nameA < nameB) //sort string descending
            return 1 
        if (nameA > nameB)
            return -1
        return 0 //default return value (no sorting)
    })
     }
  }
}
