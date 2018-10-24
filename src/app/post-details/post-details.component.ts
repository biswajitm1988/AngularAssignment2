import {Component, OnInit} from '@angular/core';
import {Post} from '../model/post';
import {ActivatedRoute} from '../../../node_modules/@angular/router';
import {PostService} from '../service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;

  constructor(private routeState: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
    this.routeState.params.subscribe(
      params => {
        const id = params['id'];
        this.postService.getPost(id).subscribe(
          data => this.post = data, err => this.post = null);
      });
  }

}
