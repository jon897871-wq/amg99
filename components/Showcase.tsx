import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { Img, Video } from 'remotion';
import { Scan, Fingerprint, Activity, Crosshair, Target, Aperture } from 'lucide-react';
import { SceneContainer, TypewriterText, BinaryStream, COLORS } from './Shared';

export const AgentProfileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Ken Burns Effect (Slow Zoom & Pan)
  const scale = interpolate(frame, [0, 150], [1.1, 1.3]);
  const yPos = interpolate(frame, [0, 150], [0, -20]);

  // 2. Scanner Logic
  const scanProgress = interpolate(frame, [15, 90], [0, 100], { extrapolateRight: 'clamp' });
  
  // 3. Hologram Effects
  const flicker = 0.8 + random(frame) * 0.2; 
  const hueRotate = interpolate(frame, [0, 150], [0, 30]);

  return (
    <SceneContainer>
      {/* Background Layer: Binary Stream from Shared */}
      <BinaryStream opacity={0.4} />

      <div className="flex flex-col items-center justify-center w-full h-full gap-8 z-10 select-none px-4 py-10">
        
        {/* --- TOP: THE IMAGE SCANNER --- */}
        <div className="relative w-full max-w-md aspect-[3/4] rounded-xl bg-black/50 border border-white/10 shadow-2xl overflow-hidden shrink-0">
            
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Fingerprint size={150} className="text-cyan-900 animate-pulse" />
            </div>

            <div 
                className="absolute inset-0 overflow-hidden rounded-xl"
                style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${scanProgress}%, 0 ${scanProgress}%)`,
                    borderBottom: '2px solid #22d3ee',
                    boxShadow: '0 0 50px rgba(34, 211, 238, 0.5)'
                }}
            >
                <Img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    style={{
                        transform: `scale(${scale}) translateY(${yPos}px)`,
                        opacity: flicker,
                        filter: `contrast(1.2) sepia(1) hue-rotate(${180 + hueRotate}deg) saturate(2)`,
                    }}
                />
                
                <div 
                    className="absolute w-full h-[4px] bg-cyan-400 blur-[2px] z-20"
                    style={{ 
                        bottom: 0, 
                        boxShadow: '0 0 20px 5px rgba(34, 211, 238, 0.8)'
                    }} 
                />
            </div>

            <div className="absolute top-4 left-4 text-cyan-500 font-mono text-xs tracking-widest flex items-center gap-2 z-30">
                <Activity size={16} className="animate-pulse"/> 
                <span>SCANNING... {Math.round(scanProgress)}%</span>
            </div>
            
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 z-30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 z-30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 z-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 z-30"></div>
        </div>

        {/* --- BOTTOM: DATA READOUT --- */}
        <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex items-center gap-4 text-cyan-500 justify-center">
                <Scan size={32} />
                <h2 className="text-3xl font-bold font-mono tracking-tighter shadow-cyan-500/50 drop-shadow-lg">
                    IDENTITY VERIFIED
                </h2>
            </div>

            <div className="bg-black/40 border-l-4 border-cyan-500 p-6 flex flex-col gap-4 backdrop-blur-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Designation</span>
                    <span className="font-mono text-lg text-white">
                        <TypewriterText text="OMEGA AGENT" delay={30} />
                    </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Clearance</span>
                    <span className="font-mono text-lg text-green-400 shadow-green-500/50 drop-shadow-sm">
                        <TypewriterText text="LEVEL 5 (UNRESTRICTED)" delay={60} />
                    </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Status</span>
                    <span className="font-mono text-lg text-cyan-400 shadow-cyan-500/50 drop-shadow-sm">
                        <TypewriterText text="ONLINE / LISTENING" delay={90} />
                    </span>
                </div>
            </div>

            <div className="relative h-20 overflow-hidden border border-cyan-900/50 bg-black/60 p-3 rounded">
                <div className="absolute top-2 right-2 text-[8px] text-cyan-700 font-bold">LIVE FEED</div>
                <div className="text-[10px] font-mono text-cyan-500/80 break-all leading-tight opacity-80">
                   <TypewriterText 
                      text="0x4F 0x4B 0x20 0x53 0x59 0x53 0x54 0x45 0x4D 0x20 0x49 0x4E 0x49 0x54 0x2E 0x2E 0x2E 0x20 0x4C 0x4F 0x41 0x44 0x49 0x4E 0x47 0x20 0x4E 0x45 0x55 0x52 0x41 0x4C 0x20 0x4E 0x45 0x54 0x57 0x4F 0x52 0x4B 0x20 0x4D 0x4F 0x44 0x45 0x4C 0x2E 0x2E 0x2E" 
                      speed={0.5} 
                      delay={100}
                    />
                </div>
            </div>
        </div>

      </div>
    </SceneContainer>
  );
};

// --- VIDEO SURVEILLANCE / DRONE FEED SCENE ---

export const VideoSurveillanceScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Updated Source: Direct Filebin link
    const VIDEO_SRC = "https://storage.filebin.net/filebin/684de08187c4905abc6225ea9951c53447165adcc515cacde5cf66f3824a43f9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=GK352fd2505074fc9dde7fd2cb%2F20260208%2Fhel1-dc4%2Fs3%2Faws4_request&X-Amz-Date=20260208T092030Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host%3Bx-forwarded-for&response-cache-control=max-age%3D7200&response-content-disposition=inline%3B%20filename%3D%22grok-video-87c2daf4-3715-4f50-b1ed-4e6bc7ed185b.mp4%22&response-content-type=video%2Fmp4&x-id=GetObject&X-Amz-Signature=f78f0af1edcc4c25b92842a953f9ad7ade0b14053ee592a0336051d1c7f94cfc";

    // Animation: The "Drone Scope" moves around
    const scopeX = interpolate(Math.sin(frame / 60), [-1, 1], [-50, 50]); 
    const scopeY = interpolate(Math.cos(frame / 80), [-1, 1], [-50, 50]);

    // Simulated "Lock On" pulsing
    const lockScale = interpolate(Math.sin(frame / 10), [-1, 1], [1, 1.05]);

    return (
        <SceneContainer>
            <BinaryStream opacity={0.1} />
            
            {/* LAYER 1: Background Video (Context) */}
            {/* Full screen, blurred, heavily tinted blue to recede into background */}
            <div className="absolute inset-0 w-full h-full opacity-40">
                <Video 
                    src={VIDEO_SRC}
                    volume={0}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // Strong blur and tint for background to make the lens pop
                        filter: 'blur(15px) hue-rotate(180deg) grayscale(80%) brightness(0.3)'
                    }}
                />
                 {/* Grid Overlay on Background */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* LAYER 2: The "Drone Lens" (Subject) */}
            {/* A sharp, circular cutout of the same video that moves around */}
            <div 
                className="absolute w-[800px] h-[800px] rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_100px_rgba(255,0,0,0.3)] z-10"
                style={{
                    transform: `translate(${scopeX}px, ${scopeY}px)`,
                    boxShadow: 'inset 0 0 100px black', // Inner vignette
                    backgroundColor: '#000' // Fallback
                }}
            >
                {/* The Video Inside the Lens */}
                {/* 
                   KEY FIX: We use object-fit: cover on a 100% width/height video.
                   This automatically aligns the video center (car tail light) to the mask center.
                   We do NOT transform it inversely, because we want the camera to feel like it's tracking the subject.
                   (i.e. the subject stays in the center of the scope).
                */}
                <Video 
                    src={VIDEO_SRC}
                    volume={0}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // High contrast "Night Mode" look
                        filter: 'contrast(1.4) saturate(1.2) sepia(0.5) hue-rotate(-20deg)',
                    }}
                />
                
                {/* Lens UI Overlays */}
                <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
                    <Target size={750} strokeWidth={0.5} className="text-red-500 animate-[spin_10s_linear_infinite]" />
                </div>
                
                {/* Tracking Box simulated on center */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-red-500 w-32 h-32"
                    style={{ transform: `translate(-50%, -50%) scale(${lockScale})`}}
                >
                        <div className="absolute -top-6 left-0 bg-red-600 text-black font-bold text-xs px-2 py-1">TARGET LOCKED</div>
                        <div className="absolute -bottom-6 right-0 text-red-500 font-mono text-xs">CONF: 99.9%</div>
                        
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
                </div>
            </div>

            {/* LAYER 3: Global HUD UI (On top of everything) */}
            <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-between pointer-events-none z-20">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-red-500 animate-pulse">
                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                            <span className="font-bold tracking-widest">LIVE FEED // REC</span>
                        </div>
                        <div className="text-xs font-mono text-red-400 opacity-70">
                            CAM_04 [NIGHT_RAIN]
                        </div>
                    </div>
                    <div className="text-right font-mono text-red-500">
                        <div className="text-4xl font-black">
                            {Math.floor(frame / 30)}:{(frame % 30).toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs">T-MINUS</div>
                    </div>
                </div>

                {/* Footer Analysis */}
                <div className="flex gap-4 items-end">
                    <div className="w-32 h-20 bg-black/80 border border-red-900/50 p-2 overflow-hidden">
                        <div className="text-[10px] text-red-700 font-bold mb-1">SPECTRAL ANALYSIS</div>
                        <div className="flex items-end gap-[2px] h-full pb-4">
                            {Array(10).fill(0).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-full bg-red-600/50"
                                    style={{ 
                                        height: `${20 + Math.random() * 80}%`,
                                        transition: 'height 0.1s' 
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 font-mono text-xs text-red-500 opacity-60">
                        <TypewriterText text="TARGET: VEHICLE // SUPRA DETECTED... RAIN INTERFERENCE: HIGH... ENHANCING VISUALS..." speed={1} />
                    </div>
                </div>
            </div>

        </SceneContainer>
    );
};