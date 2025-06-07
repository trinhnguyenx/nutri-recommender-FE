<template>
  <Header />

  <div class="chat-container">
    <!-- Sidebar Conversations -->
    <div class="sidebar">
      <div class="conversation-list">
        <div class="intro-box">
          <h3>🥦 Chat với Rio</h3>
          <p>Trợ lý AI sức khỏe của bạn</p>
        </div>

        <div
          v-for="conv in conversations"
          :key="conv.id"
          :class="['conversation-item', { active: conv.id === activeConversationId }]"
          @click="selectConversation(conv.id)"
        >
          {{ conv.title || 'Không có tiêu đề' }}
          <div class="timestamp">{{ formatDate(conv.startedAt) }}</div>
        </div>
      </div>
    </div>

    <!-- Chat Window -->
    <div class="chat-window">
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message-wrapper', msg.sender]"
        >
          <img
            v-if="msg.sender === 'bot'"
            class="avatar"
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="Ria Avatar"
          />
          <div :class="['message', msg.sender]" v-html="msg.text"></div>
        </div>

        <div v-if="typingText" class="message-wrapper bot">
          <img
            class="avatar"
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="Ria Avatar"
          />
          <div class="message bot" v-html="typingText"></div>
        </div>

        <!-- Loading dots -->
        <div v-if="isLoading && !typingText" class="message-wrapper bot">
          <img
            class="avatar"
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="Ria Avatar"
          />
          <div class="message bot loading short">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="input-area">
        <input
          type="text"
          v-model="userInput"
          placeholder="Nhập câu hỏi..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getConversationsApi,
  getMessagesApi,
  sendMesssageApi,
} from '@/services/api.ts';
import { useUserStore } from '../../store/user.store';
import Header from "@/views/headerpage/index.vue";

const userStore = useUserStore();

const conversations = ref([]);
const messages = ref([]);
const activeConversationId = ref('');
const userInput = ref('');
const isLoading = ref(false);
const typingText = ref('');
const userId = userStore.user?.id || 'hardcoded-user-id';

onMounted(async () => {
  const { data } = await getConversationsApi(userId);
  conversations.value = data;
  messages.value = [{
    text: '<strong>Xin chào!</strong> Mình là Rio – trợ lý sức khoẻ của bạn. Hãy hỏi mình bất cứ điều gì về dinh dưỡng mà bạn cần biết ! 💚',
    sender: 'bot',
  }];
});

const selectConversation = async (id) => {
  activeConversationId.value = id;
  const { data } = await getMessagesApi(id);
  messages.value = data.map((msg) => ({
    text: msg.sender === 'ai' ? parseAiMessage(msg.content) : msg.content,
    sender: msg.sender === 'ai' ? 'bot' : 'user',
  }));
};

const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  // Thêm message user vào danh sách ngay
  messages.value.push({ text, sender: 'user' });
  userInput.value = '';
  isLoading.value = true;

  try {
    // Gửi API nhận phản hồi AI
    const { data: aiResponse } = await sendMesssageApi({
      userId,
      message: text,
      conversationId: activeConversationId.value || '',
    });

    // Nếu chưa có conversationId (lần đầu), lấy lại conversations mới tạo và set active
    if (!activeConversationId.value) {
      const { data: convs } = await getConversationsApi(userId);
      conversations.value = convs;
      activeConversationId.value = convs[0]?.id || '';
    }

    // Kiểm tra dữ liệu phản hồi AI
    const fullText = parseAiMessage(typeof aiResponse === 'string' ? aiResponse : aiResponse.reply || '');

    // Hiệu ứng gõ chữ
    typingText.value = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        typingText.value += fullText[i++];
      } else {
        clearInterval(interval);
        // Khi gõ xong, push message bot vào messages, xóa typingText
        messages.value.push({ text: typingText.value, sender: 'bot' });
        typingText.value = '';
      }
    }, 20);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};


const formatDate = (date) => new Date(date).toLocaleString();

const parseAiMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')               // bold
    .replace(/^\* (.*?)$/gm, '<li>$1</li>')                         // bullet
    .replace(/(<li>.*?<\/li>)+/gs, (match) => `<ul>${match}</ul>`)  // wrap ul
    .replace(/\n/g, '<p>');                                         // paragraphs
};
</script>

<style>
:root {
  --primary-color: #2ecc71;
  --secondary-color: #a3e4d7;
  --highlight-color: #d1f2eb;
  --text-muted: #777;
  --chatbot-bg: #f9fdfb;
}

.chat-container {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background: var(--chatbot-bg);
}

/* Sidebar */
.sidebar {
  width: 320px;
  background: white;
  box-shadow: 2px 0 5px rgba(0,0,0,0.05);
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.conversation-list {
  padding: 20px;
}

.intro-box {
  background: var(--highlight-color);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.intro-box h3 {
  margin: 0;
  font-size: 18px;
  color: var(--primary-color);
}

.intro-box p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 14px;
}

.conversation-item {
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #fdfdfd;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.conversation-item:hover,
.conversation-item.active {
  background: var(--highlight-color);
  border-color: var(--primary-color);
}

.timestamp {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* Chat Window */
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
}

.message-wrapper.bot {
  flex-direction: row;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
}

.message {
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 15px;
}

.message.user {
  background: #d1f0fc;
  margin-left: auto;
  text-align: right;
  border: 1px solid #c1eaf7;
}

.message.bot {
  background: #f3fdf7;
  border: 1px solid #d7fbe3;
  text-align: left;
}

.message.loading {
  display: flex;
  gap: 4px;
  align-items: center;
}

.message.bot.loading.short {
  padding: 8px 12px;
  width: fit-content;
  background: #f3fdf7;
  border-radius: 12px;
  border: 1px solid #d7fbe3;
}

.dot {
  width: 6px;
  height: 6px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 12px;
  background: #fafafa;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

.input-area input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: none;
}

.input-area button {
  padding: 10px 16px;
  margin-left: 10px;
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-area button:hover {
  background: #27ae60;
}
</style>
