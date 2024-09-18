import './globals.css'
import { Fascinate_Inline } from 'next/font/google'

const fascinateInline = Fascinate_Inline({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: '宠物 MBTI 测试',
  description: '通过 AI 聊天测试您宠物的 MBTI 类型',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={fascinateInline.className}>{children}</body>
    </html>
  )
}