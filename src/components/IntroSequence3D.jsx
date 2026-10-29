import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Terminal, Sparkles, ArrowRight, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export default function IntroSequence3D({ onComplete }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('BOOTING AGENTIC RUNTIME...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Group for all rotating core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Holographic Core (Dual Geodesic Lattice)
    const outerGeo = new THREE.IcosahedronGeometry(7.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const outerCore = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCore);

    const innerGeo = new THREE.OctahedronGeometry(4.5, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Concentric Multi-Axis Gyroscopic Rings (Agentic State Orbits)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.08, 12, 80), ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(15.5, 0.08, 12, 90), ringMat2);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(19, 0.08, 12, 100), ringMat3);
    ring3.rotation.x = -Math.PI / 5;
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // 3. Orbiting Data Beacon Nodes on Rings
    const beaconCount = 6;
    const beacons = [];
    const beaconGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const beaconColors = [0x22d3ee, 0x34d399, 0xa78bfa, 0x38bdf8, 0x10b981, 0x67e8f9];

    for (let i = 0; i < beaconCount; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: beaconColors[i] });
      const mesh = new THREE.Mesh(beaconGeo, mat);
      mesh.userData = {
        radius: 12 + (i % 3) * 3.5,
        speed: (0.8 + (i % 3) * 0.4) * (i % 2 === 0 ? 1 : -1),
        phase: (i * Math.PI * 2) / beaconCount,
        ringIdx: i % 3
      };
      scene.add(mesh);
      beacons.push(mesh);
    }

    // 4. Smooth Circular Glowing Light Photons (Smooth Radial Texture - ZERO square boxes)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(34, 211, 238, 0.95)');
      grad.addColorStop(0.55, 'rgba(16, 185, 129, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const photonCount = 160;
    const photonGeo = new THREE.BufferGeometry();
    const photonPos = new Float32Array(photonCount * 3);
    const photonOrig = [];

    for (let i = 0; i < photonCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 30;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      photonPos[i * 3] = x;
      photonPos[i * 3 + 1] = y;
      photonPos[i * 3 + 2] = z;

      photonOrig.push({ x, y, z, speed: 0.6 + Math.random() * 1.4, offset: Math.random() * Math.PI * 2 });
    }

    photonGeo.setAttribute('position', new THREE.BufferAttribute(photonPos, 3));

    const photonMat = new THREE.PointsMaterial({
      map: createCircleTexture(),
      size: 1.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const photonField = new THREE.Points(photonGeo, photonMat);
    scene.add(photonField);

    // 5. Floor Cyber Grid Horizon
    const gridHelper = new THREE.GridHelper(160, 48, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -18;
    scene.add(gridHelper);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 5;
      targetCameraY = -mouseY * 3.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animationId;
    let clock = new THREE.Clock();
    let isWarpingOut = false;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate central core
      outerCore.rotation.x = time * 0.4;
      outerCore.rotation.y = time * 0.6;
      innerCore.rotation.x = -time * 0.5;
      innerCore.rotation.y = -time * 0.7;

      // Pulse core scale gently
      const pulse = 1 + Math.sin(time * 3) * 0.05;
      innerCore.scale.setScalar(pulse);

      // Rotate gyroscopic rings at harmonic rates
      ring1.rotation.x = time * 0.45;
      ring1.rotation.y = time * 0.3;

      ring2.rotation.y = -time * 0.38;
      ring2.rotation.z = time * 0.32;

      ring3.rotation.x = -time * 0.28;
      ring3.rotation.z = -time * 0.42;

      // Update orbiting beacon nodes
      beacons.forEach((b) => {
        const { radius, speed, phase, ringIdx } = b.userData;
        const angle = time * speed + phase;
        if (ringIdx === 0) {
          b.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(angle * 2) * 2);
        } else if (ringIdx === 1) {
          b.position.set(Math.cos(angle) * radius, (Math.sin(angle) * radius) / 1.35, Math.sin(angle) * (radius / 1.35));
        } else {
          b.position.set((Math.cos(angle) * radius) / 1.3, Math.sin(angle) * radius, (Math.cos(angle) * radius) / 1.3);
        }
      });

      // Update soft glowing photons
      const positions = photonGeo.attributes.position.array;
      for (let i = 0; i < photonCount; i++) {
        const orig = photonOrig[i];
        positions[i * 3 + 1] = orig.y + Math.sin(time * orig.speed + orig.offset) * 1.8;
        positions[i * 3] = orig.x + Math.cos(time * 0.4 + orig.offset) * 1.2;
      }
      photonGeo.attributes.position.needsUpdate = true;
      photonField.rotation.y = time * 0.06;

      // Move grid horizon
      gridHelper.position.z = (time * 6) % (160 / 48);

      // Camera parallax interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Warp out animation when reaching 100%
      if (isWarpingOut) {
        coreGroup.scale.multiplyScalar(1.04);
        camera.position.z -= 1.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Staged HUD log updates
    const logs = [
      { at: 18, text: 'LANGGRAPH: INITIALIZING STATE GRAPH COMPILATION...' },
      { at: 42, text: 'RAGAS: BENCHMARK HARNESS CALIBRATED (FAITHFULNESS 0.89)...' },
      { at: 68, text: 'LAYA TRIAGE: FAST-PATH INFERENCE ACTIVE (42ms LATENCY)...' },
      { at: 88, text: 'MOUNTING NEURAL LATTICE & WORKSPACE...' },
      { at: 100, text: 'SYSTEM READY. WELCOME TO GARGEE SHARMA PORTFOLIO.' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const matchingLog = logs.find((l) => next >= l.at);
        if (matchingLog) setStatusLog(matchingLog.text);

        if (next >= 100) {
          clearInterval(timer);
          isWarpingOut = true;
          setTimeout(() => {
            finishIntro();
          }, 450);
          return 100;
        }
        return next;
      });
    }, 45);

    const finishIntro = () => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030712] transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Quantum Gyroscopic Canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Cybernetic HUD Terminal Overlay */}
      <div className="relative z-10 max-w-lg w-full mx-4 p-6 sm:p-8 rounded-3xl bg-[#090d18]/92 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              AGENTIC RUNTIME v2.4
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all flex items-center gap-1 hover:scale-105"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 font-mono">
          <div>
            <div className="text-base sm:text-lg font-black text-white tracking-wide flex items-center gap-2">
              <span>GARGEE SHARMA</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="text-xs text-cyan-400 font-semibold mt-0.5">
              Agentic AI & GenAI Engineer
            </div>
          </div>

          <div className="text-[11px] text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono flex items-center gap-2.5 shadow-inner">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
            <span className="truncate">{statusLog}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Loading 3D Spatial Environment
            </span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-75 shadow-sm shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80">
          <span>LangGraph • ChromaDB • FastAPI • RAGAS</span>
          <span>B.Tech IT '28</span>
        </div>
      </div>
    </div>
  );
}
