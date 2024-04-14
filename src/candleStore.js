import { writable } from 'svelte/store';
import { createPersistedStore } from './persistedStore';

export const candles = createPersistedStore('candles',[
    {
      "name": "Lemon Fizz",
      "scentNotes": ["lemon", "rosemary", "bergamont", "sheer musk"],
      "scentValues": {
        "woody": 0,
        "gourmand": 1,
        "floral": 2,
        "clean": 9,
        "citrus": 10,
        "fruity": 10,
        "earthy": 2,
        "herbal": 5
      }
    },
    {
        "name": "Breezy Bay",
        "scentNotes": ["cashemere woods", "sea salt", "wild fig", "orchid"],
        "scentValues": {
          "woody": 0,
          "gourmand": 1,
          "floral": 6,
          "clean": 9,
          "citrus": 7,
          "fruity": 7,
          "earthy": 2,
          "herbal": 2
        }
    },
    {
        "name": "Smokey Haze",
        "scentNotes": ["cognac", "black leather", "tobacco leaf", "cade"],
        "scentValues": {
          "woody": 9,
          "gourmand": 2,
          "floral": 1,
          "clean": 0,
          "citrus": 3,
          "fruity": 2,
          "earthy": 9,
          "herbal": 7
        }
    },
    {
        "name": "Toasty Vanilla",
        "scentNotes": ["vanilla cream", "cedarwood", "burnt sugar", "palo santo"],
        "scentValues": {
          "woody": 8,
          "gourmand": 9,
          "floral": 2,
          "clean": 3,
          "citrus": 1,
          "fruity": 3,
          "earthy": 5,
          "herbal": 2
        }
    },
    {
        "name": "Cheeky Rose",
        "scentNotes": ["pink pepper", "lychee", "rose", "blonde woods"],
        "scentValues": {
          "woody": 3,
          "gourmand": 2,
          "floral": 10,
          "clean": 8,
          "citrus": 2,
          "fruity": 7,
          "earthy": 5,
          "herbal": 9
        }
    },
    {
        "name": "Dewy Days",
        "scentNotes": ["dewy apple", "peony", "lotus blossom", "vanilla bean"],
        "scentValues": {
          "woody": 2,
          "gourmand": 5,
          "floral": 6,
          "clean": 9,
          "citrus": 5,
          "fruity": 9,
          "earthy": 5,
          "herbal": 7
        }
    }
  ])