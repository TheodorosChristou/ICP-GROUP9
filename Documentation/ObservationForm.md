# ObservationForm Component

This component represents a form for submitting observations.

## Props

- `onSubmit`: Function - Handler function to be called when the form is submitted.
- `isLoading`: Boolean - Indicates whether the form is in a loading state.
- `triggerReset`: Boolean - Triggers form reset when changed.
- `values`: ObservationValues - Initial values for the form fields.
- `label`: String - Label for the form.

## Example Usage

```tsx
import ObservationForm from './ObservationForm';

const YourComponent = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ObservationForm onSubmit={handleSubmit} />
      {/* Your content */}
    </div>
  );
};

export default YourComponent;
```

## Component Structure

```tsx
<ObservationForm>
  <div className="...">
    <form onSubmit={handleSubmit}>
      {/* Latitude and Longitude fields */}
      <div className="...">
        <input type="float" {...register("Lat", FieldValidation(valid))} placeholder="Latitude" />
        <p>{errors.Lat?.message}</p>
      </div>
      <div className="...">
        <input type="float" {...register("Lon", FieldValidation(valid))} placeholder="Longitude" />
        <p>{errors.Lon?.message}</p>
      </div>

      {/* Observation text area */}
      <div className="...">
        <textarea {...register("Observation")} />
        <p>{errors.Observation?.message}</p>
      </div>

      {/* Response checkboxes */}
      {role === 'admin' && (
        <div className="...">
          {ResponseList.map((option) => (
            <div key={option}>
              <input type="checkbox" {...field} checked={field.value} />
              {option}
            </div>
          ))}
          <p>{errors.Response?.message}</p>
        </div>
      )}

      {/* Response description */}
      {role === "admin" && (
        <div className="...">
          <textarea {...register("ResponseDescription")} />
          <p>{errors.ResponseDescription?.message}</p>
        </div>
      )}

      {/* Submit button */}
      <button type="submit" className="...">Submit Incident</button>
    </form>
  </div>
</ObservationForm>
```

## Implementation Details

- Uses useForm, useWatch, and Controller from react-hook-form for form management.

- Uses useSession from next-auth/react to get user session data.

- Renders different form fields based on the user's role.

- Provides validation for Latitude, Longitude, and Observation fields using the FieldValidation function.

- The form can be reset by setting the triggerReset prop to true.

- Submits the form data using the onSubmit function when the form is submitted.
