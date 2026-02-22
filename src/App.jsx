import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Star, IceCream, Bike, 
  Loader2, Lock, ArrowLeft, Volume2, 
  SpellCheck, Brain, LayoutGrid, Languages, Gift,
  Film, Pizza, Utensils, RotateCcw,
  UserCircle, Edit2, BookOpen, Palette, Popcorn,
  TabletSmartphone, AlertCircle, Users,
  Gamepad2, Calculator, Eye, Zap, Type
} from 'lucide-react';

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

const App = () => {
  // --- STATE ---
  const [stars, setStars] = useState(() => { try { return parseInt(localStorage.getItem('aventura_stars') || 0, 10); } catch { return 0; } });
  const [alphabetIdx, setAlphabetIdx] = useState(() => { try { return parseInt(localStorage.getItem('aventura_alphabetIdx') || 0, 10); } catch { return 0; } });
  const [spellingIdx, setSpellingIdx] = useState(() => { try { return parseInt(localStorage.getItem('aventura_spellingIdx') || 0, 10); } catch { return 0; } });

  useEffect(() => { localStorage.setItem('aventura_stars', stars); }, [stars]);
  useEffect(() => { localStorage.setItem('aventura_alphabetIdx', alphabetIdx); }, [alphabetIdx]);
  useEffect(() => { localStorage.setItem('aventura_spellingIdx', spellingIdx); }, [spellingIdx]);

  const [view, setView] = useState('menu'); 
  const [errorFeedback, setErrorFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Debug State para Tablet
  const [ttsSupported, setTtsSupported] = useState(true);

  // Estados de juegos
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

  // --- ESTADOS MINI JUEGOS EDUCATIVOS ---
  const [mathGame, setMathGame] = useState({ num1: 1, num2: 1, operator: '+', options: [], answer: 2 });
  const [countGame, setCountGame] = useState({ emoji: '🍎', count: 3, options: [] });

  // --- ESTADOS JUEGO LÚDICO (REACCIÓN ESPACIAL) ---
  const [reactionPos, setReactionPos] = useState(-1);
  const [dangerPos, setDangerPos] = useState(-1); 
  const [reactionHits, setReactionHits] = useState(0);
  const hitsRef = useRef(0); 

  // --- MOTOR DE SONIDO (BEEPS DE CERO LATENCIA) ---
  const audioCtxRef = useRef(null);
  const playBeep = (type) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'error') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch(e) { console.error("Audio API error", e); }
  };

  // --- SAFE TTS (A PRUEBA DE FALLOS) ---
  useEffect(() => {
    // Verificar soporte al cargar
    if (!('speechSynthesis' in window)) {
      setTtsSupported(false);
    } else {
      // Truco para cargar voces en Chrome/Android
      window.speechSynthesis.getVoices();
    }
  }, []);

  const safeSpeak = (text, lang = 'es') => {
    if (!ttsSupported) return;

    try { window.speechSynthesis.cancel(); } catch (e) { console.error(e); }

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsPlaying(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speak failed", e);
      setIsPlaying(false);
    }
  };

  const handleBack = () => {
    // PRIORIDAD 1: Cambiar vista (Manejo de Pila de Navegación)
    if (['alphabet_es', 'alphabet_en', 'spelling'].includes(view)) {
      setView('menu_letras');
    } else if (['minigame_math', 'minigame_count'].includes(view)) {
      setView('menu_math');
    } else if (view === 'minigame_reaction') {
      setView('minigames_menu');
    } else {
      setView('menu');
    }
    
    // PRIORIDAD 2: Limpiar audio (en segundo plano, sin bloquear)
    setTimeout(() => {
      try { window.speechSynthesis.cancel(); } catch (e) {}
      setIsPlaying(false);
    }, 0);
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
    if (card.type === 'text') safeSpeak(card.val, 'es');

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
        safeSpeak("¡Muy bien! " + item.palabra, 'es');
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

  // --- LOGICA JUEGO REACCIÓN LÚDICA (ESCALONADO POR ACIERTOS Y ESPACIO) ---
  const initReactionGame = () => {
    setReactionHits(0);
    hitsRef.current = 0;
    setReactionPos(4); 
    setDangerPos(-1);
    setView('minigame_reaction');
  };

  useEffect(() => {
    let timeoutId;
    let isActive = true; 
    
    if (view === 'minigame_reaction') {
      const tick = () => {
        if (!isActive) return;

        const level = Math.floor(hitsRef.current / 20); // Nivel lógico (0 = Nivel 1)
        
        // 1. Dificultad de Velocidad: Aumenta solo hasta Nivel 3 (index 2)
        const speedLevel = Math.min(level, 2); 
        const currentDelay = 750 - (speedLevel * 150); // Nivel 1: 750ms, Nivel 2: 600ms, Nivel 3+: 450ms

        // 2. Dificultad Espacial: A partir del Nivel 4 (index 3), la cuadrícula crece
        const gridLevel = Math.max(0, level - 2); 
        const gridSize = Math.min(5, 3 + gridLevel); // Topa en 5x5 (25 cuadros) para no colapsar la pantalla
        const totalSquares = gridSize * gridSize;

        // 3. Aparición (20% probabilidad cangrejo rojo)
        const isDanger = Math.random() < 0.20; 
        const randomPos = Math.floor(Math.random() * totalSquares);

        if (isDanger) {
          setReactionPos(-1);
          setDangerPos(randomPos);
        } else {
          setDangerPos(-1);
          setReactionPos(randomPos);
        }

        timeoutId = setTimeout(tick, currentDelay);
      };

      timeoutId = setTimeout(tick, 750);
    }
    
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [view]);

  const handleReactionClick = (idx) => {
    if (idx === reactionPos) {
      playBeep('success');
      setStars(s => s + 1);
      setReactionHits(h => {
        const newHits = h + 1;
        hitsRef.current = newHits; 
        return newHits;
      });
      setReactionPos(-1); 
    } else if (idx === dangerPos) {
      playBeep('error');
      setStars(s => Math.max(0, s - 2)); 
      setDangerPos(-1); 
      setErrorFeedback(true);
      setTimeout(() => setErrorFeedback(false), 500);
    }
  };

  // --- LOGICA MINI JUEGOS MATEMÁTICOS ---
  const initMathGame = () => {
    const isAddition = Math.random() > 0.5;
    let n1, n2, ans;
    if (isAddition) {
      n1 = Math.floor(Math.random() * 10) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
      ans = n1 + n2;
    } else {
      n1 = Math.floor(Math.random() * 10) + 5; // 5 a 14
      n2 = Math.floor(Math.random() * (n1 - 1)) + 1; // asegura resultado positivo
      ans = n1 - n2;
    }
    
    const opts = new Set([ans]);
    while(opts.size < 4) {
      opts.add(Math.max(1, ans + Math.floor(Math.random() * 7) - 3));
    }
    
    setMathGame({
      num1: n1, num2: n2, operator: isAddition ? '+' : '-', 
      answer: ans, options: Array.from(opts).sort(() => Math.random() - 0.5)
    });
    setView('minigame_math');
  };

  const handleMathClick = (opt) => {
    if (opt === mathGame.answer) {
      setStars(s => s + 2);
      safeSpeak("¡Correcto! Qué inteligente", 'es');
      setTimeout(initMathGame, 1000);
    } else {
      safeSpeak("Casi, intenta otra vez", 'es');
      setErrorFeedback(true);
      setTimeout(() => setErrorFeedback(false), 500);
    }
  };

  const initCountGame = () => {
    const emojis = ['🍎', '🐶', '🚗', '⭐', '🎈', '🍕', '🐱', '🦖', '🍦'];
    const emj = emojis[Math.floor(Math.random() * emojis.length)];
    const cnt = Math.floor(Math.random() * 7) + 3; // 3 a 9
    
    const opts = new Set([cnt]);
    while(opts.size < 4) {
      opts.add(Math.max(1, cnt + Math.floor(Math.random() * 5) - 2));
    }

    setCountGame({
      emoji: emj, count: cnt, options: Array.from(opts).sort(() => Math.random() - 0.5)
    });
    setView('minigame_count');
  };

  const handleCountClick = (opt) => {
    if (opt === countGame.count) {
      setStars(s => s + 2);
      safeSpeak("¡Excelente vista!", 'es');
      setTimeout(initCountGame, 1000);
    } else {
      safeSpeak("Cuenta con cuidado", 'es');
      setErrorFeedback(true);
      setTimeout(() => setErrorFeedback(false), 500);
    }
  };

  useEffect(() => {
    if (matchSelected.left && matchSelected.right) {
      if (matchSelected.left.match === matchSelected.right.id) {
        setStars(s => s + 10);
        setMatchOptions(prev => ({
          left: prev.left.filter(i => i.id !== matchSelected.left.id),
          right: prev.right.filter(i => i.id !== matchSelected.right.id)
        }));
        safeSpeak("¡Correcto!", "es");
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
        <button onClick={handleBack} className="bg-white p-3 rounded-2xl shadow-sm text-indigo-500 active:scale-95 border border-indigo-50 cursor-pointer z-50">
          <ArrowLeft/>
        </button>
        
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
          
          <div className={`p-4 rounded-xl flex items-center gap-3 border mb-6 ${ttsSupported ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
            {ttsSupported ? <TabletSmartphone className="w-6 h-6 text-blue-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
            <p className={`text-xs font-bold leading-tight ${ttsSupported ? 'text-blue-600' : 'text-red-600'}`}>
              {ttsSupported 
                ? "Modo Voz Nativa Activo (Tablet/Celular)" 
                : "Tu dispositivo no soporta Voz. Intenta actualizar Chrome."}
            </p>
          </div>

          <MenuButton icon={<Type className="w-8 h-8"/>} label="Letras" color="bg-pink-100" onClick={() => setView('menu_letras')} />
          <MenuButton icon={<Calculator className="w-8 h-8"/>} label="Matemáticas" color="bg-blue-100" onClick={() => setView('menu_math')} />
          <MenuButton icon={<Brain className="w-8 h-8"/>} label="Memoria Pro" color="bg-purple-100" onClick={() => setView('memory_setup')} />
          <MenuButton icon={<Languages className="w-8 h-8"/>} label="Parejas Flash" color="bg-green-100" onClick={initMatch} />
          <MenuButton icon={<Gamepad2 className="w-8 h-8"/>} label="Mini Juegos" color="bg-orange-100" onClick={() => setView('minigames_menu')} />
          
          <div className="mt-8 pt-8 border-t border-slate-200 w-full flex justify-center">
            <button onClick={() => { if(window.confirm("¿Borrar progreso?")) { setStars(0); setAlphabetIdx(0); setSpellingIdx(0); } }} className="text-xs text-slate-400 flex items-center gap-1"><RotateCcw className="w-3 h-3"/> Resetear</button>
          </div>
        </div>
      )}

      {/* --- SUB-MENÚS --- */}
      {view === 'menu_letras' && (
        <div className="w-full max-w-md space-y-4 animate-in zoom-in">
          <div className="relative mb-6">
            <h2 className="text-3xl font-black text-center text-pink-600 uppercase">Letras</h2>
          </div>
          {/* SEPARACIÓN DEL ABECEDARIO POR IDIOMAS */}
          <MenuButton icon={<LayoutGrid className="w-8 h-8"/>} label="Abecedario (Español)" color="bg-pink-100" onClick={() => { setView('alphabet_es'); setHeardEsp(false); }} />
          <MenuButton icon={<Languages className="w-8 h-8"/>} label="Abecedario (Inglés)" color="bg-indigo-100" onClick={() => { setView('alphabet_en'); setHeardEng(false); }} />
          <MenuButton icon={<SpellCheck className="w-8 h-8"/>} label="Escuela de Deletreo" color="bg-blue-100" onClick={() => setView('spelling')} />
        </div>
      )}

      {view === 'menu_math' && (
        <div className="w-full max-w-md space-y-4 animate-in zoom-in">
          <div className="relative mb-6">
            <h2 className="text-3xl font-black text-center text-blue-600 uppercase">Matemáticas</h2>
          </div>
          <MenuButton icon={<Calculator className="w-8 h-8"/>} label="Mate Mágica" color="bg-blue-100" onClick={initMathGame} />
          <MenuButton icon={<Eye className="w-8 h-8"/>} label="Ojo de Águila" color="bg-emerald-100" onClick={initCountGame} />
        </div>
      )}

      {/* --- ABECEDARIO PARAMETRIZADO (DRY) --- */}
      {(view === 'alphabet_es' || view === 'alphabet_en') && (
        <div className="w-full max-w-md flex flex-col gap-6 animate-in slide-in-from-right">
          {(() => {
            const isEs = view === 'alphabet_es';
            const item = VOCABULARIO_ABC[alphabetIdx % VOCABULARIO_ABC.length];
            const ready = isEs ? heardEsp : heardEng;
            
            // Extracción de datos según el idioma activo
            const word = isEs ? item.esp : item.eng;
            const emoji = isEs ? item.emojiEsp : item.emojiEng;
            const langCode = isEs ? 'es' : 'en';

            return (
              <>
                <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-white text-center relative">
                  
                  <h2 
                    onClick={() => {
                      if (!ttsSupported) return;
                      try { window.speechSynthesis.cancel(); } catch (e) {}
                      setIsPlaying(true);
                      const u = new SpeechSynthesisUtterance(item.letra);
                      u.lang = isEs ? 'es-ES' : 'en-US'; // Pronuncia la letra en el idioma actual
                      u.onend = () => setIsPlaying(false);
                      u.onerror = () => setIsPlaying(false);
                      window.speechSynthesis.speak(u);
                    }}
                    className="flex justify-center items-baseline gap-4 mb-10 cursor-pointer active:scale-90 transition-transform"
                  >
                    <span className="text-[10rem] font-black text-indigo-600 leading-none">{item.letra}</span>
                    <span className="text-[8rem] font-black text-indigo-300 leading-none">{item.letra.toLowerCase()}</span>
                  </h2>

                  <div className="grid gap-6">
                    <button 
                      onClick={() => { 
                        safeSpeak(word, langCode); 
                        if (isEs) setHeardEsp(true); else setHeardEng(true); 
                      }} 
                      className={`p-5 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all ${ready ? 'bg-green-50 border-green-400' : 'bg-indigo-50 border-indigo-100 active:scale-95'}`}
                    >
                      <span className="text-6xl mb-1">{emoji}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-indigo-600 uppercase">{word}</span>
                        {isPlaying ? <Volume2 className="animate-pulse text-indigo-500" /> : <Volume2 className={ready ? 'text-green-500' : 'text-indigo-300'}/>}
                      </div>
                    </button>
                  </div>

                </div>
                <button 
                  disabled={!ready} 
                  onClick={() => { 
                    setStars(s => s+5); 
                    setAlphabetIdx(alphabetIdx+1); 
                    setHeardEsp(false); 
                    setHeardEng(false); 
                    try { window.speechSynthesis.cancel(); } catch(e){} 
                  }} 
                  className={`py-6 rounded-[2.5rem] text-3xl font-black shadow-xl border-b-8 flex items-center justify-center gap-3 transition-all ${ready ? 'bg-indigo-600 border-indigo-800 text-white active:translate-y-1 active:border-b-4' : 'bg-slate-300 border-slate-400 text-slate-100 cursor-not-allowed'}`}
                >
                  {!ready ? <Lock className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />} SIGUIENTE
                </button>
              </>
            );
          })()}
        </div>
      )}

      {view === 'spelling' && (
        <div className="w-full max-w-md flex flex-col gap-6 animate-in zoom-in">
          {(() => {
            const item = PALABRAS_DELETREO[spellingIdx % PALABRAS_DELETREO.length];
            return (
              <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-8 border-white text-center">
                <div className="text-9xl mb-4">{item.emoji}</div>
                <button onClick={() => safeSpeak(item.palabra, 'es')} className="mx-auto mb-8 flex items-center gap-2 px-6 py-2 rounded-full font-black text-lg bg-indigo-100 text-indigo-600 active:scale-95">
                  <Volume2 className="w-5 h-5" /> Escuchar Palabra
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
              <div 
                key={i} 
                onClick={clearMemoryTurn}
                className={`text-center p-4 rounded-3xl transition-all min-w-[120px] relative border-4 flex flex-col items-center cursor-pointer ${currentPlayer === i ? 'bg-indigo-100 border-indigo-400 scale-110 shadow-md ring-4 ring-indigo-50' : 'bg-slate-50 border-transparent opacity-40'}`}
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
              </div>
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
                return (
                  <button key={item.id} onClick={() => { setMatchSelected(prev => ({ ...prev, left: item })); safeSpeak(item.text, 'en'); }} className={`w-full min-h-[110px] p-4 rounded-[2rem] font-black border-4 transition-all text-xl shadow-sm flex items-center justify-center gap-2 ${isSelected ? 'bg-blue-500 text-white border-blue-700 scale-105 ring-4 ring-blue-200' : 'bg-white text-slate-700 border-slate-100'}`}>
                    {item.text}<Volume2 className="w-4 h-4 opacity-50"/>
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
                <button onClick={() => { setStars(s => s - p.costo); safeSpeak(`¡Genial! Ganaste: ${p.nombre}`, 'es'); }} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg active:translate-y-1 transition-all">RECLAMAR</button>
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

      {/* --- VISTAS DE MINI JUEGOS LÚDICOS --- */}
      {view === 'minigames_menu' && (
        <div className="w-full max-w-md space-y-4 animate-in zoom-in">
          <div className="relative">
            <h2 className="text-3xl font-black text-center text-orange-600 uppercase mb-6">Mini Juegos</h2>
          </div>
          <p className="text-center text-sm font-bold text-slate-500 mb-4 bg-orange-50 p-3 rounded-xl border border-orange-100">
            Pon a prueba tus reflejos y diviértete.
          </p>
          <MenuButton icon={<Zap className="w-8 h-8"/>} label="Atrapa la Rana" color="bg-orange-100" onClick={initReactionGame} />
        </div>
      )}

      {/* VISTA DE REACCIÓN MODIFICADA (USANDO ONPOINTERDOWN PARA CERO LATENCIA) */}
      {view === 'minigame_reaction' && (
        <div className={`w-full max-w-md flex flex-col gap-6 animate-in zoom-in ${errorFeedback ? 'animate-shake' : ''}`}>
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border-8 border-white text-center">
            <h2 className="text-2xl font-black text-orange-500 uppercase mb-2">¡Atrápala!</h2>
            
            <div className="flex justify-between items-center mb-6 px-4">
              <p className="text-slate-400 font-bold">Ranas: <span className="text-orange-500">{reactionHits}</span></p>
              <div className="bg-orange-100 px-3 py-1 rounded-full text-xs font-black text-orange-600 uppercase">
                Nivel {Math.floor(reactionHits / 20) + 1}
              </div>
            </div>
            
            {(() => {
              const currentLevel = Math.floor(reactionHits / 20);
              const gridLevel = Math.max(0, currentLevel - 2);
              const gridSize = Math.min(5, 3 + gridLevel); 
              const totalSquares = Math.pow(gridSize, 2);
              const emojiSize = gridSize === 3 ? 'text-5xl' : gridSize === 4 ? 'text-4xl' : 'text-3xl';

              return (
                <div 
                  className="grid gap-2 bg-orange-50 p-4 rounded-3xl transition-all duration-300 touch-none"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                >
                  {Array.from({length: totalSquares}).map((_, i) => {
                    const isFrog = reactionPos === i;
                    const isDanger = dangerPos === i;
                    
                    return (
                      <button
                        key={i}
                        // INGENIERÍA: onPointerDown elimina el retraso de 300ms de los navegadores móviles
                        onPointerDown={(e) => {
                          e.preventDefault(); 
                          handleReactionClick(i);
                        }}
                        className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-75 ${emojiSize} ${
                          isFrog 
                          ? 'bg-green-400 scale-105 shadow-md active:scale-90' 
                          : isDanger
                            ? 'bg-red-500 scale-105 shadow-lg active:scale-90 animate-pulse border-4 border-red-700'
                            : 'bg-slate-200 opacity-50'
                        }`}
                      >
                        {isFrog ? '🐸' : isDanger ? '🦀' : ''}
                      </button>
                    );
                  })}
                </div>
              );
            })()}

            <p className="text-xs text-slate-400 font-bold mt-6 uppercase">Toca la rana. ¡No toques el cangrejo!</p>
          </div>
        </div>
      )}

      {/* --- VISTAS DE MATEMÁTICAS --- */}
      {view === 'minigame_math' && (
        <div className={`w-full max-w-md flex flex-col gap-6 animate-in zoom-in ${errorFeedback ? 'animate-shake' : ''}`}>
          <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-8 border-white text-center">
            <h2 className="text-2xl font-black text-blue-500 uppercase mb-6">¿Cuánto es?</h2>
            <div className="text-7xl font-black text-slate-800 mb-10 flex justify-center items-center gap-4">
              <span>{mathGame.num1}</span>
              <span className="text-blue-500">{mathGame.operator}</span>
              <span>{mathGame.num2}</span>
              <span className="text-slate-300">=</span>
              <span className="text-orange-500">?</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mathGame.options.map((opt, i) => (
                <button key={i} onClick={() => handleMathClick(opt)} className="p-6 bg-slate-100 hover:bg-blue-50 active:scale-95 border-b-4 border-slate-300 hover:border-blue-300 rounded-3xl text-4xl font-black text-slate-700 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'minigame_count' && (
        <div className={`w-full max-w-md flex flex-col gap-6 animate-in zoom-in ${errorFeedback ? 'animate-shake' : ''}`}>
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border-8 border-white text-center">
            <h2 className="text-2xl font-black text-emerald-500 uppercase mb-4">¿Cuántos hay?</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[120px] content-center bg-emerald-50 p-6 rounded-3xl">
              {Array.from({length: countGame.count}).map((_, i) => (
                <span key={i} className="text-5xl animate-in fade-in" style={{ animationDelay: `${i * 0.1}s` }}>{countGame.emoji}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {countGame.options.map((opt, i) => (
                <button key={i} onClick={() => handleCountClick(opt)} className="p-6 bg-slate-100 hover:bg-emerald-50 active:scale-95 border-b-4 border-slate-300 hover:border-emerald-300 rounded-3xl text-4xl font-black text-slate-700 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
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