# CAH Setup

## Production:
1. Make sure that `docker`, `docker-compose` and `node` is installed.
2. Clone this repo. `git clone git@github.com:olback/cah cah && cd cah`.
3. Run `scripts/setup.sh`.
4. Look over and edit `.env` to your liking.
5. Run `docker-compose up` to start the server. (add `-d` to run in the background)
6. That's it. You can now access the game on [localhost:5000](http://localhost:5000).

## Development:
1. Make sure that `docker`, `docker-compose` and `node` is installed.
2. Clone this repo. `git clone git@github.com:olback/cah cah && cd cah`.
3. Copy `.env.sample` to `.env`.
4. Edit. `.env`. Change `NODE_ENV` to `dev` and `NODE_COMMAND` to `npm run dev`.
5. Run `docker-compose up`.
6. Open a new terminal. Run `docker exec cah_postgres_1 /bin/bash /scripts/install.sh` to insert data.
7. Run `cd client && npm i && node_modules/.bin/ng serve`.
8. The server is now running on [localhost:5000](http://localhost:5000) and the Angular app (front-end) is running on [localhost:4200](http://localhost:4200).
