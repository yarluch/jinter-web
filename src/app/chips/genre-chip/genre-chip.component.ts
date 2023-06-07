import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../../interfaces/interest/tags/tag";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";

@Component({
  selector: 'genre-chip',
  templateUrl: './genre-chip.component.html',
  styleUrls: ['./genre-chip.component.css']
})
export class GenreChipComponent implements OnInit {
  @Input('genre')
  genre: Tag = {
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
    for (let translation of this.genre.translations) {
      if (translation.cultureCode == locale) {
        this.genre.name = translation.name;
        return;
      }
    }
  }
}
