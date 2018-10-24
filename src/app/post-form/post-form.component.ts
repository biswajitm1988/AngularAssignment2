import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '../../../node_modules/@angular/router';
import {PostService} from '../service/post.service';
import {Post} from '../model/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isNew: boolean;
  post: Post;
  errMsg: string;
  successMsg: string;

  constructor(private postService: PostService,
              private routeState: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeState.params.subscribe(params => {
      if (params['id'] == null) {
        this.isNew = true;
        this.post = new Post();
      } else {
        this.isNew = false;
        const id = params['id'];
        this.postService.getPost(id).subscribe(
          data => {
            this.post = data;
            this.errMsg = null;
            console.log(this.post);
          },
          error => {
            this.errMsg = 'Failed to invoke service';
            console.log(error);
          }
        );
      }
    });
  }

  savePost() {
    console.log(this.isNew);
    console.log(this.post);
    this.errMsg = null;
    this.successMsg = null;
    if (!this.isNew) {
      console.log('save');
      this.postService.savePost(this.post).subscribe(
        data => {
          this.post = data;
          this.errMsg = null;
          this.successMsg = 'Post Saved Successfully';
          console.log(data);
        },
        error => {
          this.errMsg = 'Failed to invoke service';
          console.log(error);
        }
      );
    } else {
      console.log('Add');
      this.postService.addPost(this.post).subscribe(
        data => {
          this.post = data;
          this.errMsg = null;
          this.successMsg = 'Post Added Successfully';
          console.log(data);
        },
        error => {
          this.errMsg = 'Failed to invoke service';
          console.log(error);
        }
      );
    }
    console.log(this.post);
  }

}
