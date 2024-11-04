export default function ABookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <h3>이 곳은 가계부 메인 화면입니다.</h3>
    </div>
  );
}
