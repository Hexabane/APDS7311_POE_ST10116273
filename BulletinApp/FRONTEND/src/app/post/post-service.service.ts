import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private postsdisplay: {
    _id: string;
    title: string;
    status: string;
    description: string;
    department: string;
    email: string;
    createdAt: string;
    __v: string;
  }[] = [];

  private updatepostsdisplay = new Subject<
    {
      _id: string;
      title: string;
      status: string;
      description: string;
      department: string;
      email: string;
      createdAt: string;
      __v: string;
    }[]
  >();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('user auth');
  }

  addpost_service(
    ptitle: string,
    pstatus: string,
    pdescription: string,
    pdepartment: string,
    pemail: string,
    pcreatedAt: string
  ) {
    this.http
      .post<{ message: string; post: any }>('https://localhost:3000/api/post', {
        title: ptitle,
        status: pstatus,
        description: pdescription,
        department: pdepartment,
        email: pemail,
        createdAt: pcreatedAt,
      })
      .subscribe((thepost) => {
        this.postsdisplay.push(thepost.post);
        this.updatepostsdisplay.next([...this.postsdisplay]);
      });
  }

  getpost_service() {
    this.http
      .get<{ message: any; posts: any }>('https://localhost:3000/api/post')
      .subscribe((thepost) => {
        console.log(thepost, thepost.posts);
        this.postsdisplay = thepost.posts;
        this.updatepostsdisplay.next([...this.postsdisplay]);
      });
  }

  deletepost_service(postid: string) {
    this.http
      .delete('https://localhost:3000/api/post/' + postid)
      .subscribe(() => {
        const updatepostdeleted = this.postsdisplay.filter(
          (post) => post._id !== postid
        );
        this.postsdisplay = updatepostdeleted;
        this.updatepostsdisplay.next([...this.postsdisplay]);
      });
  }

  getUpdateListener() {
    return this.updatepostsdisplay.asObservable();
  }
}
