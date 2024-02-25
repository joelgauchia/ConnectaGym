import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@NgModule({
    exports: [
        ButtonModule,
        CardModule,
        TableModule,
        SidebarModule,
        AvatarModule,
        AvatarGroupModule
    ]
})
export class PrimengModule { }