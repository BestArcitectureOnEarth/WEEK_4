import dynamic from "next/dynamic";

const ChatBox = dynamic(() => import("../components/ChatBox"), {
  ssr: false,
});

export default function ChatPage() {
  return (
    <div>
      <h1>💬 실시간 채팅</h1>
      <ChatBox />
    </div>
  );
}
