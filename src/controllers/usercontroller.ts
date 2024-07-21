// import { Request, Response } from 'express';
// import db from '../db';
// // import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { RowDataPacket, Pool } from 'mysql2/promise';

// interface User {
//   user_no: number;
//   user_email: string;
//   user_password: string;
// }

// interface RefreshToken {
//   token: string;
//   user_no: number;
// }

// interface UserRow extends RowDataPacket, User {}


// // 로그인
// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     const queryLogin = 'SELECT user_no, user_email, user_password FROM users WHERE user_email = ?';
//     const [rows] = await db.execute<UserRow[]>(queryLogin, [email]);
//     const result = rows[0];

//     if (!result) {
//       res.status(401).json({ status: 'fail', message: '이메일 또는 비밀번호를 확인해주세요.' });
//       return;
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, result.user_password);
//     if (!isPasswordCorrect) {
//       res.status(401).json({ status: 'fail', message: '이메일 또는 비밀번호를 확인해주세요.' });
//       return;
//     }

//     // 액세스 토큰 생성
//     const accessToken = jwt.sign({ no: result.user_no }, process.env.JWT_SECRET_KEY!, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });

//     // 리프레시 토큰 생성
//     const refreshToken = jwt.sign({ no: result.user_no }, process.env.JWT_REFRESH_SECRET_KEY!, {
//       expiresIn: process.env.JWT_REFRESH_EXPIRE,
//     });

//     // 리프레시 토큰이 이미 존재하는지 확인
//     const queryCheckRefreshToken = 'SELECT * FROM refresh_tokens WHERE user_no = ?';
//     const [refreshTokenRows] = await db.execute<RefreshToken[]>(queryCheckRefreshToken, [result.user_no]);
//     const resultCheckRefreshToken = refreshTokenRows[0];

//     if (resultCheckRefreshToken) {
//       // 리프레시 토큰이 존재하면 업데이트
//       const queryUpdateRefreshToken = 'UPDATE refresh_tokens SET token = ? WHERE user_no = ?';
//       await db.execute(queryUpdateRefreshToken, [refreshToken, result.user_no]);
//     } else {
//       // 리프레시 토큰이 존재하지 않으면 삽입
//       const queryStoreRefreshToken = 'INSERT INTO refresh_tokens (token, user_no) VALUES (?, ?)';
//       await db.execute(queryStoreRefreshToken, [refreshToken, result.user_no]);
//     }

//     res.status(200).json({
//       status: 'success',
//       message: '로그인 성공',
//       data: {
//         accessToken,
//         refreshToken
//       },
//     });
//   } catch (err) {
//     console.error("Error in Login: ", err);  // 에러 로그 추가
//     res.status(500).json({ status: 'fail', message: '서버 에러: ' + (err as Error).message });
//   }
// };