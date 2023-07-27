import TextField from "@mui/material/TextField";
import {stylingTextfield} from "../../data/stylingElements.js";

function FormInput({updateFormObject, value, name, label, id}) {
    return (
        <div className="form-input">
            <TextField
                margin="normal"
                fullWidth
                name={name}
                value={value}
                label={label}
                id={id}
                onChange={event => updateFormObject(event.target.name, event.target.value)}
                sx={stylingTextfield}
            />
        </div>
    )
}

export default FormInput