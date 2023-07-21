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

function setNumberOfInitialAnimals(statistics) {
    statistics.numberOfInitialAnimals = statistics.numberOfCurrentHealthyAnimals
        + statistics.numberOfCurrentRecoveredAnimals + statistics.numberOfCurrentInfectedAnimals
        + statistics.numberOfCurrentSeverelyIllAnimals;
}

function updateNumbersOfDeaths(statistics) {
    const prevNumberOfDeaths = statistics.numberOfDeaths;
    statistics.numberOfDeaths = statistics.numberOfInitialAnimals - (statistics.numberOfCurrentHealthyAnimals
        + statistics.numberOfCurrentRecoveredAnimals + statistics.numberOfCurrentInfectedAnimals
        + statistics.numberOfCurrentSeverelyIllAnimals);
    statistics.numberOfDeathsInActualStep = statistics.numberOfDeaths - prevNumberOfDeaths;
}

function resetCurrentData(statistics) {
    statistics.numberOfCurrentHealthyAnimals = 0;
    statistics.numberOfCurrentRecoveredAnimals = 0;
    statistics.numberOfCurrentInfectedAnimals = 0;
    statistics.numberOfCurrentSeverelyIllAnimals = 0;
}

function updateStatisticsForSingleAnimal(singleAnimalData, stepNumber, statistics) {
    switch (singleAnimalData.healthState) {
        case "HEALTHY":
            statistics.numberOfCurrentHealthyAnimals += 1;
            break;
        case "RECOVERED":
            statistics.numberOfCurrentRecoveredAnimals += 1;
            break;
        case "INFECTED":
            statistics.numberOfCurrentInfectedAnimals += 1;
            break;
        case "SEVERELY_ILL":
            statistics.numberOfCurrentSeverelyIllAnimals += 1;
            break;
    }
}

export function resetBuffer(statistics, stepNumber) {
    if (stepNumber % TIME_RANGE_FOR_STATISTICS_IN_STEPS === 1) {
        statistics.bufferNewInfections = 0;
        statistics.bufferDeadAnimals = 0;
    }
}

function updateAreaChartData(statistics, setAreaChartData, stepNumber) {
    setAreaChartData(prev => {
        return [...prev, [
            stepNumber,
            statistics.numberOfInfections,
            statistics.numberOfDeaths,
        ]]
    })
}

export function updateDiagrams(statistics, stepNumber, setPieChartData, setLineChartData, setAreaChartData) {
    if (stepNumber % TIME_RANGE_FOR_STATISTICS_IN_STEPS === 0) {
        updatePieChartData(statistics, setPieChartData);
        updateLineChartData(statistics, setLineChartData, stepNumber);
        updateAreaChartData(statistics, setAreaChartData, stepNumber);
    }
}

function updateBuffer(statistics) {
    statistics.bufferNewInfections += statistics.numberOfNewInfectionsInActualStep;
    statistics.bufferDeadAnimals += statistics.numberOfDeathsInActualStep;
}

function updateNumbersOfInfections(statistics) {
    statistics.numberOfNewInfectionsInActualStep = statistics.storageNumberOfHealthyAnimals - statistics.numberOfCurrentHealthyAnimals;
    statistics.numberOfInfections += statistics.numberOfNewInfectionsInActualStep;
}

function setStorageNumberOfHealthyAnimals(statistics) {
    statistics.storageNumberOfHealthyAnimals = statistics.numberOfCurrentHealthyAnimals;
}

function adaptStorageNumberOfHealthyAnimals(statistics) {
    statistics.storageNumberOfHealthyAnimals = statistics.numberOfCurrentHealthyAnimals;
}

export function processDataPerStepNumber(context, receivedSimulationDataRef, stepNumber, statistics) {
    let dataStepNumber;
    resetCurrentData(statistics);
    resetBuffer(statistics, stepNumber);
    do {
        const singleAnimalData = receivedSimulationDataRef.current.shift();
        dataStepNumber = singleAnimalData.stepNumber;
        if (dataStepNumber === stepNumber) {
            drawAnimal(context, singleAnimalData);
            updateStatisticsForSingleAnimal(singleAnimalData, stepNumber, statistics);
        }
    } while (dataStepNumber === stepNumber);
    if (statistics.numberOfInitialAnimals === 0 && stepNumber === 1) {
        setNumberOfInitialAnimals(statistics);
        setStorageNumberOfHealthyAnimals(statistics);
    }
    updateNumbersOfDeaths(statistics);
    updateNumbersOfInfections(statistics);
    adaptStorageNumberOfHealthyAnimals(statistics);
    updateBuffer(statistics);
}

function updateLineChartData(statistics, setLineChartData, stepNumber) {
    setLineChartData(prev => {
        return [...prev, [
            stepNumber,
            statistics.bufferNewInfections,
            statistics.bufferDeadAnimals,
        ]]
    })
}

function updatePieChartData(statistics, setPieChartData) {
    setPieChartData([
        ["status", "Number of Animals"],
        ["healthy", statistics.numberOfCurrentHealthyAnimals],
        ["recovered", statistics.numberOfCurrentRecoveredAnimals],
        ["infected", statistics.numberOfCurrentInfectedAnimals],
        ["severely ill", statistics.numberOfCurrentSeverelyIllAnimals],
        ["dead", statistics.numberOfDeaths]
    ]);
}