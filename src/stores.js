import { writable, get } from 'svelte/store';

export const scentVals = writable({
    values: [{"woody": 0}, {"gourmand": 0}, {"floral": 0}, {"clean": 0}, {"citrus": 0}, {"fruity": 0}, {"earthy": 0}, {"herbal": 0}],
    shitList: []
});

export const percentMatch = writable({
    "Lemon Fizz" : 0,
    "Smokey Haze" : 0,
    "Breezy Bay" : 0,
    "Cheeky Rose" : 0,
    "Dewy Days" : 0,
    "Toasty Vanilla" : 0
})

export const currentQuestion = writable(0);

export function incrementQ() {
    currentQuestion.update(n => n + 1);
}

// Function to decrement the current question index
export function decrementQ() {
    currentQuestion.update(n => n > 0 ? n - 1 : 0); // Prevents the index from going negative
}

// Function to reset the current question index to zero
export function resetQ() {
    currentQuestion.set(0);
}

// Initialize history with a deep copy of the initial state
const scentHistory = [JSON.parse(JSON.stringify(get(scentVals)))];

export function back() {
    if (scentHistory.length > 1) {
        scentHistory.pop();  // Remove the latest state
        const lastItem = scentHistory[scentHistory.length - 1];  // Get the last state
        scentVals.set(JSON.parse(JSON.stringify(lastItem)));  // Restore the last state
    }
}

export function changeVals(vals) {
    scentVals.update(data => {
        if (Array.isArray(vals)) {
            vals.forEach(val => {
                const key = Object.keys(val)[0];
                const value = val[key];
                const foundIndex = data.values.findIndex(item => item.hasOwnProperty(key));
                if (foundIndex !== -1) {
                    data.values[foundIndex][key] += value;
                }
            });
        } else {
            const key = Object.keys(vals)[0];
            const value = vals[key];
            const foundIndex = data.values.findIndex(item => item.hasOwnProperty(key));
            if (foundIndex !== -1) {
                data.values[foundIndex][key] += value;
            }
        }
        return {...data};
    });
    // Update history right after updating the store
    scentHistory.push(JSON.parse(JSON.stringify(get(scentVals))));
}

// Expose a function to check current history (for debugging)
export function printHistory() {
    console.log(scentHistory);
}

export function addScentToShitList(scent) {
    scentVals.update(currentVals => {
        // Check if the scent is already in the list to avoid duplicates
        if (!currentVals.shitList.includes(scent)) {
            currentVals.shitList.push(scent);
        }
        return currentVals;
    });
}