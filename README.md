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
