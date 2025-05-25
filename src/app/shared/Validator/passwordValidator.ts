import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    console.log(control)
        const password = control.value;
        if (!password) return null;

        const hasNumber = /[0-9]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasSymbol = /[!@#\$%\^&\*]/.test(password);
        const isValid = hasNumber && hasUpper && hasLower && hasSymbol && password.length >= 8;
        if(!isValid) return { 'passwordStrength': true };
        return null;
    }
}