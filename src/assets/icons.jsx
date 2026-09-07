import React from 'react';
import {
  Layers,
  Code2,
  Smartphone,
  Brain,
  MessageSquareText,
  ScanEye,
  Workflow,
  BarChart3,
  PenTool,
  Wrench,
  Cog,
  Rocket
} from 'lucide-react';

// Clean, standard pixel-perfect icons from the iconic/feather open-source icon system
export const UIUXIcon = ({ className = "w-10 h-10" }) => (
  <Layers className={className} strokeWidth={2} />
);

export const WebDevIcon = ({ className = "w-10 h-10" }) => (
  <Code2 className={className} strokeWidth={2} />
);

export const MobileDevIcon = ({ className = "w-10 h-10" }) => (
  <Smartphone className={className} strokeWidth={2} />
);

export const AIMLIcon = ({ className = "w-10 h-10" }) => (
  <Brain className={className} strokeWidth={2} />
);

export const NLPIcon = ({ className = "w-10 h-10" }) => (
  <MessageSquareText className={className} strokeWidth={2} />
);

export const ComputerVisionIcon = ({ className = "w-10 h-10" }) => (
  <ScanEye className={className} strokeWidth={2} />
);

export const AgenticAIIcon = ({ className = "w-10 h-10" }) => (
  <Workflow className={className} strokeWidth={2} />
);

export const DataAnalyticsIcon = ({ className = "w-10 h-10" }) => (
  <BarChart3 className={className} strokeWidth={2} />
);

export const DesignRulerPencilIcon = ({ className = "w-12 h-12" }) => (
  <PenTool className={className} strokeWidth={2} />
);

export const BuildGearSearchIcon = ({ className = "w-12 h-12" }) => (
  <Wrench className={className} strokeWidth={2} />
);

export const AutomateGearsIcon = ({ className = "w-12 h-12" }) => (
  <Cog className={className} strokeWidth={2} />
);

export const LaunchRocketIcon = ({ className = "w-12 h-12" }) => (
  <Rocket className={className} strokeWidth={2} />
);
