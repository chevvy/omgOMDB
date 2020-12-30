# OmgOMDB

A small manager of movie nominations for award considerations using the [OMDB open API](https://omdbapi.com/). 

DEPLOYED VERSION : https://omgomdb.netlify.app/

Features:
- Search for movies by title and get results as you type your requests
  - Search results are populated by OMDB's api
- Each search results can be nominated -> added to your nominations list
- Visual indicator in the results that a movie is already nominated 
- Movies can be removed from the nomination list from the search results or the nomination list itself
- You can also get more info on a search results by using the "Get more details"
  - Metacritic score
  - Poster
  - Plot summary
 - Material design using Angular Material
 - Mobile support
 - Various animations for removing and adding nominations
 
 I used this project as a little playground/experiment for angular material as I've never used it before. 
 The app is constantly deployed at this address : https://omgomdb.netlify.app/

Angular version: 11.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
