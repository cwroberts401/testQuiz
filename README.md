# Quiz v2.0

This quiz app allows you to test the implemtation of the quiz questions and edit the weights of questions and products. To use the deployed version [`click here`](https://cwroberts401.github.io/testQuiz/).

## Running Project Locally
This test quiz was created using Svelte.

If you want to run the project locally clone this repo and open in your editor of choice. Ensure you have Node installed. Then run the following inside the project. 

```bash
# install dependencies
npm install

# start the development server
npm run dev
```

## Usage

Click start quiz. As you progress through the quiz the category weights and match graphs will update based on the set question weights. If you wish to restart at any point you can reload the page and the current scent profile will be reset to zero.

## Scent Profile

The scent profile is made up of 8 categories, each category corresponds to the candle category of the same name. Although there is no imposed limit on the value of each category the maximum value displayed by the graphic is 10 and the minimum is 0. Negative values are allowed but will not be displayed. To adjust the starting point of the secent profile you can change the values before you click start quiz (note: the starting values are not saved and have to set everytime before you start the quiz).

## Adjusting Question Weights

You can adjust the weights every answer has on the scent profile by clicking change question weights on the question you wish to edit. you can set the weight on each category between 10 and -10. negative numbers subtract points from profile, positive add points to profile. When you are satisified with the changes click save. Question weights are saved to browser local storage and should be persisted between reloads.

### special note on question 6
Question six allows you to add keyword based categories and set the weights. This allows us to change weights if a use dislikes a broad category of scents instead of a specfic scent. Also note that all user answers are already filtered through the specfic scent notes to look for matches so there is no need to maually add those.

## Adjust Candle Weights

You can also adjust all of the candle weights to do so click on the edit candle button you wish to edit and you can adjust the value for each category between 0 - 10 and click save when finished to save the new values to local storage. Again these changes should remain between reloads. 

## How Percentage Match Works
currently we find the mathmatical percentage match between users profile and candle based on the formula:

(areaOfCandle+areaOfUser)/areaOfOverlap*2 

All areas are calculated dynamically as the SVG trangles are drawn. 

## Other Tools
see all weights button: to see all the current weights of questions and candles. Use this to share if you want to copy-paste all the weights

reset button: to reset all weights to original values click this button.

