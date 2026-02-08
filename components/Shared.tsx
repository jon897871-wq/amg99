import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate, random } from 'remotion';

// --- Constants ---
export const COLORS = {
  orange: '#FF5D47',
  white: '#FFFFFF',
  darkGray: '#333333',
  black: '#0D0D0D',
  green: '#22c55e',
  red: '#ef4444',
  cyan: '#06b6d4',
  bgGradient: 'radial-gradient(circle at center, #222222 0%, #000000 100%)',
};

// --- Helper Components ---

export const BinaryStream: React.FC<{ opacity?: number }> = ({ opacity = 0.3 }) => {
    const frame = useCurrentFrame();
    // Create a long string of random binary data (memoized conceptually by React render cycle in Remotion)
    const binaryContent = Array(40).fill(0).map(() => 
        Math.random().toString(2).substring(2, 50)
    ).join(' ');

    const scrollY = interpolate(frame, [0, 200], [0, -200]);
    const pulsingOpacity = interpolate(Math.sin(frame / 15), [-1, 1], [opacity * 0.5, opacity]);

    return (
        <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0"
            style={{ opacity: pulsingOpacity }}
        >
            <div 
                className="w-full text-center font-mono text-4xl font-black text-green-500/20 break-all leading-relaxed tracking-[0.2em]"
                style={{
                    transform: `translateY(${scrollY}px)`,
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                }}
            >
                {binaryContent}
                {binaryContent}
            </div>
        </div>
    );
};

export const KenBurnsBackground: React.FC<{ children: React.ReactNode, direction?: 'zoomIn' | 'panRight' }> = ({ children, direction = 'zoomIn' }) => {
  const frame = useCurrentFrame();
  
  let transform = '';
  if (direction === 'zoomIn') {
    const scale = interpolate(frame, [0, 300], [1, 1.2]);
    transform = `scale(${scale})`;
  } else {
    const x = interpolate(frame, [0, 300], [0, -50]);
    transform = `translateX(${x}px)`;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <div className="w-full h-full" style={{ transform }}>
        {children}
      </div>
    </div>
  );
};

interface PopBoxProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PopBox: React.FC<PopBoxProps> = ({ children, delay = 0, className = '', style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 120, damping: 12 },
  });

  return (
    <div 
      className={className} 
      style={{ 
        transform: `scale(${scale})`, 
        opacity: Math.min(scale, 1),
        ...style 
      }}
    >
      {children}
    </div>
  );
};

interface TypewriterTextProps {
  text: string;
  speed?: number; // frames per char
  delay?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 2, delay = 0, className = '' }) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - delay);
  const charsShown = Math.floor(activeFrame / speed);
  
  return <span className={className}>{text.slice(0, charsShown)}</span>;
};

// Global container
export const SceneContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black ${className}`}
      style={{ background: COLORS.bgGradient }}
    >
      {children}
    </div>
  );
};