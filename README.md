# Microservices-with-retry-pattern
 Preview: https://www.youtube.com/watch?v=XwSH74wBNj0
 
## Start rabbitMQ
  Inside `rabbitmq` folder run `docker-compose up` to start rabbitMQ.
  
```bash
    cd rabbitmq
```
  
```bash
    docker-compose up
  ```
  
## Serve Frontend
  Run `serve.js` inside `frontend` folder.
  
```bash
    node frontend/serve.js
```
  
## Start Server
  Install packages.
```bash
    npm install
```
 Run `server.js` inside `backend` folder.

```bash
    node backend/serve.js
```
  
## Start Notification service
  Run `server.js` inside `backend` folder.
  
```bash
    node backend/services/notify.js
```
