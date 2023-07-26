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
                    "& .MuiInputLabel-root": {color: '#45A29E'},
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {borderColor: '#1F2833', borderRadius: 5, backgroundColor: '#1F2833'},
                    },
                    "& .MuiInputLabel-root.Mui-focused": {color: '#45A29E', zIndex: 3},
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {borderColor: '#45A29E', backgroundColor: '#1F2833'}
                    },
                    "& input": {
                        color: 'white', zIndex: 1
                    }
                }}
            />
        </div>
    )
}

export default FormInput