import {Injectable} from '@angular/core';
import {Http, Response} from '../../../node_modules/@angular/http';
import {Observable} from '../../../node_modules/rxjs';
import {Post} from '../model/post';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  }

  listPost(): Observable<Post[]> {
    return this.http.get(this.baseUrl).pipe(
      map(response => response.json())
    );
  }

  getIdSpecificUrl(id) {
    return this.baseUrl + '/' + id;
  }

  getPost(id: number): Observable<Post> {
    return this.http.get(this.getIdSpecificUrl(id)).pipe(
      map(response => response.json())
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post(this.baseUrl, JSON.stringify(post)).pipe(
      map(response => response.json())
    );
  }

  savePost(post: Post): Observable<Post> {
    return this.http.put(this.getIdSpecificUrl(post.id), JSON.stringify(post)).pipe(
      map(response => response.json())
    );
  }

  deletePost(id: number): Observable<Response> {
    return this.http.delete(this.getIdSpecificUrl(id)).pipe(
      map(response => response)
    );
  }
}
