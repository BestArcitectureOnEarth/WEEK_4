// 정적 생성 (빌드 시 HTML 생성)
export async function getStaticProps() {
  return {
    props: {
      company: "홍익개발팀",
      mission: "IT 소외 계층을 위한 플랫폼 구축",
    },
  };
}

export default function About({ company, mission }) {
  return (
    <div>
      <h1>📘 소개</h1>
      <p>
        <strong>{company}</strong>은(는) {mission}을 위해 활동하고 있습니다.
      </p>
    </div>
  );
}
