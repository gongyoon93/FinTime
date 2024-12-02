# FinTime

- 목표: 기능 구현과 서비스 배포를 통해 기술에 대한 이해를 넘어 사용자의 입장에서 문제를 발견할 수 있는 어떤 고민을 할 것인지.
  서비스의 제한적인 사용자 경험 환경에서도 큰 서비스의 경우를 예상하고 준비할 수 있는 과정이 필요.

개인 재무 관리 웹 애플리케이션

- 주요 기능

1. 가계부 :
   일별, 달력, 월별, 결산 등 수입, 지출 내역을 추가하고 조회하는 기능 화면
2. 통계 :
   그래프를 사용해 직관적으로 수입과 지출을 표시한다.
3. 투자 및 자산 관리 :
   주식, 펀드, 암호화폐 등 사용자가 보유한 자산의 수익률과 변동 사항을 실시간으로 확인 가능.
4. 더보기 :
   필요한 설정 기능을 제공.

- 기술 스택 선택

1. Next.js, Typescript, Recoil
2. Styled-Components / Emotion
3. Axios
4. React-Query
5. PWA(Progressive Web Application) : 웹 애플리케이션을 네이티브 앱처럼 사용할 수 있게
   해주는 기술. 오프라인 지원, 푸시 알림, 홈 화면에 앱 추가 등 네이티브에 가까운 사용자 경험 제공 가능.

- 기술적 고려 사항
  실시간 데이터 업데이트와 빠른 정보 처리가 필수적이며, 금융 데이터의 보안이 중요하므로 데이터 암호화, 안전한 인증(OAuth, JWT), SSL/TLS 등 보안 기술을 필수 적용해야 한다.
  필수적으로 필요하게 됨.

- React가 아닌 Next.js를 선택한 이유
  가계부와 유사한 기능을 가진 애플리케이션을 만들고 싶었고 이런 경우 페이지가 많아지는 경우 초기 로딩에 대한 성능 최적화가 첫번째로 필요하였고 필요에 따라 특정 페이지를 SEO를 고려하여
  적용할 수 있다는 두번째 이유로 Next.js를 채택하게 되었다.

- app폴더 하위의 RootLayout.tsx은 기본적으로 server component로 이 경우에 meta data를 사용할 수 있고 동시에 useState나 Recoil의 createContext 등을 사용하기 위해서는 'use client' 지시어를 사용해 client component 지정을 해줘야 한다. 예를 들어 RocoilRoot라는 전역 상태 관리를 상위에 Wrapping 하고자 한다면 RootLayout.tsx 이외의 client component 파일을 만들어 Recoil을 감싸고 이 파일을 RootLayout.tsx에 적용한다.

- next-auth의 세션 정보는 기본적으로 쿠키에 저장된다. 클라이언트 측의 세션 저장소나 저장소 대신에 쿠키를 사용해 세션을 관리하기 때문이다. 보안과 세션 관리의 편의성 때문에 일반적인 인증 시스템에서 채택하는 방식이다.

- 새로고침 할 때 마다 잠깐의 깜빡임과 함께 CSS가 풀리는 오류가 있었다.
  Styled-Component의 동작방식이 SSR(Server Side Rendering), SSG(Static Site Generation) 환경과 서버 컴포넌트에서 스타일링이 어렵다는 점이었다.
  styled-component는 클라이언트가 런타임일 때, 스타일시트를 생성하고 '<style/>' 요소로 DOM에 주입한다. 프로젝트가 실행 중일 때 DOM요소에 주입되는 것이다. 서버사이드에서 동작하게 된다면 서버에서 HTML이 생성되고 style은 클라이언트 런타임 때 생성되고 주입되므로 잠깐의 시간동안 깜빡임이 존재하는 것이다.

- 브라우저에서 JWT Verification Error: JsonWebTokenError: jwt malformed 에러가 발생하는 이유는, NextAuth에서 기본적으로 생성된 암호화된(Encrypted) 세션 토큰을 직접 jwt.verify()로 검증할 수 없기 때문이다. NextAuth는 next-auth.session-token이라는 암호화된 토큰을 사용한다. 이 토큰은 JWT가 아닌 JWE(JSON Web Encryption) 형식으로, 암호화가 적용되어 있으며 jsonwebtoken 라이브러리로는 직접 검증할 수 없다.

- 서버 컴포넌트의 fetch data를 props를 통해 클라이언트 컴포넌트로 넘겨주려 할 때 data에 undefined가 나타나 이 문제를 해결하는데 오랜 시간이 걸렸으나 해결할 수 있던 방법은 서버 컴포넌트는 layout.tsx, 클라이언트는 page.tsx 파일을 사용해야 한다. 반대로 사용하고 있었던 것...

- 추가 데이터 요청시 SSR 방식 고민 : 네트워크 비용과 서버 부하 증가, 응답 대기 시간에 따라 사용자 경험 우려

  > 서버 컴포넌트에서 초기 데이터를 로드하고, 클라이언트 컴포넌트에서 URL 쿼리 파라미터의 변경을 감지하여 추가 데이터를 갱신하는 방식으로 사용.

- Prisma에서는 데이터 조회 후 필요한 계산과 그룹화를 JavaScript로 처리한다. Prisma 자체는 데이터베이스 레벨에서의 그룹화, 집계 쿼리를 지원하지만, 복잡한 로직은 데이터베이스 쿼리 후 JavaScript에서 수행하는 편이 더 유연하다.

- styled-components code를 분리하고 초기 fetch를 제거? > 이 상태에 대한 개선된 점 확인

* css in js인 styled-components를 tailwind를 변경할지?(현업에서 많이 사용하고 업데이트가 잘되는지)
