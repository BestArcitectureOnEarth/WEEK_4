// SSR 방식
export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/posts", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  // 응답 상태 체크
  if (!res.ok) {
    return { props: { posts: [] } }; // 오류 시 빈 배열 반환
  }

  const posts = await res.json();
  console.log(posts);
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>홈 페이지</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
