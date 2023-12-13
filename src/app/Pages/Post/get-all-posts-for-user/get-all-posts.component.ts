import { Component } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Post } from '../../../Models/post';
import { Category } from '../../../Models/category';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../Models/review';



@Component({
  selector: 'app-get-all-posts',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-all-posts.component.html',
  styleUrl: './get-all-posts.component.css'
})
export class GetAllPostsComponent  {
  posts:Post[]=[];
  postTitle:string='';
  postId?:number;
  post:Post;
  categories:Category[]=[];
  categoryId?:number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
 
  // review:Review;
constructor(private http:HttpClient,private router:Router)
{
  this.getAllPost();
  this.post=new Post();
  this.getAllCategory();
  // this.review = new Review();
}
ngOnInit() {
 this.getAllPost();
}
getAllPost(){
   const userRole = localStorage.getItem('userRole') ?? 'Guest';
//   // if (userRole == "User") {
//   //   this.review = { action1: "Edit", action2: "Delete" };
//   // } else if (userRole == "Admin") {
//   //   this.review = { action1: "Approve", action2: "Deny" };
//   // }
  // this.http.get<Post[]>('http://localhost:5293/api/Post/GetAllPosts',{ params:{ role: userRole } }).subscribe((response) =>{
    this.http
    .get<Post[]>('http://localhost:5293/api/Post/GetAllPosts', {
      params: { Role: userRole },
      headers: this.httpOptions.headers,
    }).subscribe((response) =>{
    if(response!=null && response.length > 0){
       this.posts=response;
       console.log("Posts",this.posts);
     }
   });
}
getAllCategory(){
  this.http.get<Category[]>('http://localhost:5293/api/Category/GetAllCategories',this.httpOptions).subscribe((response) =>{
    this.categories=response;
    console.log(this.categories);
  });
}

getPostByCategoryId() {
  if(this.categoryId!=null){
    const url = `http://localhost:5293/api/Post/GetPostByCategoryId/${this.categoryId}`;
    
    this.http.get<Post[]>(url,this.httpOptions).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.posts = response;
          console.log(this.posts);
        } else {
          console.log(`No posts found for category ${this.categoryId}`);
          this.posts = [];
        }
      },
      (error) => {
        console.error('Error fetching posts:', error);
        
      }
    );
  }
}
  
// delete(postId: any) {
  
//   this.postId = postId;
//   this.http
//     .delete('http://localhost:5293/api/Post/DeletePost/' + this.postId)
//     .subscribe((response) => {
//       console.log(response);
//       this.router.navigateByUrl('/user-dashboard/getallposts');
//     });
// }
// edit(postId:any){
//   this.router.navigateByUrl('/user-dashboard/edit-post/' + postId);

// }
// view(userId: number) {
//   this.http.get<Post[]>(`http://localhost:5293/api/Post/GetPostByUserId/${userId}`).subscribe(
//     (response) => {
//       if (response && response.length > 0) {
//         this.posts = response;
//         console.log(this.posts);
//       } else {
//         console.log(`No posts found for user ${userId}`);
//         this.posts = [];
//       }
//     },
//     (error) => {
//       console.error('Error fetching posts:', error);
//     }
//   );
// }
// 
view(postId:any){
  this.router.navigateByUrl('/user-dashboard/viewpost/'+postId);
}
}








