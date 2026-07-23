import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'layout-passport',
  template: `
    <div class="container">
      <div class="wrap">
        <div class="top">
          <div class="head">
            <img class="logo" src="./assets/logo-color.svg" />
            <span class="title">NG-ALAIN</span>
          </div>
          <div class="desc">The Most influential martial art manual in the world</div>
        </div>
        <router-outlet />
        <global-footer [links]="links">
          Copyright
          <i class="anticon anticon-copyright"></i> 2025
          <a href="//github.com/cipchk" target="_blank">Nextelus</a>
        </global-footer>
      </div>
    </div>
  `,
  styleUrls: ['./passport.less'],
  imports: [RouterOutlet, GlobalFooterModule, NzIconModule],
})
export class LayoutPassport {
  private tokenSrv = inject(DA_SERVICE_TOKEN);

  links = [
    {
      title: 'Help',
      href: '',
    },
    {
      title: 'Privacy',
      href: '',
    },
    {
      title: 'Terms',
      href: '',
    },
  ];

  constructor() {
    this.tokenSrv.clear();
  }
}
