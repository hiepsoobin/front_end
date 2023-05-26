
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    // this._api.get('/api/home/get-moi/5').subscribe(res => {
    //   this.list_item = res.result;
    //   setTimeout(() => {
    //     this.loadScripts('assets/js/main.js');
    //   });
    // });
  }
  ngAfterViewInit() {
    this.loadScripts('assets/content.js');
  }
}
