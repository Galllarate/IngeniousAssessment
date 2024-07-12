# Cover letter

## Required environment
`npm 8.11` and `node 16.15`

## Installed packages ready to use
- "axios": "^0.27.2",
- ~~"bootstrap": "^5.2.1",~~ removed (not used)
- ~~"core-js": "^3.8.3"~~ removed (not used),
- "json-server": "^0.17.0",
- "vitest": "^1.2.0",
- "vue": "^3.2.13",
- "vue-router": "^4.0.3",
- ~~"vuex": "^4.0.0"~~ removed (not used)
- "jsdom" - Added for testing
- "@vue/test-utils" - Added for testing
- "@vitejs/plugin-vue" - Added for testing


## How to start environment
1. `npm install` - install dependencies
2. `npm run api` - run the API
3. `npm run serve` - for the Vue application


## Notes
- UI loaders were added only due to requirements; due to the server response speed they are almost invisible
- It was not always clear in what order to sort - that’s why sorting by orders
- If I implemented requests through the store, I would choose pinia (due to the modular system)
- I don’t fully understand why vue-cli is used and not vite
- The tests are written as an example of how I write tests (for mocking API requests I would use MSW)