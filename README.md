# encpos-vue
Frontend application to browse and search the ENC Thesis Abstracts ([Positions de thèses](https://theses.chartes.psl.eu/)).

>:warning: (Install) / Launch first the DTS API and Elasticsearch :  
> See the [API Readme](https://github.com/chartes/encpos-app)

## Project setup
### Clone the GitHub repository:  
in a local folder dedicated to the project
  ```bash
  git clone https://github.com/chartes/encpos-vue.git
  ```

From the app folder (`cd path/to/encpos-vue`)

### Install

So far, only compatible with Node <= 16

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

This will read `.env.development` config values

### Compiles and minifies for production

For a production server, reads `.env.production` variables:

```
yarn build:prod
```

For a development server (preproduction), reads `.env.staging` variables:

```
yarn build:staging
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
