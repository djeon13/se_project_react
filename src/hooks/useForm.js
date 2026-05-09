import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function resetForm() {
    setValues(initialValues);
  }

  return { values, handleChange, setValues, resetForm };
}
