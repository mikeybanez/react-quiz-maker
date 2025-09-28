function TextInput({
  name,
  label,
  value,
  onChange,
  size = 20,
}: {
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: number;
}) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          style={{ marginLeft: "8px" }}
          id={name}
          value={value}
          onChange={onChange}
          size={size}
        />
      </label>
    </>
  );
}

export default TextInput;
