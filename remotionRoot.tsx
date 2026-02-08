import React, { useEffect, useState } from 'react';
import { registerRoot, Composition, delayRender, continueRender } from 'remotion';
import { AgentVideo } from './components/Composition';

const TailwindInjector: React.FC = () => {
  // We use delayRender to pause the video recording engine until Tailwind is ready.
  const [handle] = useState(() => delayRender("Loading Tailwind"));

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // If already loaded (e.g. navigation within app), continue immediately
    if (document.getElementById('tailwind-cdn')) {
        continueRender(handle);
        return;
    }

    const script = document.createElement('script');
    script.id = 'tailwind-cdn';
    script.src = "https://cdn.tailwindcss.com";
    
    script.onload = () => {
        // Give Tailwind a split second to parse the DOM classes
        setTimeout(() => {
            continueRender(handle);
        }, 500);
    };
    
    script.onerror = () => {
        console.error("Failed to load Tailwind");
        continueRender(handle); // Continue anyway to avoid infinite hang
    };
    
    document.head.appendChild(script);
  }, [handle]);

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