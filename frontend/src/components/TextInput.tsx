import { memo } from "react";

const TextInput = memo(function Input({
  name,
  label,
  value,
  setValue,
}: {
  name: string;
  label?: string;
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          style={{ marginLeft: "8px" }}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </label>
    </>
  );
});

export default TextInput;
