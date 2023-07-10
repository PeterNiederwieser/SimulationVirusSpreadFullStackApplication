function FormInput({updateFormObject, value, name, placeholder}) {
    return (
        <div className="form-item">
            <input
                className="form-input"
                type="text"
                value={value}
                name={name}
                onChange={event => updateFormObject(event.target.name, event.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

export default FormInput