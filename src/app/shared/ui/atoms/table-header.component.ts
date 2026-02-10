import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ui-table-header',
    template: `
    <th>{{ label }}</th>
  `,
})

export class TableHeaderComponent {
    @Input({ required: true }) label!: string;
}

