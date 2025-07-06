import React from 'react';
import { motion, useAnimation } from 'framer-motion';

const MOCK_LIKELIHOOD = 72; // percent

const CMELikelihoodGauge: React.FC = () => {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = MOCK_LIKELIHOOD;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="mb-2">
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="#F97316"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <div className="text-2xl font-semibold text-solarorange">{percent}%</div>
      <div className="text-xs text-gray-500">CME Likelihood</div>
    </div>
  );
};

export default CMELikelihoodGauge; 