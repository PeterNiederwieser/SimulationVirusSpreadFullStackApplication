import {TIME_RANGE_FOR_STATISTICS_IN_STEPS} from "../data/constants.js";
import {drawAnimal} from "./drawing.js";

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

function resetBuffer(statistics, stepNumber) {
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

export function initPieChartData() {
    return [["status", "Number of Animals"], ["healthy", 100], ["recovered", 0],
        ["infected", 0], ["severely ill", 0], ["dead", 0]];
}

export function initLineChartData() {
    return [["Time", "New Infections", "New Deaths"], [0, 0, 0]];
}

export function initAreaChartData() {
    return [["Time", "Infections", "Deaths"], [0, 0, 0]];
}

export function initStatisticsRef() {
    return {
        timeRange: TIME_RANGE_FOR_STATISTICS_IN_STEPS,
        numberOfInitialAnimals: 0,
        numberOfCurrentHealthyAnimals: 0,
        numberOfCurrentRecoveredAnimals: 0,
        numberOfCurrentInfectedAnimals: 0,
        numberOfCurrentSeverelyIllAnimals: 0,
        numberOfNewInfectionsInActualStep: 0,
        numberOfDeathsInActualStep: 0,
        numberOfDeaths: 0,
        numberOfInfections: 0,
        bufferNewInfections: 0,
        bufferDeadAnimals: 0,
        storageNumberOfHealthyAnimals: 0,
    }
}
