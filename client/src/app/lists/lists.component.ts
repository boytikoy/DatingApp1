import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../_modules/member';
import { MembersService } from '../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../_models/pagination';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  @ViewChild('deleteUserLike') deleteButton: NgForm | undefined;
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getlikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }


}
