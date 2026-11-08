import React, { useEffect, useRef, useState } from 'react';

interface MetallicCanvasProps {
  className?: string;
  isIntro?: boolean;
  introPhase?: 'darkness' | 'reveal' | 'typography' | 'transition';
  interactive?: boolean;
}

export const MetallicCanvas: React.FC<MetallicCanvasProps> = ({
  className = '',
  isIntro = false,
  introPhase = 'reveal',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const mousePos = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = Math.max(-1, Math.min(1, x));
      mousePos.current.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize WebGL
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setHasWebGLError(true);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Procedural Metallic Raymarched Sculpture
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_reveal;
      uniform float u_introPhase;

      // 2D Rotation matrix
      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      // Signed Distance Field for an abstract sculptural metallic Möbius ribbon
      float map(vec3 p) {
        // Subtle tilt and rotation
        p.yz *= rot(0.35 + u_mouse.y * 0.35);
        p.xz *= rot(u_time * 0.22 + u_mouse.x * 0.5);

        // Sculptural folding
        vec3 q = p;
        float twist = q.y * 0.6 + u_time * 0.15;
        q.xz *= rot(twist);

        // Core Torus Knot / Ribbon geometry
        float r1 = 1.35;
        float r2 = 0.38 + 0.08 * sin(p.y * 2.5 + u_time * 0.4);
        vec2 cp = vec2(length(q.xz) - r1, q.y);
        float d1 = length(cp) - r2;

        // Metallic bevel cuts
        float dCut = abs(q.x) - 0.7;
        float d = max(d1, -dCut * 0.4);

        // Secondary subtle counter-ring
        vec3 p2 = p;
        p2.xy *= rot(0.9);
        vec2 cp2 = vec2(length(p2.yz) - 1.6, p2.x);
        float d2 = length(cp2) - 0.09;

        return min(d, d2);
      }

      // Estimate surface normal via gradient
      vec3 calcNormal(vec3 p) {
        vec2 e = vec2(0.003, -0.003);
        return normalize(
          e.xyy * map(p + e.xyy) +
          e.yyx * map(p + e.yyx) +
          e.yxy * map(p + e.yxy) +
          e.xxx * map(p + e.xxx)
        );
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Camera setup
        vec3 ro = vec3(0.0, 0.1, 4.3);
        vec3 rd = normalize(vec3(uv, -1.8));

        // Raymarching loop
        float t = 0.0;
        float hit = 0.0;
        for (int i = 0; i < 64; i++) {
          vec3 p = ro + rd * t;
          float d = map(p);
          if (d < 0.002) {
            hit = 1.0;
            break;
          }
          t += d * 0.78;
          if (t > 9.0) break;
        }

        // Background: deep graphite with soft radial vignette
        float bgRad = length(uv);
        vec3 col = mix(vec3(0.035, 0.035, 0.038), vec3(0.015, 0.015, 0.018), bgRad * 0.9);

        // Ambient spotlight on backdrop
        float spotlight = max(0.0, 1.0 - bgRad * 1.1) * 0.14 * u_reveal;
        col += vec3(0.75, 0.76, 0.8) * spotlight;

        if (hit > 0.5) {
          vec3 p = ro + rd * t;
          vec3 n = calcNormal(p);

          // Controlled studio light sources
          vec3 light1Pos = vec3(2.5, 3.5, 3.0);
          vec3 l1 = normalize(light1Pos - p);
          vec3 light2Pos = vec3(-3.2, -2.0, 2.0);
          vec3 l2 = normalize(light2Pos - p);

          // Diffuse
          float diff1 = max(dot(n, l1), 0.0);
          float diff2 = max(dot(n, l2), 0.0) * 0.45;

          // Specular highlights (High gloss metallic reflection)
          vec3 ref = reflect(rd, n);
          float spec1 = pow(max(dot(ref, l1), 0.0), 38.0);
          float spec2 = pow(max(dot(ref, l2), 0.0), 22.0);

          // Metallic Fresnel rim light
          float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.2);

          // Base metallic material palette (brushed chrome and graphite)
          vec3 metalBase = vec3(0.12, 0.12, 0.14);
          vec3 silverHighlight = vec3(0.78, 0.80, 0.84);
          vec3 pureChrome = vec3(0.98, 0.99, 1.0);

          // Composite lighting
          vec3 metalCol = metalBase * 0.35;
          metalCol += diff1 * silverHighlight * 0.65;
          metalCol += diff2 * vec3(0.35, 0.36, 0.4);
          metalCol += spec1 * pureChrome * 1.25;
          metalCol += spec2 * silverHighlight * 0.7;
          metalCol += fresnel * pureChrome * 0.9;

          // Anisotropic metallic grain line variation
          float grain = sin(p.y * 120.0 + p.x * 60.0) * 0.025;
          metalCol += grain * silverHighlight;

          // Apply intro phase reveal curve
          col = mix(col, metalCol, u_reveal);
        }

        // Controlled contrast and subtle silver tint
        col = pow(col, vec3(0.95));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) {
      setHasWebGLError(true);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    const program = gl.createProgram();
    if (!program) {
      setHasWebGLError(true);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      setHasWebGLError(true);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    // Geometry quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uRevealLoc = gl.getUniformLocation(program, 'u_reveal');
    const uPhaseLoc = gl.getUniformLocation(program, 'u_introPhase');

    // Resize handler
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // Render loop
    let animId: number;
    let startTime = performance.now();
    let currentReveal = isIntro ? (introPhase === 'darkness' ? 0.05 : 0.85) : 1.0;

    const render = (now: number) => {
      resizeCanvas();
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Reveal interpolation depending on intro phase
      let targetReveal = 1.0;
      let phaseCode = 2.0;

      if (isIntro) {
        if (introPhase === 'darkness') {
          targetReveal = 0.08;
          phaseCode = 0.0;
        } else if (introPhase === 'reveal') {
          targetReveal = 0.95;
          phaseCode = 1.0;
        } else if (introPhase === 'typography') {
          targetReveal = 1.0;
          phaseCode = 2.0;
        } else if (introPhase === 'transition') {
          targetReveal = 0.35;
          phaseCode = 3.0;
        }
      }

      currentReveal += (targetReveal - currentReveal) * 0.06;

      gl.useProgram(program);

      gl.enableVertexAttribArray(aPosLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, prefersReducedMotion ? 1.0 : elapsed);
      gl.uniform2f(uMouseLoc, mousePos.current.x, mousePos.current.y);
      gl.uniform1f(uRevealLoc, currentReveal);
      gl.uniform1f(uPhaseLoc, phaseCode);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (posBuffer) gl.deleteBuffer(posBuffer);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
    };
  }, [isIntro, introPhase, interactive]);

  // Graceful 2D Canvas Fallback if WebGL is disabled or fails
  useEffect(() => {
    if (!hasWebGLError) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render2D = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      // Procedural metallic arcs fallback
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.3);

      const grad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      grad.addColorStop(0, '#111114');
      grad.addColorStop(0.35, '#bfc2c7');
      grad.addColorStop(0.7, '#242429');
      grad.addColorStop(1, '#e8eaed');

      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.restore();

      t += 0.02;
      animId = requestAnimationFrame(render2D);
    };

    animId = requestAnimationFrame(render2D);

    return () => cancelAnimationFrame(animId);
  }, [hasWebGLError]);

  return (
    <canvas
      ref={canvasRef}
      className={`metallic-sculpture-canvas ${className}`}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
};
