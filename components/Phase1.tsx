import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig, random } from 'remotion';
import { Bot, Brain } from 'lucide-react';
import { SceneContainer, PopBox, COLORS, BinaryStream } from './Shared';

// --- Cyberpunk Helper Components ---

const GridBackground = () => {
  const frame = useCurrentFrame();
  const moveY = interpolate(frame, [0, 100], [0, 50]); // Move grid down

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden opacity-40"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{
          transform: `rotateX(60deg) translateY(${moveY}px)`,
          background: `
            linear-gradient(transparent 0%, rgba(0, 255, 150, 0.1) 1%, transparent 2%),
            linear-gradient(90deg, transparent 0%, rgba(0, 255, 150, 0.1) 1%, transparent 2%)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
};

const DecodingText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  
  // How much of the text is revealed?
  const progress = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const chars = text.split('');
  
  return (
    <div className="flex font-mono tracking-widest justify-center flex-wrap">
      {chars.map((char, i) => {
        const charProgress = (i + 1) / chars.length;
        const isRevealed = progress > charProgress;
        
        // Generate random glitch char
        const randomChar = String.fromCharCode(65 + Math.floor(random(i + frame) * 26));
        
        return (
          <span 
            key={i}
            style={{ 
              opacity: interpolate(frame - delay - (i * 2), [0, 10], [0, 1], { extrapolateRight: 'clamp'}),
              color: isRevealed ? COLORS.white : COLORS.green,
              textShadow: isRevealed ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
            }}
          >
            {isRevealed ? char : randomChar}
          </span>
        );
      })}
    </div>
  );
};

const GlitchIcon: React.FC = () => {
  const frame = useCurrentFrame();
  // Random glitch jumps
  const glitchX = Math.random() > 0.9 ? (Math.random() - 0.5) * 20 : 0;
  const glitchY = Math.random() > 0.9 ? (Math.random() - 0.5) * 10 : 0;
  
  return (
    <div className="relative">
      {/* RGB Split Layers */}
      <div className="absolute inset-0 translate-x-1 opacity-50 text-red-500 mix-blend-screen">
         <Bot size={250} strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 -translate-x-1 opacity-50 text-blue-500 mix-blend-screen">
         <Bot size={250} strokeWidth={1.5} />
      </div>
      
      {/* Main Icon */}
      <div 
        className="relative z-10 text-white"
        style={{ transform: `translate(${glitchX}px, ${glitchY}px)` }}
      >
        <Bot size={250} strokeWidth={1.5} />
      </div>
    </div>
  );
};

const ConnectorLine: React.FC<{ start: {x: number, y: number}, end: {x: number, y: number}, delay: number, color: string }> = ({ start, end, delay, color }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame - delay, [0, 15], [0, 100], { extrapolateRight: 'clamp' });

    // Calculate path
    const path = `M${start.x},${start.y} L${end.x},${end.y}`;

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <path 
                d={path} 
                stroke={color} 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="10 10" // Dashed line
                className="opacity-50"
            />
            {/* Animated Draw Line */}
            <path 
                d={path} 
                stroke={color} 
                strokeWidth="6" 
                fill="none" 
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
                style={{ filter: `drop-shadow(0 0 10px ${color})` }}
            />
        </svg>
    )
}

// --- Updated Scenes ---

export const IntroScene: React.FC = () => {
  return (
    <SceneContainer>
      <BinaryStream opacity={0.2} />
      <GridBackground />
      <div className="flex flex-col items-center justify-center gap-16 z-10 w-full px-8">
        
        <PopBox delay={10}>
          <div className="p-16 bg-black/50 border border-green-500/30 rounded-full backdrop-blur-md shadow-[0_0_80px_rgba(0,255,150,0.3)]">
            <GlitchIcon />
          </div>
        </PopBox>

        <div className="text-7xl font-black text-center leading-tight">
          <DecodingText text="AGENT_V2.0" delay={30} />
        </div>

      </div>
    </SceneContainer>
  );
};

export const QuestionScene: React.FC = () => {
    const frame = useCurrentFrame();
    // Gentle floating
    const floatY = Math.sin(frame / 20) * 10;

  return (
    <SceneContainer>
      <BinaryStream opacity={0.1} />
      <GridBackground />
      <div className="flex flex-col gap-16 items-center justify-center w-full px-8 z-10" style={{ transform: `translateY(${floatY}px)`}}>
        {/* Box 1: Orange Filled */}
        <PopBox delay={0} className="w-full max-w-lg">
          <div 
            className="w-full px-8 py-12 rounded-none border-l-8 border-orange-500 bg-gray-900/80 backdrop-blur"
            style={{ boxShadow: '0 0 40px rgba(255, 93, 71, 0.2)' }}
          >
            <h2 className="text-5xl font-bold text-white font-mono uppercase tracking-tighter leading-tight">
              <span className="text-orange-500 block mb-4 text-7xl">&gt;</span> 
              What is an Agent?
            </h2>
          </div>
        </PopBox>

        {/* Box 2: Transparent Outline */}
        <PopBox delay={15} className="w-full max-w-lg">
          <div 
            className="w-full px-8 py-12 rounded-none border border-white/20 bg-black/40 backdrop-blur-md"
          >
            <h2 className="text-5xl font-bold text-white/90 font-mono uppercase tracking-tighter leading-tight">
              <span className="text-green-500 block mb-4 text-7xl">&gt;</span> 
              How does it work?
            </h2>
          </div>
        </PopBox>
      </div>
    </SceneContainer>
  );
};

export const BrainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathingScale = 1 + Math.sin(frame / 20) * 0.05;
  const sticker1Scale = spring({ frame: frame - 20, fps, config: { stiffness: 200 } });
  const sticker2Scale = spring({ frame: frame - 35, fps, config: { stiffness: 200 } });

  // 1080 x 1920
  // Center is 540, 960
  const CX = 540;
  const CY = 960;

  return (
    <SceneContainer>
      <BinaryStream opacity={0.15} />
      <div className="relative w-full h-full flex items-center justify-center z-10">
        
        {/* Central Brain */}
        <PopBox delay={0}>
          <div style={{ transform: `scale(${breathingScale})` }}>
            <Brain size={500} className="text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.4)]" strokeWidth={1} />
          </div>
        </PopBox>

        {/* Connectors (Recalculated for Portrait) */}
        
        {/* GPT Label (Top Center) */}
        <ConnectorLine start={{x: CX, y: CY - 300}} end={{x: CX, y: CY - 600}} delay={25} color="#3b82f6" />
        
        {/* Deepseek Label (Bottom Center) */}
        <ConnectorLine start={{x: CX, y: CY + 300}} end={{x: CX, y: CY + 600}} delay={40} color="#a855f7" />


        {/* Sticker 1: Top */}
        <div 
          className="absolute w-full flex justify-center"
          style={{ 
            top: '15%', 
            transform: `scale(${sticker1Scale})`,
          }}
        >
          <div className="bg-black/80 text-blue-400 font-mono border border-blue-500/50 px-8 py-6 text-4xl shadow-[0_0_40px_rgba(59,130,246,0.6)] flex flex-col items-center gap-2">
            <span className="text-sm text-blue-600/70 tracking-widest">MODEL_ID_01</span>
            [GPT-4o]
          </div>
        </div>

        {/* Sticker 2: Bottom */}
        <div 
          className="absolute w-full flex justify-center"
          style={{ 
            bottom: '15%', 
            transform: `scale(${sticker2Scale})`,
          }}
        >
          <div className="bg-black/80 text-purple-400 font-mono border border-purple-500/50 px-8 py-6 text-4xl shadow-[0_0_40px_rgba(168,85,247,0.6)] flex flex-col items-center gap-2">
             <span className="text-sm text-purple-600/70 tracking-widest">MODEL_ID_02</span>
            [DEEPSEEK]
          </div>
        </div>

      </div>
    </SceneContainer>
  );
};