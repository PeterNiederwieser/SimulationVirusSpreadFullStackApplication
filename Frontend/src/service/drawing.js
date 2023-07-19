import {ANIMAL_RADIUS, FILE_PATH_IMAGE_TERRITORY, TIME_RANGE_FOR_STATISTICS_IN_STEPS} from "../data/constants.js";

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
            return "#000000";
    }
}

function setTotalNumberOfInitialAnimals(statistics) {
    statistics.totalNumberOfInitialAnimals = statistics.totalNumberOfCurrentHealthyAnimals
        + statistics.totalNumberOfCurrentRecoveredAnimals + statistics.totalNumberOfCurrentInfectedAnimals
        + statistics.totalNumberOfCurrentSeverelyIllAnimals;
}

function updateNumberOfDeadAnimals(statistics) {
    statistics.totalNumberOfDeadAnimals = statistics.totalNumberOfInitialAnimals - (statistics.totalNumberOfCurrentHealthyAnimals
        + statistics.totalNumberOfCurrentRecoveredAnimals + statistics.totalNumberOfCurrentInfectedAnimals
        + statistics.totalNumberOfCurrentSeverelyIllAnimals);

}

function updateStatistics(singleAnimalData, stepNumber, statistics) {
    switch (singleAnimalData.healthState) {
        case "HEALTHY":
            statistics.totalNumberOfCurrentHealthyAnimals += 1;
            break;
        case "RECOVERED":
            statistics.totalNumberOfCurrentRecoveredAnimals += 1;
            break;
        case "INFECTED":
            statistics.totalNumberOfCurrentInfectedAnimals += 1;
            break;
        case "SEVERELY_ILL":
            statistics.totalNumberOfCurrentSeverelyIllAnimals += 1;
            break;
    }
    if (stepNumber === 1) {
        setTotalNumberOfInitialAnimals(statistics);
    }
    updateNumberOfDeadAnimals(statistics);
}

function updateDiagrams(statistics) {
    console.log("number of initial animals: ", statistics.totalNumberOfInitialAnimals);
}

export function processDataPerStepNumber(context, simulationData, stepNumber, statistics) {
    let dataStepNumber;
    do {
        const singleAnimalData = simulationData.current.shift();
        dataStepNumber = singleAnimalData.stepNumber;
        if (dataStepNumber === stepNumber) {
            drawAnimal(context, singleAnimalData);
            updateStatistics(singleAnimalData, stepNumber, statistics);
        }
        if (stepNumber % TIME_RANGE_FOR_STATISTICS_IN_STEPS === 0) {
            updateDiagrams(statistics);
        }
    } while (dataStepNumber === stepNumber);
}