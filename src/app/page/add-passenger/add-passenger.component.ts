import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Form } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-add-passenger',
    imports: [
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
    ],
    templateUrl: './add-passenger.component.html',
    styleUrl: './add-passenger.component.scss'
})
export class AddPassengerComponent implements OnInit, AfterViewInit {
    @ViewChildren('stepper') stepper?: MatStepper;
    // stepper=viewchild('stepper');
    @ViewChild('firstForm') firstForm?: ElementRef;
    @ViewChild('secondForm') secondForm?: ElementRef;
    firstFormGroup!:FormGroup;
    secondFormGroup!:FormGroup;
    isLinear: boolean = false;
    ngOnInit() {

         this.firstFormGroup = new FormGroup<any>({
            firstName: new FormControl('abv', Validators.required),
        });
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
