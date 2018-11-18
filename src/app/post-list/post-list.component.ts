import { Component, OnInit, OnDestroy } from '@angular/core';
import { BindingService } from '../services/binding.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean;
  warriorArray = [];
  index: number;
  totalPosts = 0;
  userId: string;
  pageSizeArray = [1, 3, 5, 10];
  postsPerPage = 1;
  currentPage = 1;
  isLoading = false;
  private postsSubscription: Subscription;
  constructor(private _bind: BindingService, private _authService: AuthService) {}
  ngOnInit() {

    this.userIsAuthenticated = this._authService.isAuthenticated;
    this._bind.getPost(this.postsPerPage, this.currentPage);
    this.userId = this._authService.getUserId();
    this.postsSubscription = this._bind.getPostUpdateListener().subscribe(res => {
      this.warriorArray = res.posts;
      console.log('yes', res.posts);
      this.totalPosts = res.postCount;
      console.log('postcount', res.postCount);
      this.userId = this._authService.getUserId();
      this.isLoading = false;
    });
    console.log('warrior array', this.warriorArray);
    console.log('post list started');
  }


  onDelete(id) {
    this._bind.deleteData(id).subscribe(res => {
      this._bind.getPost(this.postsPerPage, this.currentPage);
    });
    for (var i = 0; i < this.warriorArray.length; i++) {
      if (this.warriorArray[i]._id == id) {
        this.index = i;
      }

    }
    this.warriorArray.splice(this.index, 1);
    //  console.log('index',this.index);
    //  console.log('id',id);
    // console.log(this.warriorArray);
  }

  onPageChange(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this._bind.getPost(this.postsPerPage, this.currentPage);
    //  this.warriorArray = this._bind.warriors;

    //  this.postsSubscription = this._bind.getPostUpdateListener().subscribe( (warriors:any[]) => {
    //   this.warriorArray = this._bind.warriors;
    //   console.log('yes',this._bind.warriors);
    // });
    console.log(this.warriorArray);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
