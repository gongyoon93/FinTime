import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

//서버에서 클라이언트로 보내기 전 토큰 서명
export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

//API CALL 받을 시 토큰의 유효성 체크
export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log("JWT Token has expired.");
    } else {
      console.log("JWT Verification Error:", error);
    }
    return null;
  }
}
