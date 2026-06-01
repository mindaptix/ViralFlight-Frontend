export function TextInput({
  label,
  note,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="field">
      <span>
        {label} {required && <b>*</b>} {note && <em>({note})</em>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TextareaInput({ label, note, placeholder, value, onChange }) {
  return (
    <label className="field">
      <span>
        {label} {note && <em>({note})</em>}
      </span>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function SelectInput({ label, note, required, value, options, onChange }) {
  return (
    <label className="field">
      <span>
        {label} {required && <b>*</b>} {note && <em>({note})</em>}
      </span>
      <select value={value} required={required} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RadioGroup({ label, required, value, options, onChange }) {
  return (
    <fieldset className="radio-group">
      <legend>
        {label} {required && <b>*</b>}
      </legend>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={label}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ChoiceGrid({
  label,
  hint,
  required,
  values,
  options,
  type = "multi",
  limit,
  onChange,
}) {
  return (
    <fieldset className="choice-section">
      <legend>
        {label} {required && <b>*</b>}
      </legend>
      {hint && <p>{hint}</p>}
      <div className="choice-grid">
        {options.map((option) => {
          const selected = values.includes(option);
          const disabled = type === "multi" && limit && !selected && values.length >= limit;

          return (
            <button
              className={selected ? "choice selected" : "choice"}
              disabled={disabled}
              type="button"
              onClick={() => onChange(option)}
              key={option}
            >
              <span aria-hidden="true">{selected ? "x" : ""}</span>
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
