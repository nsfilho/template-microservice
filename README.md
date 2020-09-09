# Introduction

Describe here your API / Micro-services / Library.

-   **License:** UNLICENSED
-   **Home Page:**
-   **Repository:**

## Environment

### From Micro Libraries

-   `UNIQUE_START_DELAY`: define a minimum delay to start func execution;
-   `UNIQUE_POOLING`: pooling time to check delayed func to execute;
-   `RABBITMQ_URL`: url to connect to amqp server. Default: `amqp://admin:password@localhost:5672`;
-   `RABBITMQ_RETRIES_INTERVAL`: interval to retry connection in milliseconds. Default: `1000`;
-   `RABBITMQ_ROUTINGKEY_PREFIX`: prefix to routing key to identify this as a sender. Default: `api`;
-   `RABBITMQ_CONSOLE_STATUS`: show in console messages about rabbitmq status;
-   `RABBIT_ENCONDING_CHARSET`: permits you to change buffer charset to encoding your messages.
-   `REDIS_MAIN_CLUSTER`: a redis cluster or host, example and default: `[{ port: 6379, host: '127.0.0.1' }]`;
-   `REDIS_MAIN_PASSWORD`: a password for access redis, example and default: `password`;
-   `REDIS_DEBUG_CONSOLE`: if true, show in a console some debug information. Default: `false`.
-   `LOCKER_PREFIX`: all calls has ben prefixed by this (facility to not share same resource by different micro-services). Default: `LOCKER`.
-   `LOCKER_PING_TIMEOUT`: maximum amount of time for consider a remote service un-responsive by not update their ping and consider death. Default: `5000`.
-   `LOCKER_PING_INTERVAL`: maximum amount of time for a service update their ping. This value must be less than `LOCKER_PING_TIMEOUT`. Default: `2000`.
-   `LOCKER_CHECK_INTERVAL`: timer to check if the resource is available now. This value could be like `LOCKER_PING_INTERVAL` or less. Default: `500`.
-   `LOCKER_DEBUG_CONSOLE`: show in console some debug messages about locker process.
-   `MONGO_URL`: A URI for connect to a mongo database. Default: `mongodb://root:password@127.0.0.1/platform?authSource=admin`
-   `MONGO_DATABASE`: a database name (usually, same as in `MONGO_URL`). Default: `platform`.
-   `MIGRATION_COLLECTION_NAME`: the collection name to maintain documents about stages and results. Default: `migration`.
-   `MIGRATION_DEBUG_CONSOLE`: show in console some debug messages about locker process.

### From this micro-service

-   `PORT`: Micro-service HTTP Listening Port. Default: `4000`;
-   `SENTRY_DSN`: Sentry DSN Url for log errors. Default: `undefined`;
-   `ENVIRONMENT`: define a kind of environment, example: dev, production, quality. Default: `dev`;
-   `VERSION`: semver build number (gain this info when generate docker). Default: `v0.0.0`;
-   `LOGGER_MINIMAL_LEVEL`: minimal logger info. Default: `silly`;
-   `APP_API_URL`: to compose beautiful answers, you can use that url. Default: `https://api.domain.com.br`;
-   `APP_SITE_URL`: to compose beautiful answers, you can use that url. Default: `https://domain.com.br`;
-   `APP_JWT_SECRETKEY`: JWT Token for validate the signature. Default: `myjwtsupersecretkey`

## Dev Instructions

-   To deploy stack: `docker stack deploy -c docker-compose.yml &acute;basename $(pwd -P)&acute;`
-   Prepare modules: `yarn install`
-   For start: `yarn dev`
-   For commit: `git cz`
-   For release a new version: `yarn release`
