import React from 'react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectVisualProps {
  project: ProjectItem;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ project }) => {
  const { geometryType } = project.visualTheme;

  return (
    <div className="project-visual-canvas" aria-label={`${project.title} Architectural Schematic`}>
      {geometryType === 'grid' && (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfc2c7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#44444c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#141417" stopOpacity="0.8" />
            </linearGradient>
            <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="600" height="375" fill="#0c0c0e" />
          <rect width="600" height="375" fill="url(#archGrid)" />

          {/* Concentric telemetry rings */}
          <circle cx="300" cy="187" r="110" fill="none" stroke="rgba(191,194,199,0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="187" r="75" fill="none" stroke="rgba(191,194,199,0.25)" strokeWidth="1.5" />
          <circle cx="300" cy="187" r="35" fill="rgba(191,194,199,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

          {/* Architectural nodal routes */}
          <path
            d="M 120 187 L 265 187 L 300 152 L 480 152"
            fill="none"
            stroke="#bfc2c7"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <path
            d="M 180 260 L 260 260 L 300 222 L 420 222"
            fill="none"
            stroke="rgba(191,194,199,0.5)"
            strokeWidth="1.2"
          />

          {/* Coordinates and editorial labels */}
          <text x="30" y="45" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="2">
            TELEMETRY · AGR-NILO: NODE 09
          </text>
          <text x="30" y="62" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            HARVEST COLD-CHAIN INTEGRITY: ACTIVE
          </text>

          {/* Nodes */}
          <circle cx="120" cy="187" r="4" fill="#ffffff" />
          <circle cx="300" cy="152" r="3" fill="#bfc2c7" />
          <circle cx="480" cy="152" r="4" fill="#ffffff" />
          <circle cx="180" cy="260" r="3.5" fill="#bfc2c7" />
          <circle cx="420" cy="222" r="3.5" fill="#ffffff" />

          {/* Monogram or status */}
          <text x="490" y="345" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="9" textAnchor="end">
            SYS_LAT: 11.0168° N · 76.9558° E
          </text>
        </svg>
      )}

      {geometryType === 'matrix' && (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <rect width="600" height="375" fill="#0a0a0c" />
          <defs>
            <linearGradient id="metalSheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a1e" />
              <stop offset="50%" stopColor="#bfc2c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1a1a1e" />
            </linearGradient>
          </defs>

          {/* Memory grid lines */}
          <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
            <line x1="60" y1="90" x2="540" y2="90" />
            <line x1="60" y1="150" x2="540" y2="150" />
            <line x1="60" y1="210" x2="540" y2="210" />
            <line x1="60" y1="270" x2="540" y2="270" />
          </g>

          {/* Pointer Arrow */}
          <path d="M 60 120 L 140 120 L 150 135 L 200 135" fill="none" stroke="#bfc2c7" strokeWidth="1.5" />
          <circle cx="200" cy="135" r="3.5" fill="#ffffff" />

          {/* Memory cells */}
          <rect x="220" y="110" width="70" height="48" fill="#141418" stroke="#3d3d46" strokeWidth="1" />
          <rect x="290" y="110" width="70" height="48" fill="#1b1b22" stroke="#bfc2c7" strokeWidth="1.2" />
          <rect x="360" y="110" width="70" height="48" fill="#141418" stroke="#3d3d46" strokeWidth="1" />
          <rect x="430" y="110" width="70" height="48" fill="#141418" stroke="#3d3d46" strokeWidth="1" />

          <text x="255" y="138" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="10" textAnchor="middle">0x00</text>
          <text x="325" y="138" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="600" textAnchor="middle">*PTR</text>
          <text x="395" y="138" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="10" textAnchor="middle">0x08</text>
          <text x="465" y="138" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="10" textAnchor="middle">0x10</text>

          {/* Pointer arithmetic schematic */}
          <text x="60" y="55" fill="#bfc2c7" fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="1.5">
            MEMORY_BUFFER: FLAT_1D_CONTIGUOUS
          </text>
          <text x="60" y="75" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="9">
            OFFSET_CALC: [row * stride + col] · 0-OVERHEAD
          </text>

          {/* Lower matrix bracket */}
          <path d="M 160 210 L 140 210 L 140 310 L 160 310" fill="none" stroke="#6e6e76" strokeWidth="1.5" />
          <path d="M 440 210 L 460 210 L 460 310 L 440 310" fill="none" stroke="#6e6e76" strokeWidth="1.5" />

          <text x="220" y="245" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="11">1.000</text>
          <text x="300" y="245" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="11">0.000</text>
          <text x="380" y="245" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="11">0.000</text>

          <text x="220" y="275" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="11">0.000</text>
          <text x="300" y="275" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="600">cos(θ)</text>
          <text x="380" y="275" fill="#bfc2c7" fontFamily="'JetBrains Mono', monospace" fontSize="11">-sin(θ)</text>

          <text x="220" y="305" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="11">0.000</text>
          <text x="300" y="305" fill="#bfc2c7" fontFamily="'JetBrains Mono', monospace" fontSize="11">sin(θ)</text>
          <text x="380" y="305" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="600">cos(θ)</text>
        </svg>
      )}

      {geometryType === 'waveform' && (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <rect width="600" height="375" fill="#0d0d0f" />
          
          {/* Subtle architectural nodes */}
          <rect x="70" y="110" width="130" height="80" rx="2" fill="#141417" stroke="#303036" strokeWidth="1" />
          <text x="85" y="135" fill="#ffffff" fontFamily="'Syne', sans-serif" fontSize="11" fontWeight="700">StudentProfile</text>
          <text x="85" y="155" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">- studentId: UUID</text>
          <text x="85" y="170" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">+ calculateGPA()</text>

          <rect x="250" y="80" width="140" height="90" rx="2" fill="#18181d" stroke="#bfc2c7" strokeWidth="1.2" />
          <text x="265" y="105" fill="#ffffff" fontFamily="'Syne', sans-serif" fontSize="11" fontWeight="700">&lt;&lt;interface&gt;&gt;</text>
          <text x="265" y="122" fill="#bfc2c7" fontFamily="'Syne', sans-serif" fontSize="11" fontWeight="600">GradingPolicy</text>
          <text x="265" y="145" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">+ evaluateWeight()</text>
          <text x="265" y="160" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">+ computeCredit()</text>

          <rect x="420" y="190" width="130" height="80" rx="2" fill="#141417" stroke="#303036" strokeWidth="1" />
          <text x="435" y="215" fill="#ffffff" fontFamily="'Syne', sans-serif" fontSize="11" fontWeight="700">TranscriptEngine</text>
          <text x="435" y="235" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">+ generateAudit()</text>
          <text x="435" y="250" fill="#a3a3a8" fontFamily="'JetBrains Mono', monospace" fontSize="8">+ verifyInvariants()</text>

          {/* Association connectors */}
          <path d="M 200 150 L 250 125" fill="none" stroke="#bfc2c7" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M 390 125 L 485 125 L 485 190" fill="none" stroke="rgba(191,194,199,0.6)" strokeWidth="1.2" />

          <text x="50" y="50" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.5">
            OOP_DOMAIN · ENCAPSULATED_ACADEMIC_SCHEMA
          </text>
          <text x="550" y="335" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="9" textAnchor="end">
            POLYMORPHIC_STRATEGY: DETERMINISTIC
          </text>
        </svg>
      )}

      {geometryType === 'monolith' && (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="monolithSheen" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#f5f5f5" />
              <stop offset="25%" stopColor="#bfc2c7" />
              <stop offset="50%" stopColor="#2c2c34" />
              <stop offset="75%" stopColor="#121215" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <radialGradient id="specularGlint" cx="40%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#bfc2c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="600" height="375" fill="#08080a" />

          {/* Monolith geometric prism */}
          <polygon points="300,45 420,110 420,290 300,340 180,290 180,110" fill="url(#monolithSheen)" stroke="#3a3a42" strokeWidth="1" />
          <polygon points="300,45 420,110 300,165 180,110" fill="#2a2a32" stroke="#4a4a55" strokeWidth="1" />
          <polygon points="300,165 420,110 420,290 300,340" fill="#141418" stroke="#33333c" strokeWidth="1" />
          <polygon points="300,165 180,110 180,290 300,340" fill="url(#monolithSheen)" stroke="#555562" strokeWidth="1" />

          {/* Glint */}
          <circle cx="280" cy="140" r="45" fill="url(#specularGlint)" />

          {/* Editorial label */}
          <text x="30" y="45" fill="#bfc2c7" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="2">
            RESEARCH LAB · SDF_RAYMARCHING
          </text>
          <text x="30" y="62" fill="#6e6e76" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            60 FPS PROCEDURAL ANISOTROPIC SHADING
          </text>
        </svg>
      )}
    </div>
  );
};
