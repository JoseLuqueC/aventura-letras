import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Heart, Star, IceCream, Bike, TreePine, 
  Loader2, Lock, ArrowLeft, Play, Volume2, 
  SpellCheck, Brain, LayoutGrid, Users, Languages, Gift,
  Ticket, Film, Pizza, Utensils, XCircle, RotateCcw,
  Hourglass, Save, Ear, UserCircle, Edit2, BookOpen, Palette, Popcorn,
  Database, Download, CheckCircle, WifiOff
} from 'lucide-react';

// ----------------------------------------------------------------------
// ⚠️ PEGA AQUÍ TU API KEY ⚠️
// ----------------------------------------------------------------------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- GESTOR DE BASE DE DATOS (IndexedDB) ---
const DB_NAME = 'AventuraLetrasDB';
const DB_VERSION = 1;
const STORE_NAME = 'audio_cache';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const getAudioFromDB = async (key) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    return null;
  }
};

const saveAudioToDB = async (key, blob) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(blob, key);
  } catch (e) {
    console.error("DB Error", e);
  }
};

// --- DATA ---
const VOCABULARIO_ABC = [
  { letra: 'A', esp: 'Avión', eng: 'Apple', emojiEsp: '✈️', emojiEng: '🍎' },
  { letra: 'B', esp: 'Ballena', eng: 'Bear', emojiEsp: '🐋', emojiEng: '🐻' },
  { letra: 'C', esp: 'Carro', eng: 'Cat', emojiEsp: '🚗', emojiEng: '🐱' },
  { letra: 'D', esp: 'Dedo', eng: 'Dog', emojiEsp: '☝️', emojiEng: '🐶' },
  { letra: 'E', esp: 'Elefante', eng: 'Elephant', emojiEsp: '🐘', emojiEng: '🐘' },
  { letra: 'F', esp: 'Flor', eng: 'Fish', emojiEsp: '🌸', emojiEng: '🐟' },
  { letra: 'G', esp: 'Gato', eng: 'Gorilla', emojiEsp: '🐱', emojiEng: '🦍' },
  { letra: 'H', esp: 'Helado', eng: 'Hippo', emojiEsp: '🍦', emojiEng: '🦛' },
  { letra: 'I', esp: 'Isla', eng: 'Iguana', emojiEsp: '🏝️', emojiEng: '🦎' },
  { letra: 'J', esp: 'Jirafa', eng: 'Jaguar', emojiEsp: '🦒', emojiEng: '🐆' },
  { letra: 'L', esp: 'León', eng: 'Lemon', emojiEsp: '🦁', emojiEng: '🍋' },
  { letra: 'M', esp: 'Manzana', eng: 'Monkey', emojiEsp: '🍎', emojiEng: '🐒' },
  { letra: 'N', esp: 'Nube', eng: 'Nest', emojiEsp: '☁️', emojiEng: '🪺' },
  { letra: 'O', esp: 'Oso', eng: 'Owl', emojiEsp: '🐻', emojiEng: '🦉' },
  { letra: 'P', esp: 'Perro', eng: 'Penguin', emojiEsp: '🐶', emojiEng: '🐧' },
  { letra: 'Q', esp: 'Queso', eng: 'Queen', emojiEsp: '🧀', emojiEng: '👑' },
  { letra: 'R', esp: 'Rana', eng: 'Rabbit', emojiEsp: '🐸', emojiEng: '🐰' },
  { letra: 'S', esp: 'Sol', eng: 'Snake', emojiEsp: '☀️', emojiEng: '🐍' },
  { letra: 'T', esp: 'Tren', eng: 'Tiger', emojiEsp: '🚂', emojiEng: '🐯' },
  { letra: 'U', esp: 'Uva', eng: 'Umbrella', emojiEsp: '🍇', emojiEng: '☂️' },
  { letra: 'V', esp: 'Vaca', eng: 'Violin', emojiEsp: '🐮', emojiEng: '🎻' },
  { letra: 'Z', esp: 'Zapato', eng: 'Zebra', emojiEsp: '👟', emojiEng: '🦓' },
];

