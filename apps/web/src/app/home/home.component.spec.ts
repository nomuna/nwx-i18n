import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { CfgModule, AppCfg, CFG_OPTIONS } from '@nwx/cfg';

import { LogModule } from '@nwx/logger';

import { Observable, of as observableOf } from 'rxjs';
import {
  TranslateLoader,
  TranslateModule,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { I18nModule } from 'pkgs/i18n';

export const I18nTranslations = {
  de: {
    'COMMON.WELCOME': 'herzlich willkommen',
    'COMMON.ABOUT': 'Über'
  },
  en: {
    'COMMON.WELCOME': 'Welcome',
    'COMMON.ABOUT': 'About'
  },
  es: {
    'COMMON.WELCOME': 'Bienvenido',
    'COMMON.ABOUT': 'Acerca de'
  },
  fa: {
    'COMMON.WELCOME': 'خوش آمدی',
    'COMMON.ABOUT': 'در باره'
  },
  fr: {
    'COMMON.WELCOME': 'Bienvenue',
    'COMMON.ABOUT': 'Sur'
  },
  he: {
    'COMMON.WELCOME': 'ברוך הבא',
    'COMMON.ABOUT': 'על אודות'
  },
  'zh-cn': {
    'COMMON.WELCOME': '欢迎',
    'COMMON.ABOUT': '关于'
  }
};

const AppEnv: AppCfg = {
  appName: '@nwx/i18n',
  production: true
};

class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return observableOf(I18nTranslations[lang]);
  }
}

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CfgModule.forRoot(AppEnv),
        LogModule,
        I18nModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: CustomLoader }
        })
      ],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  it('should create the @nwx/i18n', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title '@nwx/i18n'`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('@nwx/i18n');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to @nwx/i18n!');
  }));

  it('should render title in a h1 tag in french', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.i18n.setCurrentLanguage('fr');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    fixture.componentInstance.i18n.languageChange$.subscribe(lang => {
      expect(lang).toBe('fr');
      expect(fixture.componentInstance.i18n.direction).toBe('ltr');
      expect(compiled.querySelector('h1').textContent).toContain(
        'Bienvenue to @nwx/i18n!'
      );
    });
  }));

  it('should render title in a h1 tag in persian', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.i18n.setCurrentLanguage('fa');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    fixture.componentInstance.i18n.languageChange$.subscribe(lang => {
      expect(lang).toBe('fa');
      expect(fixture.componentInstance.i18n.direction).toBe('rtl');
      expect(compiled.querySelector('h1').textContent).toContain('خوش آمدی');
    });
  }));
});
