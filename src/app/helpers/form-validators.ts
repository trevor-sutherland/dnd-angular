import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";

export const CheckIfValid = (Form: FormGroup, FieldName: string, boolFormSubmitted: boolean): string =>
{
  const invalidField = !Form.controls[FieldName].valid && boolFormSubmitted;
  return (invalidField) ? "redBorder" : "";
}

export const TextFieldValidator = (): ValidatorFn =>
{
  return (control: AbstractControl): ValidationErrors | null =>
  {
    const undefinedText = control.value === undefined;
    if (undefinedText)
    {
      return null
    }
    else
    {
      const enteredAndDeleted = control.value.length === 0;
      const emptySpaces = control.value.trim().length === 0;
      return (emptySpaces && !enteredAndDeleted) ? { emptyText: { value: control.value } } : null;
    }
  };
}
