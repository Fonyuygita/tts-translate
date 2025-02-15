alert("hello ")
const voiceSelect = document.querySelector('#voiceSelect');
const playButton = document.querySelector('#playButton');
const textInput = document.querySelector('textarea');
const languageSelect = document.querySelector('#languageSelect');

// Array of supported languages with their ISO codes
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
];

// load available voices

let voices = []

// populate the languages using the notion of templating
languages.forEach(({ code, name }) => {
  const option = document.createElement('option');
  option.value = code;
  option.textContent = name;
  languageSelect.appendChild(option)
})

const loadVoices = () => {
  voices = speechSynthesis.getVoices()
  voiceSelect.innerHTML = voices.map(
    (voice, index) => `<option value="${index}">${voice.name} (${voice.lang})<option/>`
  ).join('')
}

// call or trigger voices when they become available
speechSynthesis.onvoiceschanged = loadVoices
loadVoices()

playButton.addEventListener('click', () => {
  console.log("hello button")
  const text = new SpeechSynthesisUtterance(textInput.value)
  speechSynthesis.speak(text)
})


// // Populate language select box
// languages.forEach(({ code, name }) => {
//   const option = document.createElement('option');
//   option.value = code;
//   option.textContent = name;
//   languageSelect.appendChild(option);
// });

// // Load available voices
// let voices = [];
// function loadVoices() {
//   voices = speechSynthesis.getVoices();
//   voiceSelect.innerHTML = voices
//     .map(
//       (voice, index) =>
//         `<option value="${index}">${voice.name} (${voice.lang})</option>`
//     )
//     .join('');
// }

// // Trigger loading voices when they become available
// speechSynthesis.onvoiceschanged = loadVoices;
// loadVoices();

// // Translate text with serverless function
// async function translateText(text, targetLang) {
//   try {
//     const response = await fetch('/api/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         text,
//         target: targetLang,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();
//     return data.data.translations[0].translatedText;
//   } catch (error) {
//     console.error('Translation Error: ', error);
//     alert('Failed to translate text');
//     return text;
//   }
// }

// // TTS
// function playText(text, voiceIndex) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   if (voices[voiceIndex]) {
//     utterance.voice = voices[voiceIndex];
//   }
//   speechSynthesis.speak(utterance);
// }

// // Play TTS
// playButton.addEventListener('click', async () => {
//   console.log("play and click me dude");

//   const text = new SpeechSynthesisUtterance(textInput.value.trim());
//   const targetLang = languageSelect.value;
//   const selectedVoiceIndex = voiceSelect.value;

//   if (!text) {
//     alert('Please enter some text!');
//     return;
//   }

//   try {
//     // Translate text
//     const translatedText = await translateText(text, targetLang);
//     // Play text
//     playText(translatedText, selectedVoiceIndex);
//   } catch (error) {
//     console.error('Error during processing: ', error);
//     alert('An error occurred');
//   }
// });
