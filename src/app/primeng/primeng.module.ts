import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [],
    exports: [
        ButtonModule,
        CardModule,
        TableModule,
        SidebarModule,
        AvatarModule,
        AvatarGroupModule,
        CheckboxModule,
        InputTextModule,
        ToastModule
    ]
})
export class PrimengModule { }