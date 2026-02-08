import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Brain, Zap, Eye, RefreshCw } from 'lucide-react';
import { SceneContainer, COLORS, BinaryStream } from './Shared';

export const RunningModeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const stepDuration = 30; // frames per step
  
  // 0: Think, 1: Act, 2: Observe
  const step = Math.floor(frame / stepDuration) % 3;
  
  const getStyle = (index: number) => {
    const isActive = step === index;
    return {
      borderColor: isActive ? COLORS.orange : 'rgba(255,255,255,0.1)',
      backgroundColor: isActive ? 'rgba(255,93,71,0.1)' : 'transparent',
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
      color: isActive ? COLORS.orange : COLORS.white,
      opacity: isActive ? 1 : 0.5,
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-ish transition
      boxShadow: isActive ? `0 0 30px ${COLORS.orange}40` : 'none'
    };
  };

  const loopRotation = interpolate(frame, [0, 300], [0, 360]);

  // Pulse effect logic
  const pulseScale = interpolate(frame % stepDuration, [0, 10], [1, 1.1], { extrapolateRight: 'clamp' });
  const pulseOpacity = interpolate(frame % stepDuration, [0, 15], [0.8, 0], { extrapolateRight: 'clamp' });

  return (
    <SceneContainer>
        <BinaryStream opacity={0.15} />
      <div className="flex flex-col items-center justify-center h-full w-full gap-8 z-10 px-8">
        
        {/* Vertical Icons Column */}
        <div className="flex flex-col items-center gap-8 w-full max-w-lg">
          
          {/* Think */}
          <div className="relative w-full">
             {step === 0 && (
                 <div 
                    className="absolute inset-0 rounded-3xl border-2 border-orange-500 pointer-events-none" 
                    style={{ transform: `scale(${pulseScale})`, opacity: pulseOpacity }}
                 ></div>
             )}
            <div style={getStyle(0)} className="w-full h-40 rounded-3xl border-4 flex items-center justify-between px-12 bg-black/40 backdrop-blur-sm z-10 relative">
                <Brain size={60} strokeWidth={1.5} />
                <span className="text-5xl font-bold font-mono">THINK</span>
            </div>
          </div>

          <div className="h-12 w-1 bg-gradient-to-b from-gray-700 via-white to-gray-700 opacity-20 rounded-full"></div>

          {/* Act */}
          <div className="relative w-full">
             {step === 1 && (
                 <div 
                    className="absolute inset-0 rounded-3xl border-2 border-orange-500 pointer-events-none" 
                    style={{ transform: `scale(${pulseScale})`, opacity: pulseOpacity }}
                 ></div>
             )}
            <div style={getStyle(1)} className="w-full h-40 rounded-3xl border-4 flex items-center justify-between px-12 bg-black/40 backdrop-blur-sm z-10 relative">
                <Zap size={60} strokeWidth={1.5} />
                <span className="text-5xl font-bold font-mono">ACT</span>
            </div>
          </div>

           <div className="h-12 w-1 bg-gradient-to-b from-gray-700 via-white to-gray-700 opacity-20 rounded-full"></div>

          {/* Observe */}
          <div className="relative w-full">
             {step === 2 && (
                 <div 
                    className="absolute inset-0 rounded-3xl border-2 border-orange-500 pointer-events-none" 
                    style={{ transform: `scale(${pulseScale})`, opacity: pulseOpacity }}
                 ></div>
             )}
            <div style={getStyle(2)} className="w-full h-40 rounded-3xl border-4 flex items-center justify-between px-12 bg-black/40 backdrop-blur-sm z-10 relative">
                <Eye size={60} strokeWidth={1.5} />
                <span className="text-5xl font-bold font-mono">OBSERVE</span>
            </div>
          </div>

        </div>

        {/* Bottom Loop Indicator */}
        <div className="flex flex-col items-center gap-6 mt-8">
            <div style={{ transform: `rotate(${loopRotation}deg)` }} className="relative">
                <div className="absolute inset-0 blur-md bg-orange-500/30 rounded-full"></div>
                <RefreshCw size={80} color={COLORS.orange} className="relative z-10" />
            </div>
            
            <div className="text-xl font-mono flex gap-2 uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/10">
                <span style={{ color: step === 0 ? COLORS.orange : '#666' }}>Think</span>
                <span className="text-gray-700">&gt;</span>
                <span style={{ color: step === 1 ? COLORS.orange : '#666' }}>Act</span>
                <span className="text-gray-700">&gt;</span>
                <span style={{ color: step === 2 ? COLORS.orange : '#666' }}>Observe</span>
            </div>
        </div>

      </div>
    </SceneContainer>
  );
};