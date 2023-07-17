function FormInput({updateFormObject, value, name, label, classNameLabel, classNameInput}) {
    return (
        <div className="form-input">
            <div className={classNameLabel}>{label}</div>
            <input
                className={classNameInput}
                type="text"
                value={value}
                name={name}
                onChange={event => updateFormObject(event.target.name, event.target.value)}
            />
        </div>
    )
}

export default FormInput