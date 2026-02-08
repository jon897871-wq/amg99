import React from 'react';
import { Player } from '@remotion/player';
import { AgentVideo } from './components/Composition';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
      {/* Updated aspect ratio class from aspect-video to aspect-[9/16] and max-w-sm for phone size preview */}
      <div className="w-full max-w-[50vh] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <Player
          component={AgentVideo}
          durationInFrames={1080} // Sum of all sequence durations
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
      <div className="mt-6 text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Agent Motion Graphics (9:16)</h1>
        <p className="text-gray-400">
          Vertical Format. Press Play to view.
        </p>
      </div>
    </div>
  );
};

export default App;