document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      document.body.classList.toggle('light-theme');
      const isDark = document.body.classList.contains('dark-theme');
      if (themeIcon) {
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      showToast(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }

  // Main UI Elements
  const recordBtn = document.getElementById('record-btn');
  const recordIcon = document.getElementById('record-icon');
  const pulseRing = document.getElementById('pulse-ring');
  const waveform = document.getElementById('waveform');
  const statusBadge = document.getElementById('status-badge');
  const statusText = document.getElementById('status-text');
  const editor = document.getElementById('editor');
  const interimText = document.getElementById('interim-text');
  const langSelector = document.getElementById('lang-selector');
  const langPill = document.getElementById('lang-pill');
  const modePill = document.getElementById('mode-pill');
  
  // Metrics
  const wordCount = document.getElementById('word-count');
  const charCount = document.getElementById('char-count');
  const lineCount = document.getElementById('line-count');

  // Actions
  const btnCopy = document.getElementById('btn-copy');
  const btnTts = document.getElementById('btn-tts');
  const btnDownload = document.getElementById('btn-download');
  const btnDocx = document.getElementById('btn-docx');
  const btnAiCheck = document.getElementById('btn-ai-check');
  const btnClear = document.getElementById('btn-clear');
  const btnInfo = document.getElementById('btn-info');

  // Modal & Toast
  const infoModal = document.getElementById('info-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOk = document.getElementById('modal-ok');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  let isRecording = false;
  let recognition = null;
  let currentMode = 'typing';

  let availableVoices = [];
  function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
  }
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Mobile Chrome handling: continuous mode can cause duplicate logic issues on mobile, so optimize for device
    recognition.continuous = !isMobile;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecording = true;
      document.body.classList.add('recording');
      if (statusBadge) statusBadge.className = 'status-badge status--recording';
      if (statusText) statusText.textContent = 'Listening…';
      if (recordIcon) recordIcon.className = 'fa-solid fa-square';
      if (pulseRing) pulseRing.classList.add('active');
      if (waveform) waveform.classList.add('active');
    };

    recognition.onend = () => {
      // Auto-restart logic for desktop continuous recording
      if (isRecording && !isMobile) {
        try {
          recognition.start();
          return;
        } catch (e) {
          console.error('Restart Error:', e);
        }
      }
      
      isRecording = false;
      document.body.classList.remove('recording');
      if (statusBadge) statusBadge.className = 'status-badge status--idle';
      if (statusText) statusText.textContent = 'Ready';
      if (recordIcon) recordIcon.className = 'fa-solid fa-microphone';
      if (pulseRing) pulseRing.classList.remove('active');
      if (waveform) waveform.classList.remove('active');
      if (interimText) interimText.textContent = 'Live speech will appear here as you speak…';
    };

    // Mobile Safe Recognition Handler (Prevents duplication & appends accurately)
    recognition.onresult = async (event) => {
      let interimTranscript = '';
      let finalTranscriptChunk = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptChunk += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscriptChunk) {
        const selectedLang = langSelector ? langSelector.value : 'bn-BD';
        const parsedText = parseVoiceCommands(finalTranscriptChunk, selectedLang);

        if (currentMode === 'translation') {
          if (interimText) interimText.textContent = 'Translating…';
          const translatedText = await translateText(parsedText, selectedLang);
          const spacePrefix = (editor.value && !editor.value.endsWith(' ') && !editor.value.endsWith('\n')) ? ' ' : '';
          editor.value += spacePrefix + translatedText;
          if (interimText) interimText.textContent = 'Listening…';
        } else {
          const spacePrefix = (editor.value && !editor.value.endsWith(' ') && !editor.value.endsWith('\n')) ? ' ' : '';
          editor.value += spacePrefix + parsedText;
        }

        updateMetrics();
      }

      if (interimTranscript && interimText) {
        interimText.textContent = interimTranscript;
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        showToast('Speech error: ' + event.error);
      }
    };
  } else {
    showToast('Web Speech API is not supported in this browser.');
  }

  async function translateText(text, sourceLang) {
    try {
      let source = sourceLang.toLowerCase().startsWith('bn') ? 'bn' : 'en';
      let target = (source === 'bn') ? 'en' : 'bn';

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data[0]) {
        return data[0].map(item => item[0]).join('');
      }
      return text;
    } catch (error) {
      console.error('Translation Error:', error);
      showToast('Translation failed.');
      return text;
    }
  }

  function parseVoiceCommands(text, lang) {
    let output = text;
    const isBangla = lang.toLowerCase().startsWith('bn');

    if (isBangla) {
      output = output
        .replace(/\bদাঁড়ি\b|\bদাড়ি\b|\bফুলস্টপ\b/g, '।')
        .replace(/\bকমা\b/g, ',')
        .replace(/\bপ্রশ্নবোধক চিহ্ন\b|\bপ্রশ্নবোধক\b/g, '?')
        .replace(/\bবিস্ময়বোধক চিহ্ন\b|\bবিস্ময়বোধক\b/g, '!')
        .replace(/\bকোলোন\b/g, ':')
        .replace(/\bসেমিকোলোন\b/g, ';')
        .replace(/\bনতুন লাইন\b|\bনতুন অনুচ্ছেদ\b/g, '\n');
    } else {
      output = output
        .replace(/\bperiod\b|\bfull stop\b/gi, '.')
        .replace(/\bcomma\b/gi, ',')
        .replace(/\bquestion mark\b/gi, '?')
        .replace(/\bexclamation mark\b/gi, '!')
        .replace(/\bcolon\b/gi, ':')
        .replace(/\bsemicolon\b/gi, ';')
        .replace(/\bnew line\b|\bnew paragraph\b/gi, '\n');
    }
    return output;
  }

  if (recordBtn) {
    recordBtn.addEventListener('click', () => {
      if (!recognition) return;
      if (isRecording) {
        isRecording = false;
        recognition.stop();
      } else {
        recognition.lang = langSelector ? langSelector.value : 'bn-BD';
        try {
          recognition.start();
        } catch (e) {
          console.error("Start error:", e);
        }
      }
    });
  }

  if (langSelector) {
    langSelector.addEventListener('change', (e) => {
      const selectedText = e.target.options[e.target.selectedIndex].text.split('—')[0].trim();
      if (langPill) langPill.textContent = selectedText;
      
      if (recognition) {
        recognition.lang = e.target.value;
      }

      if (isRecording) {
        isRecording = false;
        recognition.stop();
      }
    });
  }

  const btnModeTyping = document.getElementById('btn-mode-typing');
  const btnModeTranslation = document.getElementById('btn-mode-translation');

  function setMode(mode) {
    currentMode = mode;
    if (mode === 'typing') {
      if (btnModeTyping) btnModeTyping.classList.add('mode-btn--active');
      if (btnModeTranslation) btnModeTranslation.classList.remove('mode-btn--active');
      if (modePill) modePill.textContent = 'Voice Typing';
      showToast('Voice Typing mode activated');
    } else {
      if (btnModeTranslation) btnModeTranslation.classList.add('mode-btn--active');
      if (btnModeTyping) btnModeTyping.classList.remove('mode-btn--active');
      if (modePill) modePill.textContent = 'Live Translation';
      showToast('Live Translation mode activated');
    }
  }

  if (btnModeTyping) btnModeTyping.addEventListener('click', () => setMode('typing'));
  if (btnModeTranslation) btnModeTranslation.addEventListener('click', () => setMode('translation'));

  function updateMetrics() {
    if (!editor) return;
    const text = editor.value;
    if (charCount) charCount.textContent = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (wordCount) wordCount.textContent = words.length;
    const lines = text.split('\n');
    if (lineCount) lineCount.textContent = text ? lines.length : 0;
  }

  if (editor) editor.addEventListener('input', updateMetrics);

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (!editor.value) return;
      navigator.clipboard.writeText(editor.value).then(() => {
        showToast('Copied to clipboard!');
      });
    });
  }

  if (btnTts) {
    btnTts.addEventListener('click', () => {
      const textToRead = editor.value.trim();
      if (!textToRead) {
        showToast('পড়ার জন্য কোনো টেক্সট নেই!');
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      const selectedLang = langSelector ? langSelector.value : 'bn-BD';
      const isBangla = selectedLang.toLowerCase().startsWith('bn');

      utterance.lang = isBangla ? 'bn-BD' : 'en-US';

      if (availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
      }

      const targetLangCode = utterance.lang.split('-')[0];
      const matchingVoice = availableVoices.find(v => v.lang.toLowerCase().includes(targetLangCode));
      
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
      showToast('Reading aloud…');
    });
  }

  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      if (!editor.value) return;
      const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BakSutra-Transcript.txt';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Saved as .txt');
    });
  }

  if (btnDocx) {
    btnDocx.addEventListener('click', () => {
      const text = editor.value;
      if (!text.trim()) {
        showToast('ডাউনলোড করার জন্য কোনো টেক্সট নেই!');
        return;
      }

      try {
        const { Document, Packer, Paragraph, TextRun } = window.docx;
        const lines = text.split('\n');
        
        const docParagraphs = lines.map(line => new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24,
              font: "Arial"
            })
          ],
          spacing: { after: 120 }
        }));

        const doc = new Document({
          sections: [{
            properties: {},
            children: docParagraphs
          }]
        });

        Packer.toBlob(doc).then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'BakSutra-Document.docx';
          a.click();
          URL.revokeObjectURL(url);
          showToast('Word (.docx) ফাইল তৈরি হয়েছে!');
        });
      } catch (err) {
        console.error(err);
        showToast('Word ফাইল তৈরিতে সমস্যা হয়েছে');
      }
    });
  }

  if (btnAiCheck) {
    btnAiCheck.addEventListener('click', () => {
      const text = editor.value;
      if (!text.trim()) {
        showToast('চেক করার জন্য কোনো টেক্সট নেই!');
        return;
      }

      const masterPrompt = 
`দয়া করে নিচের দেওয়া টেক্সটটি মনোযোগ দিয়ে পড়ুন এবং প্রয়োজনীয় সংশোধন করে দিন:

১. ব্যাকরণগত ও বানান ভুলগুলো ঠিক করুন।
২. সঠিক বিরামচিহ্ন (দাঁড়ি, কমা ইত্যাদি) ঠিকভাবে বসিয়ে দিন।
৩. টেক্সটটির মূল ভাব অপরিবর্তিত রেখে লেখাটি আরও সুন্দর ও প্রফেশনাল করে গুছিয়ে দিন।
৪. প্রথমে সংশোধিত "সম্পূর্ণ টেক্সট" দিন এবং নিচে কী কী পরিবর্তন বা সংশোধন করেছেন তা সংক্ষেপে পয়েন্ট আকারে উল্লেখ করুন।

--- মূল টেক্সট ---
${text}`;

      navigator.clipboard.writeText(masterPrompt).then(() => {
        showToast('প্রম্পট কপি হয়েছে! Gemini-তে পেস্ট করুন');
        setTimeout(() => {
          window.open('https://gemini.google.com/', '_blank');
        }, 1000);
      }).catch(() => {
        showToast('কপি করতে সমস্যা হয়েছে!');
      });
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      window.speechSynthesis.cancel();
      editor.value = '';
      updateMetrics();
      showToast('Text cleared!');
    });
  }

  if (btnInfo && infoModal) btnInfo.addEventListener('click', () => infoModal.classList.add('active'));
  if (modalClose && infoModal) modalClose.addEventListener('click', () => infoModal.classList.remove('active'));
  if (modalOk && infoModal) modalOk.addEventListener('click', () => infoModal.classList.remove('active'));

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
});