import { NgModule } from '@angular/core';

import { FilterNamePipe } from './filterName.pipe';
import { OrderBy } from './orderBy.pipe';

@NgModule({
    imports: [],
    exports: [
        FilterNamePipe,
        OrderBy
    ],
    declarations: [
        FilterNamePipe,
        OrderBy
    ],
    providers: [],
})
export class DevManagerPipesModule { }
