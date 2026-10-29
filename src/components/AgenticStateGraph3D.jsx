import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, RotateCcw, Pause, Sparkles, Info, Eye } from 'lucide-react';

export default function AgenticStateGraph3D() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulationState, setSimulationState] = useState('idle'); // idle, retrieving, grading, correcting, generating, persisted
  const simStateRef = useRef(simulationState);
  simStateRef.current = simulationState;

  // Graph Node Definitions based on Gargee's LangGraph State Architecture
  const graphNodes = [
    {
      id: 'input',
      title: 'User Query',
      type: 'Entry Point',
      color: 0x06b6d4, // Cyan
      pos: new THREE.Vector3(-2.6, 0.6, 0.2),
      desc: 'Incoming prompt ingested and parsed into initial LangGraph AgentState dictionary.',
      metric: 'Structured Input'
    },
    {
      id: 'retriever',
      title: 'ChromaDB Retriever',
      type: 'Tool / Action',
      color: 0x10b981, // Emerald
      pos: new THREE.Vector3(-1.0, 1.6, 0.6),
      desc: 'Metadata-filtered vector search (file path/filename) with global similarity fallback.',
      metric: 'Context Recall 0.67'
    },
    {
      id: 'grader',
      title: 'CRAG Doc Grader',
      type: 'LLM Evaluator',
      color: 0xf59e0b, // Amber
      pos: new THREE.Vector3(0.6, 1.1, -0.4),
      desc: 'LLM grades retrieved chunks for relevance to prevent hallucinations before synthesis.',
      metric: 'Context Precision 0.80'
    },
    {
      id: 'rewriter',
      title: 'Query Rewriter',
      type: 'Self-Correction Loop',
      color: 0xa855f7, // Purple
      pos: new THREE.Vector3(-0.4, -0.9, 0.8),
      desc: 'Autonomous query transformation triggered when retrievals fail quality threshold.',
      metric: 'Self-Healing Loop'
    },
    {
      id: 'generator',
      title: 'LLM Generator',
      type: 'Synthesis Node',
      color: 0x10b981, // Emerald
      pos: new THREE.Vector3(2.4, 0.3, 0.1),
      desc: 'Synthesizes grounded response using verified context chunks via OpenAI / Groq Llama 3.3.',
      metric: 'Faithfulness 0.89'
    },
    {
      id: 'checkpoint',
      title: 'Postgres Checkpointer',
      type: 'Auditable State',
      color: 0x3b82f6, // Blue
      pos: new THREE.Vector3(1.2, -1.4, -0.5),
      desc: 'Persistent state snapshot storage for auditable traces and session resumption.',
      metric: 'Replayable Traces'
    }
  ];

  // Graph Edges
  const graphEdges = [
    { from: 0, to: 1, label: 'Retrieve' },
    { from: 1, to: 2, label: 'Grade Chunks' },
    { from: 2, to: 4, label: 'Grounding Passed' },
    { from: 2, to: 3, label: 'Irrelevant (Trigger Rewrite)' },
    { from: 3, to: 1, label: 'Re-Retrieve with Transformed Query' },
    { from: 4, to: 5, label: 'Persist State & Trace' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d14, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group to hold all rotating elements
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Subtle Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 2.5, 20);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Meshes for Nodes
    const nodeMeshes = [];
    const sphereGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const ringGeo = new THREE.RingGeometry(0.32, 0.35, 32);

    graphNodes.forEach((node, idx) => {
      // Core sphere
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(node.pos);
      sphere.userData = { id: node.id, index: idx, nodeData: node };

      // Outer accent orbital ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(node.pos);
      ring.lookAt(camera.position);

      graphGroup.add(sphere);
      graphGroup.add(ring);
      nodeMeshes.push({ sphere, ring, initialPos: node.pos.clone(), data: node });
    });

    // Edges (Curved lines)
    const curvePoints = [];
    const edgeCurves = [];
    graphEdges.forEach((edge) => {
      const p1 = graphNodes[edge.from].pos;
      const p2 = graphNodes[edge.to].pos;
      
      // Calculate a midpoint arc
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const normal = new THREE.Vector3().crossVectors(
        new THREE.Vector3().subVectors(p2, p1),
        new THREE.Vector3(0, 0, 1)
      ).normalize().multiplyScalar(0.35);
      mid.add(normal);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      edgeCurves.push(curve);

      const points = curve.getPoints(30);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.45,
        linewidth: 1
      });
      const line = new THREE.Line(geometry, material);
      graphGroup.add(line);
    });

    // Traveling Data Packets (Particles traversing edges)
    const packetCount = 18;
    const packetGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packets = [];

    for (let i = 0; i < packetCount; i++) {
      const packetMesh = new THREE.Mesh(packetGeo, packetMat.clone());
      const edgeIndex = i % edgeCurves.length;
      graphGroup.add(packetMesh);
      packets.push({
        mesh: packetMesh,
        edgeIndex,
        progress: (i / packetCount) % 1,
        speed: 0.003 + Math.random() * 0.003
      });
    }

    // Subtle background floating neural lattice points
    const starCount = 120;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 16;
      starPositions[i + 1] = (Math.random() - 0.5) * 12;
      starPositions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x475569,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse / Touch Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0.1, y: 0.2 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Update raycaster
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;
        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.005;
        targetRotation.x = Math.max(-0.6, Math.min(0.6, targetRotation.x));
        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.sphere));
      if (intersects.length > 0) {
        const hitNode = intersects[0].object.userData.nodeData;
        setActiveNode(hitNode);
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth damped rotation
      graphGroup.rotation.y += (targetRotation.y - graphGroup.rotation.y) * 0.05;
      graphGroup.rotation.x += (targetRotation.x - graphGroup.rotation.x) * 0.05;

      // Gentle auto-rotation when not dragging
      if (!isDragging && isPlaying) {
        targetRotation.y += 0.0018;
      }

      // Animate node breathing & rings
      nodeMeshes.forEach((item, i) => {
        const floatOffset = Math.sin(time * 1.5 + i * 0.8) * 0.03;
        item.sphere.position.y = item.initialPos.y + floatOffset;
        item.ring.position.y = item.initialPos.y + floatOffset;
        item.ring.lookAt(camera.position);

        // Highlight selected node
        if (activeNode && activeNode.id === item.data.id) {
          item.sphere.material.emissiveIntensity = 1.2;
          item.ring.scale.setScalar(1.25 + Math.sin(time * 4) * 0.1);
        } else {
          item.sphere.material.emissiveIntensity = 0.6;
          item.ring.scale.setScalar(1.0);
        }
      });

      // Move data packets along edges
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
          pkt.edgeIndex = (pkt.edgeIndex + 1) % edgeCurves.length;
        }
        const curve = edgeCurves[pkt.edgeIndex];
        const pt = curve.getPoint(pkt.progress);
        pkt.mesh.position.copy(pt);

        // Packet color depending on edge
        if (pkt.edgeIndex === 3) {
          // Irrelevant rewrite edge
          pkt.mesh.material.color.setHex(0xa855f7);
        } else if (pkt.edgeIndex === 2) {
          // Passed evaluation
          pkt.mesh.material.color.setHex(0x10b981);
        } else {
          pkt.mesh.material.color.setHex(0x38bdf8);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Set initial active node to Doc Grader as a showcase
    setActiveNode(graphNodes[2]);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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
  }, [isPlaying]);

  // Handle Interactive Self-Correcting Cycle Simulation
  const triggerSimulation = () => {
    const states = [
      { key: 'input', label: '1. Ingesting User Query into State Graph...' },
      { key: 'retriever', label: '2. Querying ChromaDB with Metadata Filters...' },
      { key: 'grader', label: '3. LLM Grader evaluating chunk relevance (CRAG)...' },
      { key: 'rewriter', label: '4. Relevance below threshold: Rewriting Query...' },
      { key: 'retriever', label: '5. Second Pass: Retrieving with transformed query...' },
      { key: 'generator', label: '6. Grounding verified: Synthesizing answer...' },
      { key: 'checkpoint', label: '7. Persisting state snapshot to PostgreSQL.' }
    ];

    let step = 0;
    setSimulationState(states[0].key);
    setActiveNode(graphNodes[0]);

    const interval = setInterval(() => {
      step++;
      if (step < states.length) {
        const nextState = states[step];
        setSimulationState(nextState.key);
        const node = graphNodes.find(n => n.id === nextState.key);
        if (node) setActiveNode(node);
      } else {
        clearInterval(interval);
        setTimeout(() => setSimulationState('idle'), 2000);
      }
    }, 1200);
  };

  return (
    <div className="relative w-full h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-slate-800 bg-[#090d16] flex flex-col">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-5 py-3.5 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wider text-slate-300 uppercase">
            LangGraph State-Graph Orchestrator
          </span>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Interactive 3D
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors border border-slate-700/50"
            title={isPlaying ? "Pause Rotation" : "Resume Rotation"}
            aria-label={isPlaying ? "Pause 3D rotation" : "Resume 3D rotation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={triggerSimulation}
            disabled={simulationState !== 'idle'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
              simulationState !== 'idle'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 cursor-wait'
                : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{simulationState !== 'idle' ? 'Cycle Executing...' : 'Simulate CRAG Cycle'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        tabIndex="0"
        role="region"
        aria-label="Interactive 3D LangGraph state machine visualization with interactive nodes representing user input, document retrieval, evaluation, self-correction, and synthesis"
      />

      {/* Floating State Inspector Card (Displays details of hovered/clicked node) */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-10 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-2xl transition-all">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: `#${activeNode.color.toString(16).padStart(6, '0')}` }} 
                />
                <h4 className="text-sm font-semibold text-white tracking-wide">{activeNode.title}</h4>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {activeNode.type}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
              {activeNode.metric}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {activeNode.desc}
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="w-3 h-3 text-cyan-400" /> Click any node or drag to rotate
            </span>
            <span className="text-slate-400">LangGraph v0.2 State Node</span>
          </div>
        </div>
      )}

      {/* Simulation Banner when running */}
      {simulationState !== 'idle' && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/50 shadow-xl backdrop-blur-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono text-amber-300 font-medium">
            Simulating self-correction state transition...
          </span>
        </div>
      )}
    </div>
  );
}

