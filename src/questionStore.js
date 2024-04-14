import { writable } from 'svelte/store';
import { createPersistedStore } from './persistedStore';

export const questionWeights = createPersistedStore('questionWeights',[
    {"question": "1",
    "weights": [
        {"true": [{"woody": 2},
        {"gourmand": 0},
        {"floral": 0},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 1},
        {"herbal": 0}]},
        {"false": [{"woody": -2},
        {"gourmand": 0},
        {"floral": 0},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": -1},
        {"herbal": 0}]}
        
    ]
    },
    {"question": "2",
    "weights": [
        {"true": [{"woody": 0},
        {"gourmand": 1},
        {"floral": 2},
        {"clean": 1},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 0},
        {"herbal": 1}]},
        {"false": [{"woody": 0},
        {"gourmand": -1},
        {"floral": -2},
        {"clean": -1},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 0},
        {"herbal": -1}]}
        
    ]
    },
    {"question": "3",
    "weights": [
        {"true": [{"woody": 0},
        {"gourmand": 2},
        {"floral": 0},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 0},
        {"herbal": 0}]},
        {"false": [{"woody": 0},
        {"gourmand": -2},
        {"floral": 0},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 0},
        {"herbal": 0}]}
        
    ]
    },
    {"question": "4",
    "weights": [
        {"true": [{"woody": 1},
        {"gourmand": 0},
        {"floral": 1},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 2},
        {"herbal": 1}]},
        {"false": [{"woody": -1},
        {"gourmand": 0},
        {"floral": -1},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": -2},
        {"herbal": 1}]}
        
    ]
    },
    {"question": "5",
    "weights": [
        {"true": [{"woody": 0},
        {"gourmand": 0},
        {"floral": 0},
        {"clean": 2},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 1},
        {"herbal": 0}]},
        {"false": [{"woody": 0},
        {"gourmand": 0},
        {"floral": 0},
        {"clean": -2},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": -1},
        {"herbal": 0}]}
        
    ]
    },
    {"question": "6",
    "weights": [
        {"wood": [{"woody": -1},
        {"gourmand": -1},
        {"floral": -1},
        {"clean": -1},
        {"citrus": -1},
        {"fruity": -1},
        {"earthy": -1},
        {"herbal": -1}]},
    ]
    },
    {"question": "7",
    "weights": [
        {"none": [
            {"woody": 0},
            {"gourmand": 0},
            {"floral": 0},
            {"clean": 0},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 0},
            {"herbal": 0}
        ]},
        {"mid": [
            {"woody": -1},
            {"gourmand": -1},
            {"floral": -1},
            {"clean": -1},
            {"citrus": -1},
            {"fruity": -1},
            {"earthy": -1},
            {"herbal": -1}
        ]},
        {"high": [
            {"woody": -2},
            {"gourmand": -2},
            {"floral": -2},
            {"clean": -2},
            {"citrus": -2},
            {"fruity": -2},
            {"earthy": -2},
            {"herbal": -2}
        ]}
    ]
    },
    {"question": "8",
    "weights": [
        {"Fresh Citrus": [
            {"woody": 0},
            {"gourmand": 0},
            {"floral": 1},
            {"clean": 1},
            {"citrus": 2},
            {"fruity": 0},
            {"earthy": 0},
            {"herbal": 1}
        ]},
        {"Warm Sweet": [
            {"woody": 0},
            {"gourmand": 2},
            {"floral": 0},
            {"clean": 0},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 0},
            {"herbal": 0}
        ]},
        {"Woody Smokey": [
            {"woody": 1},
            {"gourmand": 0},
            {"floral": 0},
            {"clean": 0},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 1},
            {"herbal": 0}
        ]},
        {"Clean Powdery": [
            {"woody": 0},
            {"gourmand": 0},
            {"floral": 1},
            {"clean": 2},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 0},
            {"herbal": 0}
        ]},
        {"Floral Light": [
            {"woody": 0},
            {"gourmand": 0},
            {"floral": 2},
            {"clean": 1},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 0},
            {"herbal": 0}
        ]},
        {"Earthy Herbal": [
            {"woody": 0},
            {"gourmand": 0},
            {"floral": 0},
            {"clean": 0},
            {"citrus": 0},
            {"fruity": 0},
            {"earthy": 2},
            {"herbal": 2}
        ]}
    ]    
    },
])