const VOCABULARIO_PAREJAS = [
  { eng: 'Airplane', esp: 'Avión', emoji: '✈️' },
  { eng: 'Whale', esp: 'Ballena', emoji: '🐋' },
  { eng: 'Car', esp: 'Carro', emoji: '🚗' },
  { eng: 'Dinosaur', esp: 'Dinosaurio', emoji: '🦖' },
  { eng: 'Elephant', esp: 'Elefante', emoji: '🐘' },
  { eng: 'Flower', esp: 'Flor', emoji: '🌸' },
  { eng: 'Gorilla', esp: 'Gorila', emoji: '🦍' },
  { eng: 'Hippo', esp: 'Hipopótamo', emoji: '🦛' },
  { eng: 'Island', esp: 'Isla', emoji: '🏝️' },
  { eng: 'Giraffe', esp: 'Jirafa', emoji: '🦒' },
  { eng: 'Lion', esp: 'León', emoji: '🦁' },
  { eng: 'Apple', esp: 'Manzana', emoji: '🍎' },
  { eng: 'Cloud', esp: 'Nube', emoji: '☁️' },
  { eng: 'Bear', esp: 'Oso', emoji: '🐻' },
  { eng: 'Dog', esp: 'Perro', emoji: '🐶' },
  { eng: 'Cheese', esp: 'Queso', emoji: '🧀' },
  { eng: 'Frog', esp: 'Rana', emoji: '🐸' },
  { eng: 'Sun', esp: 'Sol', emoji: '☀️' },
  { eng: 'Train', esp: 'Tren', emoji: '🚂' },
  { eng: 'Grape', esp: 'Uva', emoji: '🍇' },
  { eng: 'Cow', esp: 'Vaca', emoji: '🐮' },
  { eng: 'Shoe', esp: 'Zapato', emoji: '👟' },
  { eng: 'Zebra', esp: 'Cebra', emoji: '🦓' },
];

const PALABRAS_DELETREO = [
  { palabra: 'MAMÁ', emoji: '👩' },
  { palabra: 'PAPÁ', emoji: '👨' },
  { palabra: 'SOPA', emoji: '🥣' },
  { palabra: 'SAPO', emoji: '🐸' },
  { palabra: 'AVIÓN', emoji: '✈️' },
  { palabra: 'HIELO', emoji: '🧊' },
  { palabra: 'QUESO', emoji: '🧀' },
  { palabra: 'ZAPATO', emoji: '👟' },
  { palabra: 'COMIDA', emoji: '🍽️' },
  { palabra: 'PELOTA', emoji: '🏀' },
];

const PREMIOS = [
  { id: 1, nombre: "Paseo en Bicicleta", costo: 650, icon: <Bike className="w-6 h-6 text-blue-500" /> },
  { id: 2, nombre: "Comer Helado", costo: 1000, icon: <IceCream className="w-6 h-6 text-pink-500" /> },
  { id: 3, nombre: "Película en casa", costo: 800, icon: <Film className="w-6 h-6 text-purple-500" /> },
  { id: 4, nombre: "Comer Pizza", costo: 1200, icon: <Pizza className="w-6 h-6 text-red-500" /> },
  { id: 5, nombre: "Una partida de juego de mesa", costo: 300, icon: <LayoutGrid className="w-6 h-6 text-orange-500" /> },
  { id: 6, nombre: "Crispetas", costo: 400, icon: <Popcorn className="w-6 h-6 text-yellow-600" /> },
  { id: 7, nombre: "Cuento para dormir", costo: 300, icon: <BookOpen className="w-6 h-6 text-indigo-500" /> },
  { id: 8, nombre: "Pintar con la mamá", costo: 600, icon: <Palette className="w-6 h-6 text-emerald-500" /> },
  { id: 9, nombre: "Comer fuera", costo: 2000, icon: <Utensils className="w-6 h-6 text-slate-600" /> },
];

const createWavBlob = (pcmDataB64, sampleRate = 24000) => {
  try {
    const binaryString = atob(pcmDataB64);
    const len = binaryString.length;
    const pcmData = new Uint8Array(len);
    for (let i = 0; i < len; i++) { pcmData[i] = binaryString.charCodeAt(i); }
    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + pcmData.length, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, pcmData.length, true);
    return new Blob([wavHeader, pcmData], { type: 'audio/wav' });
  } catch (error) {
    console.error("WAV Error", error);
    return null;
  }
};

