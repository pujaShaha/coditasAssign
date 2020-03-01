import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http : HttpClient) {

  }

  ngOnInit() {
  }

  searchUser(searchText) {
    console.log('searchText', searchText);
    this.http.get("https://api.github.com/search/users" + '?q=' + searchText)
    .subscribe(data => {
      console.log('data', data);
      this.userData = data;
      this.users= this.userData.items;
      this.totalUser = this.userData.total_count;
    })
  }

  userDetails(index) {
    this.isDetails = false ;
    let userName = this.users[index].login ;
    console.log('in detalis method',index);
    this.userDetail = [];
    this.http.get("https://api.github.com/users/" + userName +"/repos")
    .subscribe(data => {
      this.users[index]['isDetails'] = true ;
      //this.isDetails = true;
      console.log('user details data', data);
      this.userDetail = data;
    })
  }

  sortUser(event: any) {
    this.selectedOpn = event.target.value;
    console.log("selected option", this.selectedOpn);
    console.log('usorted array',this.users);
 
    if(this.selectedOpn == 1) {
      console.log('in ato z if');
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
       console.log('in z to a if');
      this.users.sort(function(a, b){
        var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase()
        if (nameA < nameB) //sort string descending
            return 1 
        if (nameA > nameB)
            return -1
        return 0 //default return value (no sorting)
    })
     }
  console.log('sorted array', this.users);
  }
}
