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
            return "#7F00FF";
    }
}

function setTotalNumberOfInitialAnimals(statistics) {
    statistics.totalNumberOfInitialAnimals = statistics.totalNumberOfCurrentHealthyAnimals
        + statistics.totalNumberOfCurrentRecoveredAnimals + statistics.totalNumberOfCurrentInfectedAnimals
        + statistics.totalNumberOfCurrentSeverelyIllAnimals;
}

function updateNumberOfDeadAnimals(statistics) {
    statistics.totalNumberOfDeadAnimals = (statistics.totalNumberOfInitialAnimals - statistics.totalNumberOfDeadAnimals)
        - (statistics.totalNumberOfCurrentHealthyAnimals + statistics.totalNumberOfCurrentRecoveredAnimals + statistics.totalNumberOfCurrentInfectedAnimals
            + statistics.totalNumberOfCurrentSeverelyIllAnimals);

}

function resetCurrentData(statistics) {
    statistics.totalNumberOfCurrentHealthyAnimals = 0;
    statistics.totalNumberOfCurrentRecoveredAnimals = 0;
    statistics.totalNumberOfCurrentInfectedAnimals = 0;
    statistics.totalNumberOfCurrentSeverelyIllAnimals = 0;
}

function updateStatisticsForSingleAnimal(singleAnimalData, stepNumber, statistics) {
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
}

export function updateDiagrams(statistics, stepNumber, setPieChartData) {
    if (stepNumber % TIME_RANGE_FOR_STATISTICS_IN_STEPS === 0) {
        updatePieChartData(statistics, setPieChartData);
        console.log("healthy: ", statistics.totalNumberOfCurrentHealthyAnimals);
        console.log("recovered: ", statistics.totalNumberOfCurrentRecoveredAnimals);
        console.log("infected: ", statistics.totalNumberOfCurrentInfectedAnimals);
        console.log("sevill: ", statistics.totalNumberOfCurrentSeverelyIllAnimals);
        console.log("dead: ", statistics.totalNumberOfDeadAnimals);
        console.log("all: ", statistics.totalNumberOfInitialAnimals);
    }
}

export function processDataPerStepNumber(context, receivedSimulationDataRef, stepNumber, statistics) {
    let dataStepNumber;
    resetCurrentData(statistics);
    let counter = 0;
    do {
        const singleAnimalData = receivedSimulationDataRef.current.shift();
        dataStepNumber = singleAnimalData.stepNumber;
        if (dataStepNumber === stepNumber) {
            counter++;
            drawAnimal(context, singleAnimalData);
            updateStatisticsForSingleAnimal(singleAnimalData, stepNumber, statistics);
        }
    } while (dataStepNumber === stepNumber);
    if (statistics.totalNumberOfInitialAnimals === 0 && stepNumber === 1) {
        setTotalNumberOfInitialAnimals(statistics);
        console.log("______________________________________");
        console.log("healthy: ", statistics.totalNumberOfCurrentHealthyAnimals);
        console.log("recovered: ", statistics.totalNumberOfCurrentRecoveredAnimals);
        console.log("infected: ", statistics.totalNumberOfCurrentInfectedAnimals);
        console.log("sevill: ", statistics.totalNumberOfCurrentSeverelyIllAnimals);
        console.log("dead: ", statistics.totalNumberOfDeadAnimals);
        console.log("all: ", statistics.totalNumberOfInitialAnimals);
    }
    updateNumberOfDeadAnimals(statistics);
    console.log("counter for step " + stepNumber + " : " + counter);
}

function updatePieChartData(statistics, setPieChartData) {
    setPieChartData([
        ["status", "Number of Animals"],
        ["healthy", statistics.totalNumberOfCurrentHealthyAnimals],
        ["recovered", statistics.totalNumberOfCurrentRecoveredAnimals],
        ["infected", statistics.totalNumberOfCurrentInfectedAnimals],
        ["severely ill", statistics.totalNumberOfCurrentSeverelyIllAnimals],
        ["dead", statistics.totalNumberOfDeadAnimals]
    ]);
}