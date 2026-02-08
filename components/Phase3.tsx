import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Brain, FileText, Terminal, Search, AppWindow, Presentation, Globe } from 'lucide-react';
import { SceneContainer, PopBox, COLORS, BinaryStream } from './Shared';

export const ToolboxScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Data packet position (0 to 100%)
    const packetPos = interpolate(frame % 40, [0, 40], [0, 100]);

  return (
    <SceneContainer>
        <BinaryStream opacity={0.1} />
      <div className="w-full h-full py-20 px-8 flex flex-col items-center justify-center gap-8 z-10">
        
        {/* Brain Top */}
        <PopBox delay={0}>
            <div className="flex flex-col items-center gap-4 relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <Brain size={250} color={COLORS.white} strokeWidth={1} className="relative z-10 drop-shadow-2xl" />
                <span className="text-3xl font-bold text-gray-400 font-mono">LLM_CORE</span>
            </div>
        </PopBox>

        {/* Arrow Connector (Vertical) */}
        <div className="w-32 h-48 relative flex justify-center items-center">
            <PopBox delay={15} className="h-full w-4">
                 {/* Base Line */}
                <div className="h-full w-2 bg-gray-800 rounded-full relative overflow-visible mx-auto">
                    {/* Animated Packet */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 h-24 w-6 bg-gradient-to-b from-transparent via-orange-500 to-transparent blur-sm"
                        style={{ top: `${packetPos}%`, transform: 'translate(-50%, -50%)' }}
                    ></div>
                     <div 
                        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_20px_white]"
                        style={{ top: `${packetPos}%`, transform: 'translate(-50%, -50%)' }}
                    ></div>
                </div>
            </PopBox>
        </div>

        {/* Toolbox Bottom */}
        <div className="flex flex-col gap-6 w-full max-w-md">
            <h2 className="text-5xl font-bold text-orange-500 mb-4 text-center tracking-widest font-mono">TOOLKIT</h2>
            
            {[
                { Icon: FileText, label: "Files", color: "text-blue-400", delay: 30 },
                { Icon: Terminal, label: "Terminal", color: "text-green-400", delay: 40 },
                { Icon: Search, label: "Browser", color: "text-orange-400", delay: 50 }
            ].map((tool, index) => (
                <PopBox delay={tool.delay} key={index}>
                    <div className="flex items-center gap-6 bg-white/5 p-6 rounded-xl border border-white/10 w-full backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg group">
                        <div className={`p-4 rounded-lg bg-black/50 ${tool.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform`}>
                            <tool.Icon size={40} />
                        </div>
                        <span className="text-4xl font-semibold font-mono text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all">{tool.label}</span>
                    </div>
                </PopBox>
            ))}
        </div>

      </div>
    </SceneContainer>
  );
};

export const CapabilityScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Parallax/Ken Burns for backgrounds
    const bgPan = interpolate(frame, [0, 200], [0, -10]);
    const bgScale = interpolate(frame, [0, 200], [1, 1.2]);

    const Card = ({ title, icon: Icon, gradient, delay }: any) => (
        <PopBox delay={delay} className="w-full">
            <div className="w-full h-48 rounded-3xl relative overflow-hidden group border border-white/20 shadow-2xl">
                {/* Animated Background */}
                <div 
                    className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    style={{ transform: `scale(${bgScale}) translateX(${bgPan}px)` }}
                ></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-between px-12 z-10 bg-black/10 backdrop-blur-[2px]">
                    <span className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-md">{title}</span>
                    <div className="bg-black/30 p-4 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                        <Icon size={60} className="text-white" />
                    </div>
                </div>
            </div>
        </PopBox>
    );

    return (
        <SceneContainer>
            <BinaryStream opacity={0.15} />
            <div className="flex flex-col items-center justify-center w-full h-full px-8 gap-8 z-10">
                <PopBox delay={0}>
                    <h2 className="text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tighter mb-8 leading-tight">
                        CAPABILITY<br/>MATRIX
                    </h2>
                </PopBox>

                <div className="flex flex-col gap-6 w-full max-w-lg">
                    <Card title="Apps" icon={AppWindow} gradient="from-purple-900 via-purple-800 to-indigo-900" delay={15} />
                    <Card title="PPT" icon={Presentation} gradient="from-orange-900 via-red-800 to-pink-900" delay={25} />
                    <Card title="Search" icon={Globe} gradient="from-blue-900 via-cyan-800 to-teal-900" delay={35} />
                </div>
            </div>
        </SceneContainer>
    )
}

export const FlipDemoScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Rotate 0 to 180
    const rotation = interpolate(frame, [20, 60], [0, 180], { extrapolateRight: 'clamp' });
    const isFront = rotation <= 90;

    return (
        <SceneContainer>
             <BinaryStream opacity={0.1} />
            <div style={{ perspective: '1500px' }} className="w-full h-full flex items-center justify-center z-10 px-4">
                <div 
                    className="relative w-full max-w-[800px] h-[600px]"
                    style={{ 
                        transformStyle: 'preserve-3d', 
                        transform: `rotateY(${rotation}deg)` 
                    }}
                >
                    {/* Content switcher based on angle */}
                    <div 
                        className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] border-[4px] border-gray-800"
                        style={{ 
                            transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)',
                            background: isFront ? '#f3f4f6' : '#111827'
                        }}
                    >
                         {isFront ? (
                             <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4">
                                <div className="text-gray-400 font-bold tracking-widest text-xl uppercase">Legacy Interface</div>
                                <div className="text-6xl font-black text-gray-800">TOP VIEW</div>
                                {/* Skeleton UI */}
                                <div className="w-full space-y-4 mt-8 opacity-50">
                                    <div className="w-full h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-2/3 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-3/4 h-4 bg-gray-300 rounded-full"></div>
                                </div>
                             </div>
                         ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4 relative overflow-hidden text-white">
                                {/* Cyberpunk Grid Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                                
                                <div className="text-orange-500 font-bold tracking-widest text-xl uppercase z-10 font-mono">Agent Interface</div>
                                <div className="text-6xl font-black text-white z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">MANUS</div>
                                
                                <div className="flex gap-4 mt-8 z-10">
                                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_red] animate-pulse"></div>
                                    <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_yellow] animate-pulse delay-75"></div>
                                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_green] animate-pulse delay-150"></div>
                                </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </SceneContainer>
    );
};