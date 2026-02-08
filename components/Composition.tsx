import React from 'react';
import { Series } from 'remotion';
import { IntroScene, QuestionScene, BrainScene } from './Phase1';
import { ComparisonScene, ChatScene } from './Phase2';
import { ToolboxScene, CapabilityScene, FlipDemoScene } from './Phase3';
import { RunningModeScene } from './Phase4';
import { AgentProfileScene, VideoSurveillanceScene } from './Showcase';

export const AgentVideo: React.FC = () => {
  return (
    <Series>
        {/* Phase 1: Intro */}
      <Series.Sequence durationInFrames={70}>
        <IntroScene />
      </Series.Sequence>
      
      {/* Demo 1: Image Masking */}
      <Series.Sequence durationInFrames={120}>
        <AgentProfileScene />
      </Series.Sequence>

      {/* Demo 2: Video Surveillance */}
      <Series.Sequence durationInFrames={150}>
        <VideoSurveillanceScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <QuestionScene />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={120}>
        <BrainScene />
      </Series.Sequence>

        {/* Phase 2: Limitations */}
      <Series.Sequence durationInFrames={150}>
        <ComparisonScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={180}>
        <ChatScene />
      </Series.Sequence>

        {/* Phase 3: Solutions */}
      <Series.Sequence durationInFrames={150}>
        <ToolboxScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={120}>
        <CapabilityScene />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={100}>
        <FlipDemoScene />
      </Series.Sequence>

        {/* Phase 4: Running */}
      <Series.Sequence durationInFrames={200}>
        <RunningModeScene />
      </Series.Sequence>
    </Series>
  );
};