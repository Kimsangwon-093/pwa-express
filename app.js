// express 기본 구조 

import express,{ request, response } from 'express';  //express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';

const app = express();
app.use(express.json()); //JSON으로 요청이 올 경우 파싱 처리
app.use(eduTest);


// 파싱(parsing) : 특정 형태를 원하는 형태로 만드는 것

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router 
app.get('/api/hi', (request, response, next) => {
    response.status(200).send('안녕 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi',(request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi',(request, response, next) => {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 PATCH 요청을 보낼 때 실행되는 Router
app.patch('/api/hi',(request, response, next) => {
  response.status(200).send('패치 익스프레스!');
});

// // 클라이언트가 '/api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
// app.delete('/api/hi',(request, response, next) => {
//   response.status(200).send('딜리트 익스프레스!');
// });

// 클라이언트가 '/api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi',(request, response, next) => {
  response.status(200).send({
    code:'00', 
    msg:'딜리트 익스프레스!'
  });
});

// -----------
// Query Parameter 제어
// Request.query 프로퍼티를 통해서 접근 가능
app.get('/api/posts',(request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = request.query.age;
  console.log(name, age);

  response.status(200).send(params);
});

// Segment Parameter
// `Request.params` 를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// JSON 요청제어
app.post('/api/posts', (request, response, next) => {
  const {account, password, name} = request.body;
  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
//   response.status(200).send({account, password, name});

//   response.status(200).send({
//     password:password
//     ,account:account
//     ,name:name
//   });
});

// --------------
// 라우트 그룹
// --------------
// 라우트를 모듈로 나누고 그룹핑하여 관리
// app.use(authRouter);


app.use('/api/users/hi',eduUsersTest,usersRouter);

// // 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
app.use((request, response, next) => {
  response.status(404).send({
    code:'E01',
    msg:'찾을 수 없는 페이지 입니다'
  });
});


// 서버를 주어진 포트에서 시작
app.listen(3000);