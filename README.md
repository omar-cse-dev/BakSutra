# 🎙️ BakSutra (বাকসূত্র) — Web-Based Voice Typing & AI Workspace

## 🌟 Overview / সংক্ষিপ্ত পরিচিতি

**BakSutra (বাকসূত্র)** হলো একটি আধুনিক, হালকা এবং সম্পূর্ণ ক্লায়েন্ট-সাইড ওয়েব অ্যাপ্লিকেশন। এটি মুখ দিয়ে বলা কথাকে তাৎক্ষণিকভাবে নিখুঁত টেক্সটে রূপান্তর করার পাশাপাশি ব্যবহারকারীকে এক চমৎকার ভয়েস টাইপিং ও টেক্সট প্রসেসিং অভিজ্ঞতা প্রদান করে।

**BakSutra** is a modern, lightweight, and fully client-side web application designed to convert spoken words into accurate written text in real-time. It delivers an effortless voice typing, live translation, and text-editing experience directly inside your browser.

---

## 🌟 Key Features / প্রধান ফিচারসমূহ

### 1. Real-Time Speech Recognition / রিয়েল-টাইম ভয়েস টাইপিং
* **Instant Speech-to-Text:** ব্রাউজারের নেটিভ Web Speech API ব্যবহার করে অত্যন্ত নিখুঁতভাবে এবং দ্রুত মুখে বলা কথাকে টেক্সটে রূপান্তর করে। (Utilizes the browser's native Web Speech API for fast and accurate voice transcription without requiring external software.)
* **Live Interim Preview:** কথা বলার সাথে সাথে স্ক্রিনে লাইভ প্রিভিউ দেখা যায় এবং বাক্য শেষ হলে তা মূল এডিটরে যোগ হয়। (Real-time preview of spoken words appears dynamically before inserting final sentences into the editor.)
* **Animated Waveform:** ভয়েস টাইপিং চলাকালীন সুন্দর ভিজ্যুয়াল সাউন্ড ওয়েভফর্ম ও অ্যানিমেশন প্রদর্শিত হয়। (Features smooth visual sound waveform animations while listening to your voice.)

### 2. Smart Punctuation Voice Commands / স্মার্ট ভয়েস কম্যান্ড
* **Auto-Punctuation:** টাইপ করার সময় মুখে "দাঁড়ি", "কমা", "প্রশ্নবোধক চিহ্ন", "বিস্ময়বোধক চিহ্ন", "কোলোন" কিংবা "নতুন লাইন" বললে তা স্বয়ংক্রিয়ভাবে বিরামচিহ্ন বা নিউ-লাইনে রূপান্তরিত হয়। (Automatically inserts punctuation marks such as full stop, comma, question mark, exclamation mark, colon, semicolon, and new line when spoken.)
* **Dual-Language Commands:** বাংলা এবং ইংরেজি—উভয় ভাষাতেই স্মার্ট ভয়েস কম্যান্ড সাপোর্ট করে। (Fully supports smart punctuation voice commands in both Bengali and English.)

### 3. Live Voice Translation / রিয়েল-টাইম লাইভ ট্রান্সলেশন
* **Instant Mode Switch:** একক ক্লিকে 'Voice Typing' মোড থেকে 'Live Translation' মোডে পরিবর্তন করা যায়। (Seamlessly switch between Voice Typing mode and Live Translation mode with a single click.)
* **On-the-Fly Translation:** মুখ দিয়ে বাংলা বললে তা সরাসরি ইংরেজিতে অনুদিত হয়ে এডিটরে বসে যায়, আবার ইংরেজিতে বললে তা বাংলায় রূপান্তরিত হয়। (Transcribes spoken Bengali directly into English text, or translates spoken English directly into Bengali inside the editor.)

### 4. Text-to-Speech (Read Aloud) / অডিও রিডিং
* **Audio Playback:** এডিটরে থাকা যেকোনো টেক্সটকে অ্যাপটি স্পষ্ট ও প্রাকৃতিক উচ্চারণে পড়ে শোনাতে পারে। (Reads aloud any transcribed text inside the editor using natural speech synthesis.)
* **Language-Aware Accent:** নির্বাচিত ভাষা অনুযায়ী এটি স্বয়ংক্রিয়ভাবে সঠিক ভয়েস বেছে নেয়। (Automatically selects the appropriate voice engine matching the selected language.)

### 5. Glassmorphism UI & Dual Theme / গ্লাসমোরফিজম ইউআই এবং ডার্ক/লাইট মোড
* **Modern Aesthetic:** সুন্দর CSS Glassmorphism ইফেক্ট এবং অ্যামবিয়েন্ট ব্যাকগ্রাউন্ড ব্যবহার করা হয়েছে। (Styled with custom CSS glassmorphism and glowing ambient background elements.)
* **Dark & Light Themes:** দিন বা রাতের সুবিধা অনুযায়ী এক ক্লিকেই থিম ডার্ক এবং লাইট মোডে পরিবর্তন করা যায়। (Toggle effortlessly between light and dark modes according to your preference.)

### 6. AI Assistant Prompt Integration / স্মার্ট AI অ্যাসিস্ট্যান্ট প্রম্পট
* **One-Click AI Check:** 'AI Check' বাটনে ক্লিক করলে আপনার লিখিত টেক্সটটি একটি মাস্টার প্রম্পট হিসেবে কপি হয়ে যায় এবং সরাসরি Google Gemini চালু করে, যাতে সহজে লেখাটি রিভিউ করানো যায়। (The 'AI Check' button wraps your written text into a structured prompt, copies it to the clipboard, and opens Google Gemini for quick grammar and formatting review.)

### 7. Multi-Format File Export / একাধিক ফরম্যাটে ফাইল এক্সপোর্ট
* **Word Document (.docx) Export:** ক্লায়েন্ট-সাইডে সরাসরি Microsoft Word (.docx) ফরম্যাটে ফাইল ডাউনলোড করা যায়। (Generates and downloads native Microsoft Word .docx files directly on the client side.)
* **Plain Text (.txt) Download:** এক ক্লিকে সম্পূর্ণ টেক্সট ফাইল টিএক্সটি (.txt) ফরম্যাটে সেভ করার সুবিধা। (Export your transcript as a .txt file with a single click.)

### 8. Live Text Analytics & Quick Tools / লাইভ টেক্সট মেট্রিক্স ও ইউটিলিটি
* **Real-Time Counters:** টাইপ করার সময় রিয়েল-টাইমে মোট শব্দ সংখ্যা (Word Count), অক্ষর সংখ্যা (Character Count) এবং লাইন সংখ্যা (Line Count) দেখা যায়। (Live tracking for Word Count, Character Count, and Line Count as you speak or edit.)
* **Quick Actions:** দ্রুত ক্লিপবোর্ড কপি, এডিটর ক্লিয়ার করা এবং ভয়েস কম্যান্ড হেল্প গাইডের সুবিধা। (Instant copy to clipboard, clear canvas option, and an interactive voice command helper guide.)

### 9. Fully Responsive & Mobile-Optimized / রেসপন্সিভ ডিজাইন
* **Cross-Device Support:** ডেসকটপ, ল্যাপটপ, ট্যাবলেট এবং স্মার্টফোনে মসৃণভাবে চলার উপযোগী। (Optimized for desktop browsers, laptops, tablets, and smartphones.)
* **Mobile-Safe Logic:** মোবাইল ব্রাউজারে টাইপিংয়ের সময় লেখা বারবার রিপিট হওয়া থেকে রোধ করার লজিক যুক্ত করা হয়েছে। (Custom JavaScript handling prevents duplicate text insertion on mobile browsers.)

---

## 👨‍💻 Developer Information / ডেভেলপার পরিচিতি

* **Designed & Developed By:** **Omar Mohammad Chowdhury** (ওমর মোহাম্মদ চৌধুরী)
* **Location:** Chattogram, Bangladesh (চট্টগ্রাম, বাংলাদেশ)
* **Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Web Speech API, Google Fonts, FontAwesome, Docx.js
