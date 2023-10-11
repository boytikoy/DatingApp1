import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_modules/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ListsComponent } from 'src/app/lists/lists.component';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined
  @ViewChild('deleteUserLike') deleteButton: NgForm | undefined;
  test: ListsComponent | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService) { }


  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs),
    })
  }

  deleteLike(member: Member) {
    this.memberService.removeLike(member.userName).subscribe({
      next: () => {
        this.toastr.info('User ' + member.knownAs + ' unliked')
      }
    })

  }

}
