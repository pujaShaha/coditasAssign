import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http'

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
  constructor(private http : HttpClient) {

  }

  ngOnInit() {
  }

  searchUser(searchText) {
    console.log('searchText', searchText);
    this.http.get("https://api.github.com/search/users?q=" + searchText)
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
      this.isDetails = true;
      console.log('user details data', data);
      this.userDetail = data;
    })
  }
}
