import React from 'react';
import { Player } from '@remotion/player';
import { AgentVideo } from './components/Composition';

const App: React.FC = () => {
  return (
    // Fixed inset-0 ensures it covers the whole screen exactly, regardless of scroll.
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
        <Player
          component={AgentVideo}
          durationInFrames={1080} 
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls
          autoPlay
          loop
        />
    </div>
  );
};

export default App;