import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, Mic, MicOff, Volume2, VolumeX, CheckCircle, Clock, Info, Activity, Dumbbell, Flame, PlayCircle, Music, Maximize, Minimize } from 'lucide-react';

// --- DATOS LIMPIOS DEL PDF CON VIDEOS PROPIOS ---
const workoutPlan = [
  {
    id: 1, block: "Movilidad", name: "Dead bug", sets: 1, reps: "12", intensity: "Peso corporal", rest: 0,
    benefits: "Activa el core y mejora la coordinación sin tensión en la espalda baja.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152467/Deadbugs_h6edp9.mp4" 
  },
  {
    id: 2, block: "Movilidad", name: "Superman en cuadrupedia", sets: 1, reps: "12", intensity: "Peso corporal", rest: 0,
    benefits: "Fortalece la cadena posterior y estabiliza la columna.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152468/Superman_cuadrupedia_contralateral_vcjnlx.mp4"
  },
  {
    id: 3, block: "Movilidad", name: "Gato vaca", sets: 1, reps: "10", intensity: "Peso corporal", rest: 0,
    benefits: "Moviliza la columna vertebral y libera tensión en la espalda.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152478/Ejercicio_1__Gato-Vaca_para_Mejorar_la_Movilidad_de_la_Espalda_aanzu9.mp4"
  },
  {
    id: 4, block: "Movilidad", name: "Rotación torácica en cuadrupedia", sets: 1, reps: "10 por lado", intensity: "Peso corporal", rest: 0,
    benefits: "Mejora la movilidad de la zona media de la espalda.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152468/ROTACI%C3%93N_TOR%C3%81CICA_EN_CUADRUPEDIA_lic223.mp4"
  },
  {
    id: 5, block: "Movilidad", name: "Perro boca arriba a boca abajo", sets: 1, reps: "12", intensity: "Peso corporal", rest: 0,
    benefits: "Estira isquiotibiales, gemelos y abre el pecho.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152481/Yoga_flow_-_Perro_Boca_Abajo_-_Boca_Arriba_-_Cachorro_dcgbbn.mp4"
  },
  {
    id: 6, block: "Movilidad", name: "Movilidad cadera + Rotación en split", sets: 1, reps: "12 / 10 por lado", intensity: "Ritmo controlado", rest: 0,
    benefits: "Abre las caderas y prepara las articulaciones para el trabajo pesado.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152469/Movilidad_CADERA_Y_TRONCO_barcelona_hybrid_fast_training_cql0sn.mp4"
  },
  {
    id: 7, block: "Animal flow", name: "Caminata en cuadrupedia", sets: 1, reps: "30 segundos", intensity: "Peso corporal", rest: 0,
    benefits: "Trabajo de estabilización de hombros y core en movimiento.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152476/Caminata_en_Cuadrupedia_bs0acy.mp4"
  },
  {
    id: 8, block: "Animal flow", name: "Push up to kick out", sets: 3, reps: "12", intensity: "Peso corporal", rest: 90,
    benefits: "Aumenta la frecuencia cardíaca y trabaja pecho y agilidad.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152476/Side_Kick_Through_Push_Up_k8gy0b.mp4"
  },
  {
    id: 9, block: "Core", name: "Shoulder mobility", sets: 1, reps: "12", intensity: "RPE: 5", rest: 0,
    benefits: "Lubricación de la articulación del hombro.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152479/Increase_core_strength_shoulder_mobility_-_Plate_halos_qs2ghz.mp4"
  },
  {
    id: 10, block: "Core", name: "Crossbody chops", sets: 3, reps: "8 por lado", intensity: "RPE: 5", rest: 90,
    benefits: "Potencia rotacional del core, ideal para transferencia a deportes.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152469/1_2_Kneeling_Plate_Chop_Up_txnxo3.mp4"
  },
  {
    id: 11, block: "Balísticos y Plyos 1", name: "MB slam a MB vertical throw", sets: 3, reps: "6", intensity: "RPE: 6", rest: 120,
    benefits: "Desarrollo de potencia explosiva. Máxima fuerza intencionada.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152477/MB_Slam_to_Vertical_Throw_bqkpzt.mp4"
  },
  {
    id: 12, block: "Balísticos y Plyos 1", name: "CMJ (Salto con contramovimiento)", sets: 3, reps: "6", intensity: "Peso corporal", rest: 120,
    benefits: "Mejora la reactividad del sistema nervioso central y potencia de piernas.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152475/How_To_Counter_Movement_Jump_fgnaz0.mp4"
  },
  {
    id: 13, block: "Balísticos y Plyos 2", name: "SL KB snatch (Unilateral)", sets: 3, reps: "6 por lado", intensity: "RPE: 6", rest: 120,
    benefits: "Potencia unilateral y estabilidad de cadera y hombro.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152475/Single_Leg_RDL_To_Snatch_nw909m.mp4"
  },
  {
    id: 14, block: "Balísticos y Plyos 2", name: "Depth lateral bound", sets: 3, reps: "3 por lado", intensity: "Peso corporal", rest: 120,
    benefits: "Fuerza y potencia en el plano frontal. Máxima explosividad.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152467/Depth_drop_to_lateral_bound_single_leg_g14utp.mp4"
  },
  {
    id: 15, block: "Fuerza funcional", name: "SL RDL row to push press", sets: 4, reps: "6 por lado", intensity: "RPE: 8", rest: 150,
    benefits: "Ejercicio complejo que trabaja estabilidad, tirón y empuje. El rey de la rutina.",
    videoUrl: "https://res.cloudinary.com/dxkrhdljz/video/upload/v1775152477/Single_Leg_RDL_Row_Clean_to_balance_Press_nspoef.mp4"
  }
];

