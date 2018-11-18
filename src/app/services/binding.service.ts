import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject,BehaviorSubject } from 'rxjs';
import {
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.global_url + 'posts/'

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  warriors = [];
  id = [];
  updatedPost;
  constructor(private http: HttpClient, private router: Router, private _auth:AuthService) {}
  index: number;
  private postsUpdated = new BehaviorSubject({posts:this.warriors,postCount:2});

  getPostUpdateListener()
  {
   return this.postsUpdated.asObservable();
  }

  getPost(pageSize:number,currentPage:number) {
    const query = `?pageSize=${pageSize}&currentPage=${currentPage}`;

    this.id = [];
   return this.http.get < {
      message: string,
      posts: any,
      maxPosts:number
    } > (BACKEND_URL+query).subscribe(res => {
      console.log('getpostid',res);
      for (var i in res.posts)
        this.id.push(res.posts[i]._id);
      console.log(this .id);
      this.warriors = res.posts;
      this.postsUpdated.next({ 
        posts :[...this.warriors],
        postCount:res.maxPosts
      });
      console.log('get is called', this.warriors);
    });
  }
    
  //N.w5z_JvjpAd:Wb
  postData(posts) {
    console.log(posts);
    const postInfo = new FormData();
    postInfo.append('heading', posts.heading);
    postInfo.append('description', posts.description);
    postInfo.append('image', posts.image, posts.heading);
    console.log('postInfo with image', postInfo)
    this.http.post < { message: string, post: any } > (BACKEND_URL, postInfo).subscribe(res => {
      // console.log('res with image', res);
      // console.log('res image', res['post']._doc.imagePath);
      // const post = {
      //   _id: res['post']._doc._id,
      //   imagePath: res['post']._doc.imagePath,
      //   heading: posts.heading,
      //   description: posts.description
      // }
      // this.warriors.push(post);
      // console.log('warriors updated',[...this.warriors]);
      this.router.navigate(['/']);
      console.log('postdata', this.warriors);
    });
  }

  updatePost(id, posts) {
    let postData:FormData | any;
    if (typeof (posts.image) === 'object') {
      postData = new FormData();
      postData.append('_id', posts._id);
      postData.append('heading', posts.heading);
      postData.append('description', posts.description);
      postData.append('image', posts.image, posts.heading);
    } else {
      postData = {
        _id: posts._id,
        heading: posts.heading,
        image: posts.image,
        description: posts.description
      };
    }
    this.updatedPost = { ...postData
    };
    this.updatedPost._id = id;
    console.log('updated posts', this.updatedPost);
    this.http.put < {
      message: string,
      res: any
    } > (BACKEND_URL + id, postData).subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);

    });
  }

  //this will give the warrior whose edit button has been pressed
  fetchPost(id: string) {
    console.log('fetchid' + id);
    console.log({...this.warriors});
    return { ...this.warriors.find(p => p._id === id)}
  }

  deleteData(id) {
   return this.http.delete(BACKEND_URL + id);
  }

}
