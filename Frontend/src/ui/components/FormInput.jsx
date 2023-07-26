import TextField from "@mui/material/TextField";
import * as React from "react";

function FormInput({updateFormObject, value, name, label, id}) {
    return (
        <div className="form-input">
            <TextField
                margin="normal"
                required
                fullWidth
                name={name}
                value={value}
                label={label}
                id={id}
                onChange={event => updateFormObject(event.target.name, event.target.value)}
                sx={{
                    "& .MuiInputLabel-root": {color: '#FFFFFF'},
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {borderColor: '#3481cb', borderRadius: 5, backgroundColor: '#173e81'},
                    },
                    "& .MuiInputLabel-root.Mui-focused": {color: '#FFFFFF', zIndex: 3},
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {borderColor: '#FFFFFF', backgroundColor: '#173e81'}
                    },
                    "& input": {
                        color: '#FFFFFF', zIndex: 1
                    }
                }}
            />
        </div>
    )
}

export default FormInput