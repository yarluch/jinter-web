import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../../interfaces/interest/tags/tag";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";

@Component({
  selector: 'tag-chip',
  templateUrl: './tag-chip.component.html',
  styleUrls: ['./tag-chip.component.css']
})
export class TagChipComponent implements OnInit {

  @Input('tag')
  tag: Tag = {
    id: "",
    name: "",
    translations: Array()
  }

  constructor(private localeControllerService : LocaleControllerService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateText(locale);
    });
  }

  ngOnInit(): void {
    this.updateText(this.localeControllerService.getCurrentLocale());
  }

  moveToSearch() {

  }

  private updateText(locale: Locale) {
    for (let translation of this.tag.translations) {
      if (translation.cultureCode == locale) {
        this.tag.name = translation.name;
        return;
      }
    }
  }
}
