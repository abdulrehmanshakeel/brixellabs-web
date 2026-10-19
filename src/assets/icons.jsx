import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faCode,
  faMobileScreenButton,
  faBrain,
  faComments,
  faEye,
  faNetworkWired,
  faChartSimple,
  faPenRuler,
  faWrench,
  faGear,
  faRocket,
  faSpider,
  faPlug,
  faCubes
} from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';

// Consistent Font Awesome icon exports across the website (pure crisp white by default)
export const UIUXIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faLayerGroup} className={`text-white ${className}`} />
);

export const WebDevIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faCode} className={`text-white ${className}`} />
);

export const MobileDevIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faMobileScreenButton} className={`text-white ${className}`} />
);

export const AIMLIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faBrain} className={`text-white ${className}`} />
);

export const NLPIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faComments} className={`text-white ${className}`} />
);

export const ComputerVisionIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faEye} className={`text-white ${className}`} />
);

export const AgenticAIIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faNetworkWired} className={`text-white ${className}`} />
);

export const DataAnalyticsIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faChartSimple} className={`text-white ${className}`} />
);

export const DesignRulerPencilIcon = ({ className = "w-12 h-12" }) => (
  <FontAwesomeIcon icon={faPenRuler} className={`text-white ${className}`} />
);

export const BuildGearSearchIcon = ({ className = "w-12 h-12" }) => (
  <FontAwesomeIcon icon={faWrench} className={`text-white ${className}`} />
);

export const AutomateGearsIcon = ({ className = "w-12 h-12" }) => (
  <FontAwesomeIcon icon={faGear} className={`text-white ${className}`} />
);

export const LaunchRocketIcon = ({ className = "w-12 h-12" }) => (
  <FontAwesomeIcon icon={faRocket} className={`text-white ${className}`} />
);

export const ShopifyDevIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faShopify} className={`text-white ${className}`} />
);

export const WebScrapingIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faSpider} className={`text-white ${className}`} />
);

export const APIDevIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faPlug} className={`text-white ${className}`} />
);

export const CustomSoftwareIcon = ({ className = "w-10 h-10" }) => (
  <FontAwesomeIcon icon={faCubes} className={`text-white ${className}`} />
);


