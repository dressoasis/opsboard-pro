import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Incident } from '../../../features/incidents/models/incident.model';

@Component({
    standalone: true,
    selector: 'ui-incident-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './incident-form.component.html',
})
export class IncidentFormComponent implements OnInit {

    @Input() incident?: Incident; // si existe → EDIT
    @Output() save = new EventEmitter<Incident>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            service: ['', Validators.required],
            status: ['open', Validators.required],
            severity: ['medium', Validators.required],
        });

        if (this.incident) {
            this.form.patchValue(this.incident);
        }
    }

    submit(): void {
        if (this.form.invalid) return;

        this.save.emit({
            ...this.incident,     // mantiene id en edit
            ...this.form.value,   // valores del form
        });
    }
}
