export default function Input({
  label,
  type = 'text',
  id,
  placeholder = '',
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <div className="">
        {label && <label htmlFor={id}>{label}</label>}
        {label && <br />}
      </div>
      <input
        className="border-2 border-(--color-border) p-1 w-60"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
