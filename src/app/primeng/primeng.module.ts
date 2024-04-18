import { NgModule } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

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
        ToastModule,
        ToolbarModule,
        DialogModule,
        TagModule,
        ConfirmDialogModule,
        DropdownModule,
        RadioButtonModule,
        CalendarModule,
        InputTextareaModule,
        FieldsetModule,
        ChartModule,
        PanelModule
    ]
})
export class PrimengModule { }