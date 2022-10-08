

# PruvoMonorepo

This project was generated using [Nx](https://nx.dev).


# Project dependencies

node > 14
docker + docker compose

## Hot to execute
```

npm i

npm run up:redis

npm run up:broker

npx nx serve gateways-currency

npx nx serve services-currency

```

Obs. 1 - wait a little bit for rabbitmq and redis start working

Obs. 2 - please open 'npx nx serve services-currency' in 2 terminals in order to see the request balancing between the services

## testing

open browser on: 

http://localhost:3333/currency/convert?from=EUR&to=BRL&amount=20

or

http://localhost:3333/currency/requestRate?from=EUR&to=BRL&amount=20&email=email@gmail.com 

