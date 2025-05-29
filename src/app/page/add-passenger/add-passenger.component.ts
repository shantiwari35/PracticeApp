import { AfterViewInit, Component, ElementRef, OnInit, signal, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Form } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-add-passenger',
    imports: [
        MatButtonModule,
        MatStepperModule,
        FormsModule,CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,MatSelectModule,
        MatStepperModule, MatFormFieldModule,
        MatRadioModule, MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './add-passenger.component.html',
    styleUrl: './add-passenger.component.scss'
})
export class AddPassengerComponent implements OnInit, AfterViewInit {
    @ViewChildren('stepper') stepper?: MatStepper;
    // stepper=viewchild('stepper');
    @ViewChild('firstForm') firstForm?: ElementRef;
    @ViewChild('secondForm') secondForm?: ElementRef;
    options=signal<string[]>(['Passenger','Driver','Owner','Other']);
    secondFormGroup!: FormGroup;
    isLinear: boolean = false;

    firstFormGroup = new FormGroup<any>({
        firstName: new FormControl('abv', Validators.required),
        lastName: new FormControl('abv', Validators.required),
        age: new FormControl('abv', Validators.required),
        gender: new FormControl('abv', Validators.required),
        dob: new FormControl('abv', Validators.required),
    });
    ngOnInit() {

        this.secondFormGroup = new FormGroup<any>({
            secondName: new FormControl('dg', Validators.required),
        });

    }


    ngAfterViewInit(): void {
        console.log(this.stepper)
        console.log(this.firstFormGroup.value);
        console.log(this.secondFormGroup?.value)
    }
}
