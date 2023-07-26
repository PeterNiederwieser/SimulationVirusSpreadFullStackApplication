import * as React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function FormSlider({updateFormObject, value, name, label, id}) {

    const changeValue = (event,value) => {
        updateFormObject(name, value);
    }
    return (
        <div className="form-slider">
            <Box sx={{width: 300}}>
                <Slider
                    aria-label={label}
                    defaultValue={400}
                    valueLabelDisplay="auto"
                    step={10}
                    min={100}
                    max={1000}
                    value={value}
                    onChange={changeValue}
                />
            </Box>
        </div>
    )
}

export default FormSlider;