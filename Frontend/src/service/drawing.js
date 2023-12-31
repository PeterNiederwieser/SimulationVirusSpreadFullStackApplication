import {ANIMAL_RADIUS, FILE_PATH_IMAGE_TERRITORY} from "../data/constants.js";

export function drawBackground(context) {
    const image = new Image();
    image.src = FILE_PATH_IMAGE_TERRITORY;
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
}

export function drawAnimal(context, data) {
    context.fillStyle = getColorForHealthState(data.healthState);
    context.beginPath();
    context.arc(data.xposition, data.yposition, ANIMAL_RADIUS, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

function getColorForHealthState(healthState) {
    switch (healthState) {
        case "HEALTHY":
            return "#38f5f5";
        case "RECOVERED":
            return "#f5e616";
        case "INFECTED":
            return "#fa602d";
        case "SEVERELY_ILL":
            return "#7F00FF";
    }
}