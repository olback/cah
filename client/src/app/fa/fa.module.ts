import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import {
  faCrown,
  faUser,
  faCheck,
  faFlagCheckered,
  faGavel,
  faClone,
  faCog,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';

import {
  faGithub,
  faTwitter,
  faAngular,
  faNodeJs
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class FAModule {
  constructor() {
    library.add(
      faCrown,
      faUser,
      faCheck,
      faFlagCheckered,
      faGavel,
      faClone,
      faCog,
      faGithub,
      faTwitter,
      faDatabase,
      faAngular,
      faNodeJs
    );
  }
}
