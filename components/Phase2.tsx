import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Brain, Check, X, User, Bot, AlertTriangle, ShieldAlert } from 'lucide-react';
import { SceneContainer, PopBox, TypewriterText, COLORS, BinaryStream } from './Shared';

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Move Brain Up instead of Left
  const brainY = interpolate(frame, [0, 30], [0, -400], { extrapolateRight: 'clamp' });
  const brainScale = interpolate(frame, [0, 30], [1, 0.8], { extrapolateRight: 'clamp' });
  
  // Scanning line on brain
  const scanY = interpolate(frame % 60, [0, 60], [-200, 200]);

  return (
    <SceneContainer>
        <BinaryStream opacity={0.1} />
      <div className="w-full h-full flex flex-col items-center justify-center relative gap-12">
        {/* Brain Moving Up */}
        <div style={{ transform: `translateY(${brainY}px) scale(${brainScale})` }} className="relative z-10">
           <Brain size={400} color={COLORS.white} strokeWidth={1} className="opacity-80" />
           {/* Scan Overlay */}
           <div className="absolute inset-0 overflow-hidden rounded-full opacity-50">
               <div className="w-full h-[2px] bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)]" style={{ transform: `translateY(${scanY}px)` }}></div>
           </div>
        </div>

        {/* Text List on Bottom */}
        <div className="absolute bottom-32 flex flex-col gap-12 w-full px-12">
          <PopBox delay={30} className="w-full">
            <div className="flex items-center gap-6 group w-full bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/50 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] shrink-0">
                <Check size={50} className="text-green-500" strokeWidth={4} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-green-500 text-xl font-bold uppercase tracking-wider mb-1 font-mono">SYS_CAPABILITY_01</h3>
                <p className="text-white text-4xl font-bold tracking-tight">Reasoning & Chat</p>
              </div>
            </div>
          </PopBox>

          <PopBox delay={60} className="w-full">
            <div className="flex items-center gap-6 group w-full bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/50 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.2)] shrink-0">
                <X size={50} className="text-red-500" strokeWidth={4} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-red-500 text-xl font-bold uppercase tracking-wider mb-1 font-mono">SYS_ERROR_LIMIT</h3>
                <p className="text-white text-4xl font-bold tracking-tight">Perceive & Modify</p>
              </div>
            </div>
          </PopBox>
        </div>
      </div>
    </SceneContainer>
  );
};

export const ChatScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Warning Strobe Effect
    const warningActive = frame > 100;
    const strobe = warningActive ? Math.sin(frame) : 0;
    const bgStrobe = warningActive ? interpolate(strobe, [-1, 1], [0, 0.3]) : 0;

  return (
    <SceneContainer className="transition-colors duration-200">
        {/* Red Alert Background Overlay */}
        <div className="absolute inset-0 bg-red-900 pointer-events-none z-0" style={{ opacity: bgStrobe }}></div>
        <BinaryStream opacity={0.15} />

      <div className="w-full h-full flex flex-col justify-center gap-12 relative z-10 px-8 pb-32">
        
        {/* User Bubble - Terminal Style */}
        <PopBox delay={0} className="self-start w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center shrink-0">
                    <User size={24} className="text-gray-400" />
                 </div>
                 <span className="text-gray-500 text-sm font-mono">USER_INPUT_STREAM</span>
            </div>
            
            <div className="bg-gray-900/90 border-l-4 border-gray-500 px-6 py-6 w-full font-mono backdrop-blur-md rounded-r-xl">
              <p className="text-3xl text-gray-200 font-medium">Delete the production database.</p>
            </div>
          </div>
        </PopBox>

        {/* Robot Bubble - HUD Style */}
        <PopBox delay={30} className="self-end w-full">
          <div className="flex flex-col items-end gap-4 w-full">
             <div className="flex items-center gap-4 flex-row-reverse">
                 <div className="w-12 h-12 bg-orange-900/50 border border-orange-500 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,93,71,0.3)]">
                    <Bot size={24} className="text-orange-500" />
                </div>
                 <span className="text-orange-400 text-sm font-mono tracking-widest">AGENT_RESPONSE</span>
             </div>
            
            <div className="bg-orange-950/40 border border-orange-500/30 border-r-4 border-r-orange-500 px-6 py-6 w-full font-mono backdrop-blur-md relative overflow-hidden rounded-l-xl">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent opacity-50 translate-y-[-100%] animate-scan"></div>
              <p className="text-3xl text-orange-200">
                <span className="mr-2">&gt;</span>
                <TypewriterText text="I cannot directly access or modify external systems." delay={45} speed={2} />
              </p>
            </div>
          </div>
        </PopBox>
      </div>

      {/* Warning Bar - Red Alert */}
      <PopBox delay={100} className="absolute bottom-12 w-full px-4 z-20">
         <div className="w-full bg-red-600 text-black py-12 rounded-xl border-4 border-red-500 shadow-[0_0_100px_rgba(220,38,38,0.8)] flex flex-col items-center justify-center gap-6 relative overflow-hidden text-center">
             {/* Scrolling warning stripes */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, black 20px, black 40px)'}}></div>
            
            <ShieldAlert size={100} strokeWidth={2} className="animate-pulse" />
            <div className="flex flex-col items-center z-10 px-4">
                 <span className="text-sm font-black tracking-[0.5em] mb-2 text-red-900 bg-white/20 px-2 py-1">SECURITY ENGAGED</span>
                <span className="text-4xl font-black uppercase tracking-tight leading-tight">
                Cannot <span className="bg-black text-red-500 px-2 text-nowrap">Perceive</span> or <span className="bg-black text-red-500 px-2 text-nowrap">Modify</span>
                </span>
            </div>
         </div>
      </PopBox>
    </SceneContainer>
  );
};