const App = () => {
  // --- STATE ---
  const [stars, setStars] = useState(() => { try { return parseInt(localStorage.getItem('aventura_stars') || 0, 10); } catch { return 0; } });
  const [alphabetIdx, setAlphabetIdx] = useState(() => { try { return parseInt(localStorage.getItem('aventura_alphabetIdx') || 0, 10); } catch { return 0; } });
  const [spellingIdx, setSpellingIdx] = useState(() => { try { return parseInt(localStorage.getItem('aventura_spellingIdx') || 0, 10); } catch { return 0; } });

  useEffect(() => { localStorage.setItem('aventura_stars', stars); }, [stars]);
  useEffect(() => { localStorage.setItem('aventura_alphabetIdx', alphabetIdx); }, [alphabetIdx]);
  useEffect(() => { localStorage.setItem('aventura_spellingIdx', spellingIdx); }, [spellingIdx]);

  const [view, setView] = useState('menu'); 
  const [loadingAudioId, setLoadingAudioId] = useState(null); 
  
  // DOWNLOAD MANAGER STATE
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const audioRef = useRef(null);
  const audioCacheRAM = useRef(new Map()); 
  const isFetching = useRef(false); 
  const [errorFeedback, setErrorFeedback] = useState(false);

  const [heardEsp, setHeardEsp] = useState(false);
  const [heardEng, setHeardEng] = useState(false);
  const [typed, setTyped] = useState('');
  
  // Memoria
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerNames, setPlayerNames] = useState(['Participante 1', 'Participante 2', 'Participante 3']);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerScores, setPlayerScores] = useState([0, 0, 0]);
  const [memoryCards, setMemoryCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [solvedPairs, setSolvedPairs] = useState([]);
  const [waitingToClear, setWaitingToClear] = useState(false);

  const [matchOptions, setMatchOptions] = useState({ left: [], right: [] });
  const [matchSelected, setMatchSelected] = useState({ left: null, right: null });

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  };

  const fetchAudioFromAPI = async (text, voice) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`;
    const payload = {
      contents: [{ parts: [{ text }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } },
      model: "gemini-2.5-flash-preview-tts"
    };

    let lastError;
    const delays = [2000, 4000, 8000]; // Tiempos de espera agresivos para evitar 429

    for (let i = 0; i <= delays.length; i++) {
      try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (response.ok) {
          const data = await response.json();
          const audioData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
          if (audioData) return audioData;
        }
        lastError = new Error(`API ${response.status}`);
        if (response.status === 400 || response.status === 403) throw lastError;
      } catch (err) { lastError = err; }
      if (i < delays.length) await new Promise(r => setTimeout(r, delays[i]));
    }
    throw lastError;
  };

  const playTTS = async (text, lang, type, onEnd) => {
    if (isFetching.current) return;
    const cacheKey = `${text}-${lang}`;
    cleanupAudio();
    
    // 1. RAM
    if (audioCacheRAM.current.has(cacheKey)) {
      const audio = new Audio(audioCacheRAM.current.get(cacheKey));
      audioRef.current = audio;
      audio.onplay = () => { if (onEnd) onEnd(); };
      try { await audio.play(); } catch (e) {}
      return;
    }

    isFetching.current = true;
    setLoadingAudioId(cacheKey);

    try {
      let audioBlob;
      // 2. DISK
      const cachedBlob = await getAudioFromDB(cacheKey);
      if (cachedBlob) {
        audioBlob = cachedBlob;
      } else {
        // 3. API
        const voice = lang === 'es' ? 'Kore' : 'Zephyr';
        const promptText = lang === 'es' ? `Di alegremente: ${text}` : `Say cheerfully: ${text}`;
        const audioData = await fetchAudioFromAPI(promptText, voice);
        audioBlob = createWavBlob(audioData, 24000);
        if (audioBlob) saveAudioToDB(cacheKey, audioBlob);
      }

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioCacheRAM.current.set(cacheKey, audioUrl);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onplay = () => { if (onEnd) onEnd(); };
        audio.onended = () => setLoadingAudioId(null);
        await audio.play();
      }
    } catch (e) {
      setLoadingAudioId(null);
      if (onEnd) onEnd();
    } finally {
      isFetching.current = false;
    }
  };

  // --- DOWNLOAD MANAGER ---
  const downloadAllContent = async () => {
    if (isDownloading) return;
    if (!API_KEY) { alert("¡Falta la API KEY!"); return; }
    
    setIsDownloading(true);
    
    // 1. Recolectar todas las palabras únicas
    const queue = [];
    
    // ABC
    VOCABULARIO_ABC.forEach(i => {
      queue.push({ text: i.esp, lang: 'es' });
      queue.push({ text: i.eng, lang: 'en' });
    });
    // PAREJAS
    VOCABULARIO_PAREJAS.forEach(i => {
      queue.push({ text: i.esp, lang: 'es' });
      queue.push({ text: i.eng, lang: 'en' });
    });
    // SPELLING
    PALABRAS_DELETREO.forEach(i => {
      queue.push({ text: i.palabra, lang: 'es' });
    });
    // MENSAJES DEL SISTEMA
    queue.push({ text: "¡Correcto!", lang: 'es' });
    queue.push({ text: "¡Genial! Ganaste:", lang: 'es' });

    // Eliminar duplicados
    const uniqueQueue = queue.filter((v,i,a) => a.findIndex(t => (t.text === v.text && t.lang === v.lang)) === i);
    
    setTotalDownloads(uniqueQueue.length);
    setDownloadProgress(0);

    for (let i = 0; i < uniqueQueue.length; i++) {
      const item = uniqueQueue[i];
      const cacheKey = `${item.text}-${item.lang}`;
      
      // Verificar si ya existe en DB para saltar
      const exists = await getAudioFromDB(cacheKey);
      if (!exists) {
        try {
          const voice = item.lang === 'es' ? 'Kore' : 'Zephyr';
          const promptText = item.lang === 'es' ? `Di alegremente: ${item.text}` : `Say cheerfully: ${item.text}`;
          const audioData = await fetchAudioFromAPI(promptText, voice);
          const blob = createWavBlob(audioData, 24000);
          if (blob) await saveAudioToDB(cacheKey, blob);
          
          // THROTTLING: Pausa de 1.5s entre descargas para evitar bloqueo
          await new Promise(r => setTimeout(r, 1500)); 
        } catch (e) {
          console.warn("Failed to download:", item.text);
        }
      }
      setDownloadProgress(i + 1);
    }
    
    setIsDownloading(false);
    alert("¡Descarga completada! Ahora puedes jugar offline.");
  };

  // --- GAME LOGIC ---
  const initMemory = (players) => {
    setNumPlayers(players);
    setPlayerScores(new Array(players).fill(0));
    setCurrentPlayer(0);
    setWaitingToClear(false);
    const pool = [...VOCABULARIO_PAREJAS].sort(() => Math.random() - 0.5).slice(0, 15);
    const cards = pool.flatMap((item, idx) => [
      { id: `a-${idx}`, val: item.emoji, match: idx, type: 'emoji' },
      { id: `b-${idx}`, val: item.esp, match: idx, type: 'text' }
    ]).sort(() => Math.random() - 0.5);
    setMemoryCards(cards);
    setSelectedCards([]);
    setSolvedPairs([]);
    setView('memory_game');
  };

  const handleCardClick = (card) => {
    if (waitingToClear || selectedCards.length === 2 || solvedPairs.includes(card.match) || selectedCards.find(c => c.id === card.id)) return;
    if (card.type === 'text') playTTS(card.val, 'es', 'memory');

    const newSelection = [...selectedCards, card];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      if (newSelection[0].match === newSelection[1].match) {
        setSolvedPairs(prev => [...prev, newSelection[0].match]);
        const newScores = [...playerScores];
        newScores[currentPlayer] += 1;
        setPlayerScores(newScores);
        setStars(s => s + 5);
        setSelectedCards([]);
      } else {
        setWaitingToClear(true);
      }
    }
  };

  const clearMemoryTurn = () => {
    if (!waitingToClear) return;
    setSelectedCards([]);
    setWaitingToClear(false);
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
  };

  const handlePlayerNameChange = (idx, newName) => {
    const nextNames = [...playerNames];
    nextNames[idx] = newName;
    setPlayerNames(nextNames);
  };

  const handleLetterClick = (l) => {
    const item = PALABRAS_DELETREO[spellingIdx % PALABRAS_DELETREO.length];
    if (l === item.palabra[typed.length]) {
      const newTyped = typed + l;
      setTyped(newTyped);
      if (newTyped === item.palabra) {
        setStars(s => s + 10);
        playTTS(item.palabra, 'es', 'spelling');
        setSpellingIdx((spellingIdx + 1) % PALABRAS_DELETREO.length);
        setTyped('');
      }
    } else {
      setStars(s => Math.max(0, s - 2));
      setErrorFeedback(true);
      setTimeout(() => setErrorFeedback(false), 500);
    }
  };

  const initMatch = () => {
    const pool = [...VOCABULARIO_PAREJAS].sort(() => Math.random() - 0.5).slice(0, 5);
    setMatchOptions({
      left: pool.map(i => ({ text: i.eng, id: i.eng, match: i.esp })),
      right: pool.map(i => ({ text: i.esp, id: i.esp, match: i.esp, emoji: i.emoji }))
        .sort(() => Math.random() - 0.5)
    });
    setMatchSelected({ left: null, right: null });
    setView('match_game');
  };

  useEffect(() => {
    if (matchSelected.left && matchSelected.right) {
      if (matchSelected.left.match === matchSelected.right.id) {
        setStars(s => s + 10);
        setMatchOptions(prev => ({
          left: prev.left.filter(i => i.id !== matchSelected.left.id),
          right: prev.right.filter(i => i.id !== matchSelected.right.id)
        }));
        playTTS("¡Correcto!", "es", "match");
      } else {
        setStars(s => Math.max(0, s - 5));
        setErrorFeedback(true);
        setTimeout(() => setErrorFeedback(false), 500);
      }
      setMatchSelected({ left: null, right: null });
    }
  }, [matchSelected]);

  return (
    <div className={`min-h-screen p-4 font-sans select-none flex flex-col items-center transition-colors duration-300 ${errorFeedback ? 'bg-red-100' : 'bg-slate-50'}`}>
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <button onClick={() => { cleanupAudio(); setView('menu'); }} className="bg-white p-3 rounded-2xl shadow-sm text-indigo-500 active:scale-95 border border-indigo-50"><ArrowLeft/></button>
        <div className="flex gap-3">
          <button onClick={() => setView('prizes')} className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 rounded-full shadow-lg text-white font-black flex items-center gap-2 active:scale-95">
            <Gift className="w-5 h-5"/> TIENDA
          </button>
          <div className={`bg-yellow-400 px-6 py-2 rounded-full shadow-lg border-b-4 border-yellow-600 flex items-center gap-2 min-w-[100px] justify-center transition-transform ${errorFeedback ? 'scale-110' : ''}`}>
            <Star className="text-white fill-current w-6 h-6" /><span className="text-2xl font-black text-white">{stars}</span>
          </div>
        </div>
      </div>

      {view === 'menu' && (
        <div className="w-full max-w-md space-y-4 animate-in zoom-in">
          <h1 className="text-4xl font-black text-indigo-900 text-center mb-8 uppercase tracking-tighter">Mis Desafíos</h1>
          
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-6">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-500" /> Descargas
            </h3>
            {isDownloading ? (
              <div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-2">
                  <div className="bg-indigo-500 h-full transition-all duration-300" style={{width: `${(downloadProgress/totalDownloads)*100}%`}}></div>
                </div>
                <p className="text-xs font-black text-center text-indigo-500 uppercase">Descargando {downloadProgress} / {totalDownloads}</p>
              </div>
            ) : (
              <button onClick={downloadAllContent} className="w-full bg-slate-800 text-white p-4 rounded-xl font-black flex items-center justify-center gap-2 active:scale-95 hover:bg-slate-700 transition-all">
                <Download className="w-5 h-5" /> Descargar Todo (Offline)
              </button>
            )}
            <p className="text-[10px] text-slate-400 mt-2 text-center leading-tight">
              Descarga los audios para jugar sin internet y más rápido. Tardará unos minutos.
            </p>
          </div>

          <MenuButton icon={<LayoutGrid className="w-8 h-8"/>} label="Abecedario Mágico" color="bg-pink-100" onClick={() => setView('alphabet')} />
          <MenuButton icon={<SpellCheck className="w-8 h-8"/>} label="Escuela de Deletreo" color="bg-blue-100" onClick={() => setView('spelling')} />
          <MenuButton icon={<Brain className="w-8 h-8"/>} label="Memoria Pro" color="bg-purple-100" onClick={() => setView('memory_setup')} />
          <MenuButton icon={<Languages className="w-8 h-8"/>} label="Parejas Flash" color="bg-green-100" onClick={initMatch} />
          
          <div className="mt-8 pt-8 border-t border-slate-200 w-full flex justify-center">
            <button onClick={() => { if(window.confirm("¿Borrar progreso?")) { setStars(0); setAlphabetIdx(0); setSpellingIdx(0); } }} className="text-xs text-slate-400 flex items-center gap-1"><RotateCcw className="w-3 h-3"/> Resetear</button>
          </div>
        </div>
      )}

      {view === 'alphabet' && (
        <div className="w-full max-w-md flex flex-col gap-6 animate-in slide-in-from-right">
          {(() => {
            const item = VOCABULARIO_ABC[alphabetIdx % VOCABULARIO_ABC.length];
            const ready = heardEsp && heardEng;
            return (
              <>
                <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-white text-center relative">
                  <h2 className="text-[10rem] font-black text-indigo-600 leading-none mb-10">{item.letra}</h2>
                  <div className="grid gap-6">
                    <button onClick={() => playTTS(item.esp, 'es', 'abc-es', () => setHeardEsp(true))} className={`p-5 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all ${heardEsp ? 'bg-green-50 border-green-400' : 'bg-pink-50 border-pink-100 active:scale-95'}`}>
                      <span className="text-6xl mb-1">{item.emojiEsp}</span>
                      <div className="flex items-center gap-3"><span className="text-2xl font-black text-pink-600 uppercase">{item.esp}</span>
                        {loadingAudioId === `${item.esp}-es` ? <Loader2 className="w-5 h-5 animate-spin text-indigo-500" /> : <Volume2 className={heardEsp ? 'text-green-500' : 'text-pink-300'}/>}
                      </div>
                    </button>
                    <button onClick={() => playTTS(item.eng, 'en', 'abc-en', () => setHeardEng(true))} className={`p-5 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all ${heardEng ? 'bg-green-50 border-green-400' : 'bg-blue-50 border-blue-100 active:scale-95'}`}>
                      <span className="text-6xl mb-1">{item.emojiEng}</span>
                      <div className="flex items-center gap-3"><span className="text-2xl font-black text-blue-600 uppercase">{item.eng}</span>
                        {loadingAudioId === `${item.eng}-en` ? <Loader2 className="w-5 h-5 animate-spin text-indigo-500" /> : <Volume2 className={heardEng ? 'text-green-500' : 'text-blue-300'}/>}
                      </div>
                    </button>
                  </div>
                </div>
                <button disabled={!ready} onClick={() => { setStars(s => s+5); setAlphabetIdx(alphabetIdx+1); setHeardEsp(false); setHeardEng(false); cleanupAudio(); }} className={`py-6 rounded-[2.5rem] text-3xl font-black shadow-xl border-b-8 flex items-center justify-center gap-3 transition-all ${ready ? 'bg-indigo-600 border-indigo-800 text-white active:translate-y-1 active:border-b-4' : 'bg-slate-300 border-slate-400 text-slate-100 cursor-not-allowed'}`}>{!ready ? <Lock className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />} SIGUIENTE</button>
              </>
            );
          })()}
        </div>
      )}

      {/* ... (RESTO DE MÓDULOS IGUALES: Spelling, Memory, Match, Prizes) ... */}
      {view === 'spelling' && (
        <div className="w-full max-w-md flex flex-col gap-6 animate-in zoom-in">
          {(() => {
            const item = PALABRAS_DELETREO[spellingIdx % PALABRAS_DELETREO.length];
            const isLoading = loadingAudioId?.includes(item.palabra);
            return (
              <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-8 border-white text-center">
                <div className="text-9xl mb-4">{item.emoji}</div>
                <button onClick={() => playTTS(item.palabra, 'es', 'spelling')} disabled={isLoading} className="mx-auto mb-8 flex items-center gap-2 px-6 py-2 rounded-full font-black text-lg bg-indigo-100 text-indigo-600 active:scale-95">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />} Escuchar Palabra
                </button>
                <div className="flex justify-center flex-wrap gap-2 mb-10">{item.palabra.split('').map((l, i) => (<div key={i} className={`w-14 h-20 border-b-8 flex items-center justify-center text-5xl font-black ${typed.length > i ? 'text-indigo-600 border-indigo-500' : 'text-slate-200 border-slate-200'}`}>{typed[i] || ''}</div>))}</div>
                <div className="grid grid-cols-5 gap-2">{"ABCDEÁÉÍÓÚFGHIJKLMNOPQRSTUVZ".split('').map(l => (<button key={l} onClick={() => handleLetterClick(l)} className="p-4 rounded-xl font-black text-2xl active:scale-90 border-b-4 bg-slate-100 text-slate-700 border-slate-300">{l}</button>))}</div>
              </div>
            );
          })()}
        </div>
      )}

      {view === 'memory_setup' && (
        <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl text-center w-full max-w-md">
          <Users className="w-24 h-24 mx-auto text-indigo-500 mb-6" />
          <h2 className="text-3xl font-black text-slate-800 mb-8">¿Cuántos juegan?</h2>
          <div className="grid grid-cols-3 gap-4">{[1, 2, 3].map(n => (<button key={n} onClick={() => initMemory(n)} className="bg-indigo-500 text-white p-8 rounded-3xl font-black text-3xl active:scale-95">{n}</button>))}</div>
        </div>
      )}

      {view === 'memory_game' && (
        <div className="w-full max-w-5xl flex flex-col gap-6 px-2">
          <div className="flex justify-around bg-white p-5 rounded-[2.5rem] shadow-lg border-b-4 border-slate-200 relative overflow-hidden">
            {playerScores.slice(0, numPlayers).map((s, i) => (
              <button 
                key={i} 
                onClick={clearMemoryTurn}
                className={`text-center p-4 rounded-3xl transition-all min-w-[120px] relative border-4 flex flex-col items-center ${currentPlayer === i ? 'bg-indigo-100 border-indigo-400 scale-110 shadow-md ring-4 ring-indigo-50' : 'bg-slate-50 border-transparent opacity-40'}`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <input 
                    className="bg-transparent text-[11px] font-black text-indigo-700 uppercase text-center w-24 outline-none border-b border-transparent focus:border-indigo-400"
                    value={playerNames[i]}
                    onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Edit2 className="w-2 h-2 text-indigo-300"/>
                </div>
                <div className="text-4xl font-black text-slate-800">{s}</div>
                <UserCircle className={`w-8 h-8 mt-2 ${currentPlayer === i ? 'text-indigo-600 animate-pulse' : 'text-slate-300'}`}/>
                {waitingToClear && currentPlayer === i && (
                  <div className="absolute inset-0 bg-indigo-600/90 rounded-2xl flex flex-col items-center justify-center animate-in zoom-in text-white p-2">
                    <RotateCcw className="w-6 h-6 mb-1 animate-spin-slow"/>
                    <span className="text-[10px] font-black uppercase">¡Continuar!</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-2 p-3 bg-white rounded-[3rem] shadow-inner border-4 border-slate-50">
            {memoryCards.map((c) => {
              const isSel = selectedCards.find(s => s.id === c.id);
              const isSol = solvedPairs.includes(c.match);
              return (
                <button 
                  key={c.id} 
                  onClick={() => handleCardClick(c)} 
                  className={`aspect-square rounded-2xl flex items-center justify-center transition-all transform ${isSel || isSol ? 'bg-white border-2 border-indigo-500 rotate-0' : 'bg-indigo-600 text-transparent shadow-lg active:scale-90 rotate-180'}`}
                >
                  {(isSel || isSol) && <span className={`font-black uppercase text-center ${c.type === 'emoji' ? 'text-4xl' : 'text-[11px] px-1'}`}>{c.val}</span>}
                  {!(isSel || isSol) && <Star className="text-indigo-400 w-1/2 h-1/2 opacity-30" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {view === 'match_game' && (
        <div className={`w-full max-w-md space-y-6 animate-in fade-in ${errorFeedback ? 'animate-shake' : ''}`}>
          <div className="relative"><h2 className="text-3xl font-black text-center text-green-600 uppercase">Parejas Flash</h2><button onClick={initMatch} className="absolute right-0 top-1 text-slate-300 hover:text-green-500"><RotateCcw className="w-5 h-5"/></button></div>
          <div className="flex justify-between gap-4">
            <div className="flex-1 space-y-4">
              {matchOptions.left.map(item => {
                const isSelected = matchSelected.left?.id === item.id;
                const isLoading = loadingAudioId === `${item.text}-en`;
                return (
                  <button key={item.id} onClick={() => { setMatchSelected(prev => ({ ...prev, left: item })); playTTS(item.text, 'en', 'match'); }} className={`w-full min-h-[110px] p-4 rounded-[2rem] font-black border-4 transition-all text-xl shadow-sm flex items-center justify-center gap-2 ${isSelected ? 'bg-blue-500 text-white border-blue-700 scale-105 ring-4 ring-blue-200' : 'bg-white text-slate-700 border-slate-100'}`}>
                    {item.text}{isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Volume2 className="w-4 h-4 opacity-50"/>}
                  </button>
                );
              })}
            </div>
            <div className="flex-1 space-y-4">
              {matchOptions.right.map(item => {
                const isSelected = matchSelected.right?.id === item.id;
                return (
                  <button key={item.id} onClick={() => setMatchSelected(prev => ({ ...prev, right: item }))} className={`w-full min-h-[110px] p-4 rounded-[2rem] font-black border-4 transition-all text-xl shadow-sm flex flex-col items-center justify-center gap-1 ${isSelected ? 'bg-indigo-500 text-white border-indigo-700 scale-105 ring-4 ring-indigo-200' : 'bg-white text-slate-700 border-slate-100'}`}>
                    <span className="text-3xl">{item.emoji}</span><span className="text-sm uppercase tracking-wide">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {view === 'prizes' && (
        <div className="flex-1 w-full max-w-md flex flex-col gap-4 animate-in px-2">
          <h2 className="text-3xl font-black text-indigo-900 text-center mb-4 uppercase tracking-tighter drop-shadow-sm">Tienda de Premios</h2>
          {PREMIOS.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-[2.5rem] flex items-center justify-between border-4 border-slate-50 shadow-md">
              <div className="flex items-center gap-5">
                <div className="bg-indigo-50 p-4 rounded-3xl">{p.icon}</div>
                <div>
                   <p className="font-black text-xl text-slate-800 mb-1 leading-tight">{p.nombre}</p>
                   <p className="text-sm font-black text-indigo-400 uppercase tracking-wide">{p.costo} ESTRELLAS</p>
                </div>
              </div>
              {stars >= p.costo ? (
                <button onClick={() => { setStars(s => s - p.costo); playTTS(`¡Genial! Ganaste: ${p.nombre}`, 'es', 'prize'); }} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg active:translate-y-1 transition-all">RECLAMAR</button>
              ) : (
                <div className="text-center min-w-[100px]">
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2 border border-slate-200 shadow-inner">
                    <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (stars/p.costo)*100)}%` }} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Faltan {p.costo - stars} ⭐</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className="mt-12 opacity-30 text-[11px] font-black uppercase text-center w-full">Misión de Aprendizaje • 2026</footer>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shake {0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}} 
        .animate-shake {animation: shake 0.2s ease-in-out 0s 2;}
      `}</style>
    </div>
  );
};

const MenuButton = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className={`w-full ${color} p-7 rounded-[3rem] flex items-center gap-8 shadow-sm hover:shadow-xl transition-all active:scale-95 border-b-8 border-black/10 group`}>
    <div className="bg-white p-5 rounded-[2rem] shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-2xl font-black text-slate-800 text-left uppercase leading-none">{label}</span>
  </button>
);

export default App;