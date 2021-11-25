
## DOCKER (RUN postgres on DOCKER)

- CMD: ```docker run --name postgres-nest -p 5500:5432 -e POSTGRES_PASSWORD=postgres -d postgres```
1. --name: specifies the name of the docker container
2. -p: specifies port mappings (HOST_PORT:DOCKER_PORT). Postgres runs by default on port 5432, therefore 5500:5432 means that: take port 5432 from docker (which is used for postgres) and expose it as port 5500 on the host (local machine/host in our case). So when trying to access postgres from localhost, we will use port 5500. However, we know that internally postgres uses port 5432 in the container
3. -e: specifies the values needed for postgres, here we specified the password of the user (default user: postgres)
4. -d: run container in background
5. postgres: the image we will be using for initializing our container. postgres is the official docker image for postgres db
