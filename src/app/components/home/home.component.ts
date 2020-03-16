import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from 'src/app/services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  myColor: string;
  posts: any[] = [];
  totalPosts: number;
  page: number = 0;
  controlPage: number = 0;
  commentForm: FormGroup;
  loading = false;
  submitted = false;
  dataNotFound: Boolean;
  checkLike: boolean;

  // detalhes photo

  photoDetails: any[] = [];
  photoTags: any[];
  photoComments: any[];


  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private alertService: AlertService,
    private postsService: PostsService,
  ) {
    this.route.params.subscribe(res => console.log(res.id));
    this.route.params.subscribe(res => console.log(res.page));
  
  }

  ngOnInit() {
    this.postsMyFriends();
    this.commentForm = this.formBuilder.group({
      comments: ['',]
    });
  }

  postsMyFriends() {
    this.userService.getMyFriends(this.route.snapshot.params['page'])
      .subscribe(res => {
        this.posts = res.posts
        this.totalPosts = res.totalPosts;
        
        if (this.posts.length == 0) {
          this.dataNotFound = true

        } else {
 
          this.dataNotFound = false
        }

      });
  }
  getDetailsPhoto(photoId: number) {
    this.postsService.getPhotoDetails(photoId)
      .subscribe(
        res => {
          this.photoDetails = res.photo
          this.photoTags = res.tags
          this.photoComments = res.comments
        });
  }

  loadMorePosts() {
    this.controlPage++;
    this.userService.getMyFriends(this.route.snapshot.params['page'] + this.controlPage)
      .subscribe(res => {
        for (let post of res.posts) {
          this.posts.push(post);
        };

      })
  }
  // mesmas funções do profile (LIKE, DISLIKE, CREATECOMMENT) (tentar ajustar com @INPUT OUTPUT e SERVIÇOS)
  verifyLike(photoId: number){
    this.postsService.getCheckLike(photoId)
      .subscribe(
        res => {
          this.checkLike = res.success;
        });
  }
  
  giveLike(photoId: number) {
    this.postsService.like(photoId)
      .subscribe(
        res => {
          this.getDetailsPhoto(photoId);
          this.postsMyFriends();
          this.verifyLike(photoId);
        });
  }
  removeLike(photoId: number) {

    this.postsService.dislike(photoId)
      .subscribe(
        res => {
          this.getDetailsPhoto(photoId);
          this.postsMyFriends();
          this.verifyLike(photoId);
        });
  }


  get c() { return this.commentForm.controls; }

  createComment(photoId: number) {
    this.postsService.createComment(this.c.comments.value, photoId)
      .subscribe(
        res => {
          console.log("Retorno POSTCOMMENT BD")
          this.c.comments.setValue("");
          console.log(res)
          this.getDetailsPhoto(this.photoDetails[0].id)
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          alert('connection error')
        });
  }

  deleteComment(idComment: number) {
    this.postsService.getDeleteComment(idComment)
      .subscribe(
        res => {
          console.log(res)
          this.getDetailsPhoto(this.photoDetails[0].id)
        });
  }

  /**modal scroll 2 */
  openModalPhoto(modalPhoto) {
    this.modalService.open(modalPhoto, { scrollable: true });
  }

  logout() {
    sessionStorage.removeItem('token');
  }


}
