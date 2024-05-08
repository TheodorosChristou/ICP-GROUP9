# FieldValidation Function

This function generates validation rules for a form field based on a given condition.

## Parameters

- `check`: boolean - A condition to determine whether the field requires validation.

## Returns

- An object containing validation rules.

## Example Usage

```tsx
import FieldValidation from './FieldValidation';

const YourComponent = () => {
  const validationRules = FieldValidation(true);

  return (
    <div>
      <h1>Your Form</h1>
      <input {...validationRules} />
    </div>
  );
};

export default YourComponent;
```

## Implementation Details

- If check is true, the function returns an object with the required property set to true and a custom error message.

- If check is false, the function returns an object with the required property set to false.

```tsx
export default function FieldValidation(check: boolean) {
    if (check) {
        return { required: { value: true, message: "Please enter a valid value" } };
    } else {
        return { required: false };
    }
}
```