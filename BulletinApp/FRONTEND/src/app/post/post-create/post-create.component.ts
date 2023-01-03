import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  constructor(public postService: PostServiceService) { }

  //ngOnInit(): void {}

  onaddpost(postform: NgForm) {
    if (postform.invalid) {
      alert('Invalid!');
      return;
    }
    alert(
      "Post Created!"
    );

    const email = localStorage.getItem('email');
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    this.postService.addpost_service(
      postform.value.enteredTitle,
      postform.value.enteredStatus,
      postform.value.enteredDescription,
      postform.value.enteredDepartment,
      email!!,
      currentDate.toString()
    );

    if (postform.submitted != null) {
    }

    postform.resetForm();
  }
}
