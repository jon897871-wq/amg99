import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { AgentVideo } from './components/Composition';

const TailwindInjector: React.FC = () => {
  // Injects Tailwind CDN for the CLI renderer which doesn't use index.html
  // Note: For production-grade rendering, installing tailwind via npm is recommended.
  if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
  }
  return null;
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <TailwindInjector />
      <Composition
        id="AgentVideo"
        component={AgentVideo}
        durationInFrames={1450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);