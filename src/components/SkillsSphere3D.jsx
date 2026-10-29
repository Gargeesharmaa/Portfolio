import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

export default function SkillsSphere3D({ theme = 'dark' }) {
  const mountRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const [selectedSkill, setSelectedSkill] = useState({
    name: 'LangGraph',
    category: 'Agentic AI & Orchestration',
    role: 'Core state-graph framework for cyclic multi-step reasoning, doc grading, and query rewriting.',
    projects: ['Agentic-RAG Platform']
  });

  const skillsList = [
    { name: 'LangGraph', cat: 'Agentic AI', color: 0x00f5ff, role: 'Cyclic state graph orchestration and persistent agent sessions.', proj: 'Agentic-RAG' },
    { name: 'FastAPI', cat: 'Backend & APIs', color: 0x10b981, role: 'High-throughput async backend with strict Pydantic contract validation.', proj: 'Laya Triage' },
    { name: 'ChromaDB', cat: 'Vector Store', color: 0x38bdf8, role: 'Metadata-filtered vector search with global similarity fallback.', proj: 'Agentic-RAG' },
    { name: 'Docker', cat: 'DevOps', color: 0x60a5fa, role: 'Multi-container orchestration, compose environments, and CI builds.', proj: 'Both Systems' },
    { name: 'Python', cat: 'Core Language', color: 0xfacc15, role: 'Production implementation language across all LLM systems.', proj: 'Core Stack' },
    { name: 'RAGAS', cat: 'Evaluation', color: 0xa855f7, role: 'Automated evaluation harness: Faithfulness 0.89, Context Precision 0.80.', proj: 'Agentic-RAG' },
    { name: 'Llama 3.3', cat: 'LLM Inference', color: 0xf43f5e, role: 'Ultra-fast cloud inference via Groq for ambiguous SRE decisions.', proj: 'Laya Triage' },
    { name: 'PostgreSQL', cat: 'State Database', color: 0x06b6d4, role: 'LangGraph state checkpointing for auditable, replayable traces.', proj: 'Agentic-RAG' },
    { name: 'Corrective RAG', cat: 'Pattern', color: 0x34d399, role: 'LLM document grader triggers autonomous query rewriting on poor chunks.', proj: 'Agentic-RAG' },
    { name: 'Tool-Calling', cat: 'Agentic AI', color: 0x818cf8, role: 'Exposing custom RAG pipelines as deterministic agent tools.', proj: 'Agentic-RAG' },
    { name: 'LangSmith', cat: 'Observability', color: 0xfb923c, role: 'Execution tracing, latency profiling, and token tracking.', proj: 'Agentic-RAG' },
    { name: 'Pydantic', cat: 'Data Validation', color: 0xe879f9, role: 'Strict schema enforcement on incoming Grafana webhooks.', proj: 'Laya Triage' },
    { name: 'CI/CD Actions', cat: 'Automation', color: 0x4ade80, role: 'Automated linting, container builds, and test runs.', proj: 'Laya Triage' },
    { name: 'Guardrails', cat: 'Safety & Latency', color: 0xf87171, role: 'Calibrated confidence gate (0.75 cutoff) cutting latency ~50x.', proj: 'Laya Triage' }
  ];

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Inner wireframe sphere
    const wireGeo = new THREE.SphereGeometry(2.6, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === 'dark' ? 0x1e293b : 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireSphere);

    // Distribute skills along Fibonacci Sphere
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const sphereRadius = 2.8;
    const nodeMeshes = [];

    skillsList.forEach((skill, i) => {
      const y = 1 - (i / (skillsList.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x, y, z).multiplyScalar(sphereRadius);

      // Sphere node
      const nodeGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: skill.color
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { skillData: skill, index: i };
      group.add(nodeMesh);

      // Connecting line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.25
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);

      nodeMeshes.push(nodeMesh);
    });

    // Mouse / Touch Dragging
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVelocity = { x: 0.002, y: 0.004 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      isDragging = true;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: cx, y: cy };
    };

    const onPointerMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = cx - prevMouse.x;
        const deltaY = cy - prevMouse.y;
        rotVelocity = { x: deltaY * 0.005, y: deltaX * 0.005 };
        group.rotation.y += rotVelocity.y;
        group.rotation.x += rotVelocity.x;
        prevMouse = { x: cx, y: cy };
      }

      const rect = container.getBoundingClientRect();
      mouse.x = ((cx - rect.left) / width) * 2 - 1;
      mouse.y = -((cy - rect.top) / height) * 2 + 1;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX;
      const cy = e.clientY;
      mouse.x = ((cx - rect.left) / width) * 2 - 1;
      mouse.y = -((cy - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const clickedData = intersects[0].object.userData.skillData;
        if (clickedData) {
          setSelectedSkill({
            name: clickedData.name,
            category: clickedData.cat,
            role: clickedData.role,
            projects: [clickedData.proj]
          });
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Auto-rotation when not dragging
      if (!isDragging) {
        group.rotation.y += rotVelocity.y;
        group.rotation.x += rotVelocity.x;
        rotVelocity.x *= 0.96;
        rotVelocity.y *= 0.96;
        if (Math.abs(rotVelocity.y) < 0.002) rotVelocity.y = 0.003;
      }

      // Check theme updates
      const isDark = themeRef.current === 'dark';
      wireMat.color.setHex(isDark ? 0x1e293b : 0x94a3b8);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="rounded-3xl dark:bg-[#090d16]/90 bg-white/90 border dark:border-slate-800/90 border-slate-200/90 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-colors">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: 3D Interactive Canvas */}
        <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[400px]">
          <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-xs font-mono dark:text-cyan-400 text-cyan-700 dark:bg-slate-900/80 bg-white/90 px-2.5 py-1 rounded-lg border dark:border-slate-800 border-slate-200 shadow-sm">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive 3D Quantum Tag Sphere</span>
          </div>

          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            aria-label="3D Interactive skills globe. Click and drag to spin."
          />

          <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-mono dark:text-slate-500 text-slate-500">
            Drag to rotate in 3D • Click any node to inspect
          </div>
        </div>

        {/* Right: Selected Skill Hologram Readout */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/20 border-cyan-300 text-xs font-mono dark:text-cyan-400 text-cyan-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selected Competency</span>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold dark:text-white text-slate-900 tracking-tight flex items-center gap-3">
              <span>{selectedSkill.name}</span>
            </h3>
            <span className="text-xs font-mono dark:text-emerald-400 text-emerald-700 block mt-1 font-semibold">
              Category: {selectedSkill.category}
            </span>
          </div>

          <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed dark:bg-slate-900/60 bg-slate-50 p-4 rounded-xl border dark:border-slate-800/80 border-slate-200 font-sans">
            {selectedSkill.role}
          </p>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono dark:text-slate-400 text-slate-500 block">
              Applied in Production Systems:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSkill.projects.map((proj) => (
                <span
                  key={proj}
                  className="px-3 py-1 rounded-lg dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-300 dark:text-emerald-300 text-emerald-800 text-xs font-mono font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 dark:text-emerald-400 text-emerald-600" />
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
