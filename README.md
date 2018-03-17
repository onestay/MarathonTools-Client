# Marathon-Tools Client

This is the web client for Marathon Tools. It's build with vue.js and buefy. I suck at web design but I tried to make it not look like shit.

## Getting Started


### Prerequisites

You need to have the [Marathon-Tools API](https://github.com/onestay/MarathonTools-API) running on port 3000.

### Development
You will get auto hot reloading with these two simple commands.

```
yarn
yarn start
```

## Deployment

Don't use `yarn start` in production since it will not minify assets and generally won't be optimized for production.

Use `yarn run build` instead and serve the static content over a web server like nginx.

## Displaying info
There are several routes that are made to be captured by obs with a browser source since they just output simple text. the routes are /live/runs/:type/:part where type is one of prev current and next and part is one of game, category, estimate, platform or players.

/live/donations will give the current donation count.

/live/time will give the current time. For each timer state the attribute `state` is attached to the div so you can style each timer state individually. The different timer states are 0 for running, 1 for paused, 2 for stopped and 3 for finished.

The live endpoint will probably get seperated from the rest of the front end eventually.

## Built With

* [Vue.js](https://vuejs.org) - The JS framework
* [Buefy](https://buefy.github.io/) - Responsive UI components for Vue.js based on the Bulma CSS framework.

## Authors

* **Onestay** - *Initial work* - [Onestay](https://github.com/onestay)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
