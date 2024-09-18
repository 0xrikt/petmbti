// test页面
'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Test.module.css';

export default function Test() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const [mbtiResult, setMbtiResult] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatAreaRef = useRef(null);
  const introSentRef = useRef(false); // 使用 useRef 确保开场白只发送一次

  useEffect(() => {
    if (!introSentRef.current) {
      const introMessage = `帮我测测我的${searchParams.get('type')}，它的名字是${searchParams.get('name')}，是个${searchParams.get('breed')}${searchParams.get('gender')}。接下来从一个简单的问题开始吧`;
      sendMessage(introMessage);
      introSentRef.current = true; // 设置为 true，确保开场白只发送一次
    }
  }, [searchParams]);

  const sendMessage = async (message) => {
    if (typeof message !== 'string' || message.trim() === '') return;

    const userMessage = { text: message, sentByUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);
    setOptions([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          chatHistory: messages.map(msg => ({
            role: msg.sentByUser ? "user" : "assistant",
            content: msg.text
          }))
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      handleBotResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleBotResponse = (botResponse) => {
    const optionsPattern = /OPTION-\d=\[(.*?)\]/gs;
    let match;
    let newOptions = [];
    let displayText = botResponse;

    while ((match = optionsPattern.exec(botResponse)) !== null) {
      newOptions.push({ text: match[1].trim() });
      displayText = displayText.replace(match[0], '');
    }

    setMessages(prevMessages => [...prevMessages, { text: displayText, sentByUser: false }]);
    setOptions(newOptions);
    setIsLoading(false);

    detectMBTIType(displayText);
  };

  const detectMBTIType = (text) => {
    const mbtiTypes = [
      "ISTJ", "ISFJ", "INFJ", "INTJ",
      "ISTP", "ISFP", "INFP", "INTP",
      "ESTP", "ESFP", "ENFP", "ENTP",
      "ESTJ", "ESFJ", "ENFJ", "ENTJ"
    ];
    const foundType = mbtiTypes.find(type => text.includes(type));
    if (foundType) {
      setMbtiResult(foundType);
      setShowResultButton(true);
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputText);
  };

  const optionSelected = (optionText) => {
    sendMessage(optionText);
  };

  const navigateToResultPage = () => {
    router.push(`/result?mbti=${encodeURIComponent(mbtiResult)}&name=${encodeURIComponent(searchParams.get('name'))}&type=${encodeURIComponent(searchParams.get('type'))}`);
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Image src="/images/paw-icon.png" alt="Paw Icon" width={100} height={100} className={styles.headerIcon} />
        <div className={styles.headerText}>
          嗨，我是 @毛绒派对TAILUP 的 AI 智能体！
          和我聊一聊你的宠物吧，我来告诉你 TA 的 MBTI 类型。你的回答越精确，我们的结果越准确。
        </div>
      </div>

      <div className={styles.chatArea} ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={message.sentByUser ? styles.userMessage : styles.botMessage}>
            {message.text}
          </div>
        ))}
        {options.length > 0 && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <button key={index} onClick={() => optionSelected(option.text)} className={styles.optionButton}>
                {option.text}
              </button>
            ))}
          </div>
        )}
        {showResultButton && (
          <button onClick={navigateToResultPage} className={styles.resultButton}>生成结果图</button>
        )}
        {isLoading && (
          <Image src="/images/loading.gif" alt="Loading" width={30} height={30} className={styles.loadingGif} />
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入消息..."
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>发送</button>
      </div>
    </div>
  );
}