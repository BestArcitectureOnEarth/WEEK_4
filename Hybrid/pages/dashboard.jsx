// 로그인 여부 확인 후 개인화 데이터 전달
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const res = await fetch("http://localhost:5000/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await res.json();

  return { props: { user } };
}

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>안녕하세요, {user.name}님 👋</h1>
    </div>
  );
}
