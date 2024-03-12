## Getting Started

### System Requirements
* [Node](https://nodejs.org/en/download)
* [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Deployment
1. Clone the repository using `git@github.com:JDingle77/UCLAnus.git`
2. Started MongoDB using the command `mongod` inside terminal
3. Create two terminal windows, one inside the folder `/frontend` and the other inside the folder `/backend`
4. In both terminal windows, `npm install` to install the dependencies
5. In both terminal windows, run `npm start` to started the webpage

In order to run the app with GithubSSO, you must create a file at `/backend/githubsso.json` in the following format:
```
{
    "clientID": "placeholder",
    "clientSecret": "placeholder",
    "apiToken" : "placeholder"
}
```

In order to run the app with Google Maps API, you must place your Google API key information in the file at `/frontend/src/Components/mapsapikey.json` in the following format:
```
{
    "mapsApiKey": "placeholder",
    "mapSignature": "placeholder"
}
```

## CI/CD
There are two ways to automatically trigger a CI job.
The script will be automatically run if:
1. There is a new pr onto the main branch
2. There is a new push onto the main

We can also manually rerun a CI job. This is done on the github repo at: `Actions -> Node.js CI -> Your Job -> Re-run all jobs`.
