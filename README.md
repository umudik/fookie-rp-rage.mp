[![Deploy](https://github.com/umudik/fookie-rp-rage.mp/actions/workflows/docker-image.yml/badge.svg)](https://github.com/umudik/fookie-rp-rage.mp/actions/workflows/docker-image.yml)


# Fookie RAGEMP

### Developed with Fookie JS.

This is and a example project has been developed to contribute to Fookie JS. 

### Features
- Automized Database synchronizing for all entities vehicles players makers etc.
- Admin UI and Documentation
- Automated cache
- Interaction menu
- Auth
- Dockerized
- Time and Weather

### In progress
- Inventory
- Shops 
- House
- Drops 
- Crafting
- Factions
- PD
- Government
- Phone


### Discord
https://discord.gg/XxvSQyggKs
### Setup with Docker Compose

```
    touch docker.env
```

```
MONGO                        = mongodb://username:passowrd@mongodb
MONGO_INITDB_ROOT_USERNAME   = username
MONGO_INITDB_ROOT_PASSWORD   = password
CACHE                        = http://cache:2630
SERVER                       = http://localhost:3434
SYSTEM_TOKEN                 = system_token_secret
DEBUG                        = true
```

Start server
```
docker-compose up --build --detach
```


