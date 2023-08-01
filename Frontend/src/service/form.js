export function initFormObject() {
    return {
        simulationName: "",
        numberOfAnimals: "",
        numberOfInitialInfections: "",
    }
}

export function updateFormObject(key, value, setFormObject) {
    setFormObject(prevObject => {
        return {
            ...prevObject,
            [key]: value
        }
    });
}

export function initFormObjectInOverview(item) {
    return {
        id: item.id,
        simulationName: item.simulationName,
        numberOfAnimals: item.numberOfAnimals,
        numberOfInitialInfections: item.numberOfInitialInfections
    }
}

export function toggleDetails(setIsDetailedViewShown) {
    setIsDetailedViewShown(prev => !prev);
}