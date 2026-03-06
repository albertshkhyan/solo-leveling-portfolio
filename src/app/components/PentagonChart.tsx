import { motion } from 'motion/react';

export interface PentagonChartDataPoint {
  label: string;
  value: number;
}

interface PentagonChartProps {
  data: PentagonChartDataPoint[];
  color: string;
  accentColor: string;
}

const SIZE = 260;
const LABEL_OFFSET_PX = 52;
/** Extra space so labels that extend outside the pentagon have room; keeps chart+labels visually centered */
const WRAPPER_PADDING = 36;
const WRAPPER_SIZE = SIZE + WRAPPER_PADDING * 2;

export function PentagonChart({ data, color, accentColor }: PentagonChartProps) {
  const size = SIZE;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 5;

  const getPoint = (index: number, value: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const radius = maxRadius * ((i + 1) / levels);
    const points = data.map((_, index) => getPoint(index, 100, radius));
    return points.map((p) => `${p.x},${p.y}`).join(' ');
  });

  const dataPoints = data.map((item, index) => getPoint(index, item.value, maxRadius));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const axisLines = data.map((_, index) => {
    const endPoint = getPoint(index, 100, maxRadius);
    return { x: endPoint.x, y: endPoint.y };
  });

  const labelPositions = data.map((item, i) => {
    const pos = getPoint(i, 100, maxRadius + LABEL_OFFSET_PX);
    return { label: item.label, value: item.value, x: pos.x, y: pos.y };
  });

  return (
    <div
      className="relative flex items-center justify-center overflow-visible shrink-0"
      style={{
        width: WRAPPER_SIZE,
        height: WRAPPER_SIZE,
        minWidth: WRAPPER_SIZE,
        minHeight: WRAPPER_SIZE,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        className="overflow-visible block"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={`radarGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
          </linearGradient>
          <filter id={`glow-${color}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {gridLevels.map((points, i) => (
          <motion.polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}

        {axisLines.map((point, i) => (
          <motion.line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}

        <motion.polygon
          points={dataPolygon}
          fill={`url(#radarGradient-${color})`}
          stroke="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring', bounce: 0.3 }}
        />

        <motion.polygon
          points={dataPolygon}
          fill="none"
          stroke={color}
          strokeWidth="2"
          filter={`url(#glow-${color})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        />

        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={color}
            stroke={accentColor}
            strokeWidth="2"
            filter={`url(#glow-${color})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.5 }}
          />
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          {labelPositions.map(({ label, value, x, y }, i) => (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9BA6B2"
              fontSize={10}
              fontWeight={600}
              style={{ fontFamily: 'inherit' }}
            >
              <tspan x={x} dy="-0.5em">
                {label}
              </tspan>
              <tspan x={x} dy="1.2em" fill={color} fontSize={14} fontWeight={700}>
                {value}%
              </tspan>
            </text>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
