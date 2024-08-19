import { Component, Input } from '@angular/core';
import { Comment, Post } from 'src/app/models/post';
import { ManagerService } from 'src/app/Service/manager.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {


  @Input() post!: Post;
  commentDescription = '';

  constructor(private managerService: ManagerService) {
  }

  //add 
  addComment() {
    const comment: Comment = {
      id: 124,
      description: this.commentDescription
    };
    this.managerService.addComment(comment, this.post.id);
  }

  //delete
  deleteComment(id : any) {
    this.managerService.deleteComment(id, this.post.id);
  }

  editComment(data : Comment){

    const comment: Comment = {
      id: data.id,
      description: 'xyz'
    };

    this.managerService.updateComment( comment, this.post.id);
  }

}
