import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent implements OnInit {

  @Input('url')
  url: string = '';

  @Input('is-video')
  isVideo = false

  constructor() { }

  ngOnInit(): void {
    if (this.isVideo)
      this.url = `http://img.youtube.com/vi/${this.getVideoId(this.url)}/hqdefault.jpg`
  }
  getVideoId(url: string) {
    /*name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");*/
    var regex = new RegExp("[\?&]v=([^&#]*)"),
      results = regex.exec(url);
    return results === null ? url.replace(/.+\//, "")
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
