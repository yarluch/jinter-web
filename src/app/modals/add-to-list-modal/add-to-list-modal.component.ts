import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ContentVisibilityControllerService} from "../../services/content-visibility-controller.service";
import {ListCardData} from "../../interfaces/list/listCardData";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestService} from "../../services/api/interest.service";

@Component({
  selector: 'add-to-list-modal',
  templateUrl: './add-to-list-modal.component.html',
  styleUrls: ['./add-to-list-modal.component.css']
})
export class AddToListModalComponent implements OnInit {

  userLists: Array<ListCardData> = [];

  userId = ''

  @Input('interest-id')
  interestId: string = '';

  @HostBinding('class') class!: string;
  constructor(private visibilityControllerService :ContentVisibilityControllerService,
              private currentUserService: CurrentUserDataService,
              private interestService: InterestService) {
    visibilityControllerService.getIsDialogBlackoutActive().subscribe(isActive =>
      this.class = isActive ? 'active': ''
    );

    currentUserService.getUserObservable().subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    })
  }

  ngOnInit(): void {
    this.interestService.getUserLists(<string>this.currentUserService.getUserId()).subscribe(
      data => {
        for (let list of data) {
          if (list.creator == this.userId) {
            this.userLists.push(list);
          }
        }
      },
      error => {
        console.error('Error occurred');
      }
    );
  }

  closeDialog(){
    this.visibilityControllerService.setIsDialogBlackoutActive(false);
  }

  addToList(listId: string) {
    this.interestService.addInterestToList(this.interestId, listId).subscribe(
      data => {
        this.closeDialog();
      },
      error => {
        console.error(error)
      }
    );
  }
}
