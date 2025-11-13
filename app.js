// // express 기본 구조 

import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';
import { errorHandler } from './app/middlewares/errors/error-handler.js';
import eduRouter from './routes/edu.router.js';

const app = express();
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리
app.use(eduTest); // 커스텀 미들웨어 전역 등록
// app.use(eduTest); // 커스텀 미들웨어 전역 등록

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {

// 라우트를 모듈로 나누고 그룹핑하여 관리
app.use('/api', authRouter);
app.use('/api/users', eduUsersTest, usersRouter);
app.use(eduRouter);
});
// 에러 테스트용 라우트
app.get('/error', (request, response, next) => {
  // `throw`를 이용하여 에러 핸들링 처리도 가능 (비동기 처리 내부에서는 사용하면 에러 핸들러가 핸들링 못함)
  // throw new Error('쓰로우로 예외 발생');

  // 비동기 처리 내부에서는 반드시 `next(error)`를 이용해야 서버 crashed 안 일어남
  setTimeout(() => {
    next(new Error('쓰로우로 예외 발생'));
  }, 1000);
});

// -------------
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.',
  });
});

//------------------
// Error Handler 등록
// -----------------
app.use(errorHandler);

// 서버를 주어진 포트에서 시작
app.listen(3000);