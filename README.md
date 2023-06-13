# Test Project with React Testing Library

Hello! Welcome to my testing project repository with React Testing Library! In this project, I wrote tests for a React application that was already created and configured, using Jest and the React Testing Library. No additional configuration was required.

The application already has a complete implementation of all Pokédex requirements. My job was to write tests for each listed requirement, ensuring their correctness. I took care to avoid false positive tests as they would not be considered in the assessment.

## Requirements Developed

- Testing of the `<App.js />` component: I performed tests to verify that the top of the application contains a fixed set of navigation links and that the application redirects correctly when clicking on the links.
- Testing the `<About.js />` component: I created tests to verify that the page contains the correct information about the Pokédex.
- Testing the `<FavoritePokemons.js />` component: I developed tests to verify that the "No favorite pokemon found" message is correctly displayed when there are no favorite pokémons and if the favorite pokémon cards are displayed correctly.
- Testing the `<NotFound.js />` component: I wrote tests to verify that the Not Found page contains the correct heading and image.
- Testing of the `<Pokedex.js />` component: I performed tests to verify that the page contains the correct heading, that the next pokémon is displayed correctly when clicking the "Next pokémon" button, and that the filter and reset buttons are working properly.
- Testing the `<Pokemon.js />` component: I developed tests to verify that a given pokémon's card is rendered correctly and that the navigation link to the pokémon's details is working correctly.
- Testing the `<PokemonDetails.js />` component: I created tests to verify that the pokémon's detailed information is displayed correctly, that the location maps sections are present and that it is possible to favorite a pokémon in the details page.

## Non-evaluative requirements

In addition to the mandatory requirements, there are some ideas to deepen the project and learn even more. These requirements are not graded, but are great opportunities to practice and explore new functionality. Here are some of those ideas:

- Add a route to display a list of locations.
- Add a link to the list of locations in the navigation bar.
- Add pagination buttons in the list of locations.
- Add a route to display a list of generations.
- Add a link to the list of generations in the navigation bar.
- Add a route to display information about a generation.
- Add a link to each generation's detail page in the generation list.

## How to Run the Tests

To run the project tests on your local machine, follow the steps below:

1. Clone this repository.
2. No

navigate to the project directory: `cd project-tests-react-testing-library`.
3. Install the project's dependencies: `npm install`.
4. Run the tests: `npm test`.

## Conclusion

I hope you enjoyed my testing project with the React Testing Library! It was an amazing experience to develop it and I was able to improve my skills in automated testing for React applications. Feel free to explore the source code and contribute improvements. If you have any questions, I'm available to help. Have fun testing the Pokédex app!
