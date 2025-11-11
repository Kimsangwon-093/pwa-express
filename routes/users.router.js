import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router();

usersRouter.get('/api/users/hi', eduUsersTest,(request, response, next) => {
  response.status(200).send("유저 겟 조회 완료");
});

usersRouter.post('/', (request, response, next) => {
  response.status(200).send("유저 포스트 조회 완료");
});

usersRouter.put('/api/users/:id', (request, response, next) => {
  response.status(200).send("유저 풋 조회 완료");
});

usersRouter.delete('/api/users/:id', (request, response, next) => {
  response.status(200).send("유저 딜리트 조회 완료");
});

usersRouter.patch('/api/users/:id', (request, response, next) => {
  response.status(200).send("유저 패치 완료");
});

export default usersRouter;