export default function App() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [musicUrl, setMusicUrl] = useState(null);
  const [musicName, setMusicName] = useState("");
  const [isTheaterMode, setIsTheaterMode] = useState(false); // Nuevo estado para Modo Teatro

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const currentExercise = workoutPlan[currentExerciseIndex];

  // Restablecer el modo teatro al cambiar de ejercicio para poder leer los beneficios
  useEffect(() => {
    setIsTheaterMode(false);
  }, [currentExerciseIndex]);

  // --- CONTROL DE VOZ (Speech Recognition) ---
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = 'es-ES';
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      
      // Comandos para avanzar
      if (transcript.includes('siguiente') || transcript.includes('listo') || transcript.includes('terminé') || transcript.includes('termine')) {
        handleNext();
      } 
      // Comandos para Modo Teatro
      else if (transcript.includes('ampliar')) {
        setIsTheaterMode(true);
      } 
      else if (transcript.includes('reducir')) {
        setIsTheaterMode(false);
      }
    };

    recognitionRef.current.onend = () => {
      if (voiceEnabled) {
        try { recognitionRef.current.start(); } catch (e) { }
      }
    };

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [voiceEnabled, currentExerciseIndex, currentSet, isResting]);

  useEffect(() => {
    if (voiceEnabled && recognitionRef.current) {
      try { recognitionRef.current.start(); } catch (e) { }
    } else if (!voiceEnabled && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [voiceEnabled]);

  // --- ENTRENADOR DE VOZ (Text to Speech) ---
  const speak = useCallback((text) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  useEffect(() => {
    if (currentExercise && !isResting && !isFinished) {
      const textToSpeak = `Comenzamos con. ${currentExercise.name}. ${currentExercise.reps}.`;
      speak(textToSpeak);
    }
  }, [currentExerciseIndex, isResting, isFinished, speak]);

  // --- LÓGICA DE TEMPORIZADOR ---
  useEffect(() => {
    if (isResting && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        if (timeLeft === 6) {
          speak("Prepárate para continuar, quedan 5 segundos.");
        }
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isResting && timeLeft === 0) {
      speak("El tiempo de recuperación ha concluido. ¡A darle!");
      setIsResting(false);
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
      } else {
        advanceExercise();
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isResting, timeLeft]);

  // --- RELOJ GLOBAL ---
  useEffect(() => {
    let globalTimer;
    if (!isFinished) {
      globalTimer = setInterval(() => {
        setTotalSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(globalTimer);
  }, [isFinished]);

  // --- NAVEGACIÓN ---
  const handleNext = () => {
    if (isResting) {
      setIsResting(false);
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
      } else {
        advanceExercise();
      }
      return;
    }

    if (currentSet < currentExercise.sets && currentExercise.rest > 0) {
      setIsResting(true);
      setTimeLeft(currentExercise.rest);
      speak(`Serie completada. Tienes ${currentExercise.rest} segundos de recuperación.`);
    } else if (currentSet < currentExercise.sets && currentExercise.rest === 0) {
      setCurrentSet(prev => prev + 1);
    } else {
      advanceExercise();
    }
  };

  const advanceExercise = () => {
    if (currentExerciseIndex < workoutPlan.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
    } else {
      setIsFinished(true);
      speak("¡Rutina completada! Excelente trabajo.");
    }
  };

  const jumpToExercise = (index) => {
    setCurrentExerciseIndex(index);
    setCurrentSet(1);
    setIsResting(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatGlobalTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMusicUrl(url);
      setMusicName(file.name);
    }
  };

  // --- RENDERIZADO ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 font-sans">
        <CheckCircle className="w-24 h-24 text-blue-900 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-blue-950">¡Entrenamiento Completado!</h1>
        <p className="text-slate-600 text-lg">Has superado la rutina Full Body de hoy.</p>
        <button 
          onClick={() => { setIsFinished(false); setCurrentExerciseIndex(0); setCurrentSet(1); }}
          className="mt-8 px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition shadow-lg"
        >
          Repetir Rutina
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col lg:flex-row overflow-hidden">
      
      {/* PANEL LATERAL (IZQUIERDA) - LISTA DE RUTINA */}
      <aside className="w-full lg:w-96 bg-white border-r border-slate-200 flex flex-col h-[40vh] lg:h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
        <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
            Tu Rutina
          </h2>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-5">
            <div 
              className="bg-blue-900 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${(currentExerciseIndex / workoutPlan.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {workoutPlan.map((ex, index) => {
            const isActive = index === currentExerciseIndex;
            const isPast = index < currentExerciseIndex;
            const showBlockHeader = index === 0 || workoutPlan[index - 1].block !== ex.block;

            return (
              <React.Fragment key={ex.id}>
                {showBlockHeader && (
                  <div className="mt-6 mb-3 first:mt-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                      {ex.block}
                    </h3>
                  </div>
                )}
                
                <button
                  onClick={() => jumpToExercise(index)}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-all flex items-center gap-4
                    ${isActive ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-50 bg-transparent'}
                    ${isPast ? 'opacity-60' : 'opacity-100'}
                  `}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold transition-colors
                    ${isActive ? 'bg-white text-blue-900' : 
                      isPast ? 'bg-slate-200 text-slate-500' : 'bg-slate-100 text-slate-500'}
                  `}>
                    {isPast ? <CheckCircle size={16} /> : index + 1}
                  </div>
                  
                  <div className="flex-1 overflow-hidden">
                    <h4 className={`truncate font-medium ${isActive ? 'text-white' : isPast ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-700'}`}>
                      {ex.name}
                    </h4>
                    <p className={`text-xs ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                      {ex.sets}x{ex.reps}
                    </p>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* REPRODUCTOR DE MÚSICA EN EL PANEL LATERAL */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 z-20">
          <h3 className="text-sm font-bold text-blue-950 mb-3 flex items-center gap-2">
            <Music size={16} className="text-blue-900" /> Tu Música Personalizada
          </h3>
          {!musicUrl ? (
            <label className="cursor-pointer w-full bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-900 text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-sm">
              <input type="file" accept="audio/*" className="hidden" onChange={handleMusicUpload} />
              Cargar archivo de audio (MP3)
            </label>
          ) : (
            <div className="flex flex-col gap-2 animate-in fade-in">
              <p className="text-xs font-medium text-slate-600 truncate bg-slate-200/50 px-2 py-1 rounded-md" title={musicName}>
                {musicName}
              </p>
              <audio src={musicUrl} controls loop className="w-full h-10 rounded-lg" autoPlay />
              <button onClick={() => { setMusicUrl(null); URL.revokeObjectURL(musicUrl); }} className="text-xs text-slate-500 hover:text-red-600 text-center mt-1 font-medium transition-colors">
                Quitar pista
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* PANEL PRINCIPAL (DERECHA) */}
      <main className={`flex-1 flex flex-col h-screen overflow-y-auto relative transition-all duration-500 ${isTheaterMode ? 'p-2 lg:p-4 bg-slate-950' : 'p-4 lg:p-10'}`}>
        
        {/* Top Bar / Controles (Se oculta en modo teatro) */}
        <div className={`justify-between items-center mb-6 lg:mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-sm ${isTheaterMode ? 'hidden' : 'flex'}`}>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-sm font-bold tracking-wide uppercase border border-blue-100">
              {currentExercise.block}
            </span>
            <span className="text-slate-500 font-medium text-sm hidden md:block">
              Ejercicio {currentExerciseIndex + 1} de {workoutPlan.length}
            </span>
          </div>
          
          <div className="flex gap-2 items-center">
            {/* Reloj Global Integrado */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-medium border border-slate-200 mr-2">
              <Clock size={18} className="text-slate-400" />
              <span className="tabular-nums tracking-wide">{formatGlobalTime(totalSeconds)}</span>
            </div>

            <button 
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className={`p-3 rounded-xl transition-all border hidden sm:flex items-center gap-2 ${!isVideoMuted ? 'bg-indigo-50 text-indigo-900 border-indigo-200' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
              title="Sonido de Videos"
            >
              {!isVideoMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span className="hidden lg:inline text-sm font-semibold">
                {!isVideoMuted ? 'Videos con Sonido' : 'Videos Silenciados'}
              </span>
            </button>

            <button 
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-3 rounded-xl transition-all border flex items-center gap-2 ${ttsEnabled ? 'bg-blue-50 text-blue-900 border-blue-100' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
              title="Voz del entrenador"
            >
              {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span className="hidden lg:inline text-sm font-semibold">Voz Guía</span>
            </button>
            <button 
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all border ${voiceEnabled ? 'bg-blue-900 text-white border-blue-900 shadow-md animate-pulse' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
              title="Comandos de voz"
            >
              {voiceEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              <span className="hidden md:inline text-sm font-semibold">
                {voiceEnabled ? 'Escuchando...' : 'Control por Voz'}
              </span>
            </button>
          </div>
        </div>

        {/* Contenido Central */}
        <div className={`flex flex-col mx-auto w-full relative transition-all duration-500 ${isTheaterMode ? 'max-w-full flex-1' : 'max-w-4xl flex-1'}`}>
          
          {/* MODAL DE DESCANSO FLOTANTE */}
          {isResting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-blue-100 shadow-2xl animate-in zoom-in duration-300">
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-xl border border-slate-100">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-100">
                  <Clock className="w-12 h-12 text-blue-900" />
                </div>
                <h2 className="text-2xl text-slate-500 font-medium mb-2">Descanso Activo</h2>
                <div className="text-7xl md:text-8xl font-black text-blue-950 tabular-nums tracking-tighter mb-6 drop-shadow-sm">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-lg text-slate-600 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100 mb-6 font-medium">
                  Prepárate para la serie <strong className="text-blue-900 text-xl">{currentSet + 1}</strong>
                </p>
                <button 
                  onClick={handleNext}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <SkipForward size={20} /> Saltar Descanso
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA DE EJERCICIO (Siempre visible al fondo) */}
          <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col h-full transition-all ${isResting ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100'}`}>
            
            <h1 className={`font-extrabold text-blue-950 mb-6 leading-tight ${isTheaterMode ? 'hidden' : 'text-3xl md:text-5xl'}`}>
              {currentExercise.name}
            </h1>
            
            {/* Reproductor de Video Nativo con MODO TEATRO */}
            <div className={`w-full bg-slate-950 overflow-hidden relative border border-slate-200 transition-all duration-500 ${isTheaterMode ? 'flex-1 rounded-2xl mb-4 border-slate-800' : 'aspect-video rounded-3xl shadow-xl mb-8'}`}>
              
              {/* Botón de Modo Teatro (Pantalla Completa) */}
              <button 
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/60 hover:bg-slate-800/80 text-white rounded-xl backdrop-blur-md transition-all shadow-lg border border-white/10"
                title={isTheaterMode ? "Reducir video" : "Ampliar video"}
              >
                {isTheaterMode ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>

              {/* Insignias flotantes sobre el video (Solo visibles en modo teatro para no perder contexto) */}
              {isTheaterMode && (
                <div className="absolute top-4 left-4 z-20 flex gap-2 pointer-events-none animate-in fade-in">
                  <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <h2 className="text-white font-bold text-lg">{currentExercise.name}</h2>
                  </div>
                  <div className="bg-blue-600/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-white font-bold text-lg">Serie {currentSet} / {currentExercise.sets}</span>
                  </div>
                </div>
              )}

              {currentExercise.videoUrl ? (
                <video 
                  key={currentExercise.videoUrl} 
                  className="absolute top-0 left-0 w-full h-full object-contain" 
                  src={currentExercise.videoUrl}
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline 
                  controls /* Controles agregados para permitir volumen / sonido */
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                  <PlayCircle size={48} className="mb-4 opacity-50" />
                  <p>Video no disponible</p>
                </div>
              )}
            </div>

            {/* Tarjetas de Datos (Se ocultan en modo teatro) */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ${isTheaterMode ? 'hidden' : ''}`}>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-slate-500 text-sm mb-2 flex items-center gap-2 font-medium">
                    <Activity size={16} className="text-blue-900"/> Series
                  </span>
                  <span className="text-3xl font-black text-blue-950">
                    {currentSet} <span className="text-lg font-medium text-slate-400">/ {currentExercise.sets}</span>
                  </span>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-slate-500 text-sm mb-2 flex items-center gap-2 font-medium">
                    <Dumbbell size={16} className="text-blue-900"/> Reps
                  </span>
                  <span className="text-3xl font-black text-blue-950">{currentExercise.reps}</span>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow col-span-2">
                  <span className="text-slate-500 text-sm mb-2 flex items-center gap-2 font-medium">
                    <Flame size={16} className="text-blue-900"/> Intensidad
                  </span>
                  <span className="text-2xl font-bold text-slate-700">{currentExercise.intensity}</span>
                </div>
              </div>

              {/* Beneficios (Se ocultan en modo teatro) */}
              <div className={`bg-white border border-slate-200 p-6 rounded-2xl flex gap-4 items-start shadow-sm mb-4 ${isTheaterMode ? 'hidden' : ''}`}>
                <div className="bg-blue-50 p-3 rounded-xl shrink-0">
                  <Info className="text-blue-900" size={24} />
                </div>
                <div>
                  <h4 className="text-blue-950 font-bold mb-1">Enfoque / Beneficio</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">{currentExercise.benefits}</p>
                </div>
              </div>
            </div>
          </div>

        {/* Botón de Acción Principal (Siempre visible, incluso en modo teatro) */}
        <div className={`mt-auto sticky bottom-0 bg-gradient-to-t ${isTheaterMode ? 'from-slate-950 via-slate-950' : 'from-slate-50 via-slate-50'} to-transparent pb-4 lg:pb-0 z-20 ${isResting ? 'opacity-0 pointer-events-none' : 'transition-colors duration-500'}`}>
          <button 
            onClick={handleNext}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-xl py-5 rounded-2xl shadow-[0_8px_30px_rgb(30,58,138,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <CheckCircle size={24} /> {currentSet === currentExercise.sets ? "Completar Ejercicio" : "Serie Terminada"}
          </button>
        </div>
      </main>

      {/* Estilos para scrollbar estilizado */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}