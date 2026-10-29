import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WorldBackground3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.045);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // Keep it high fps
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle Cloud Geometry
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x38bdf8), // Light Blue
      new THREE.Color(0x1e293b)  // Deep slate accent
    ];

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / spherical cloud spread
      const radius = 8 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 45;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      // Color pick
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material with Soft Circular Point Texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(56,189,248,0.8)');
    grad.addColorStop(0.8, 'rgba(16,185,129,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Central Agent Constellation (Connecting line filaments)
    const lineCount = 180;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount * 6; i += 6) {
      const p1Index = Math.floor(Math.random() * 200) * 3;
      const p2Index = Math.floor(Math.random() * 200) * 3;

      linePositions[i] = positions[p1Index];
      linePositions[i + 1] = positions[p1Index + 1];
      linePositions[i + 2] = positions[p1Index + 2];

      linePositions[i + 3] = positions[p2Index];
      linePositions[i + 4] = positions[p2Index + 1];
      linePositions[i + 5] = positions[p2Index + 2];
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);

    // Mouse Tracking & Gravitational Lens
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = -(e.clientY / height) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Camera responds to scroll depth & mouse tilt
      const scrollProgress = scrollY / Math.max(1, document.body.scrollHeight - height);
      camera.position.y = -scrollY * 0.015;
      camera.position.x = mouse.x * 2.5;
      camera.position.z = 24 - Math.sin(scrollProgress * Math.PI) * 4;
      camera.rotation.z = mouse.x * 0.04;
      camera.rotation.x = -mouse.y * 0.05 + scrollProgress * 0.3;

      // Rotate particle systems slowly
      particles.rotation.y = time * 0.04 + mouse.x * 0.2;
      particles.rotation.x = time * 0.02 + mouse.y * 0.1;
      networkLines.rotation.y = time * 0.035 + mouse.x * 0.2;

      // Gentle wave deformation on particle positions
      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;
      for (let i = 0; i < particleCount; i += 4) {
        const idx = i * 3;
        const bx = basePositions[idx];
        const by = basePositions[idx + 1];
        const bz = basePositions[idx + 2];

        // Wave formula
        posArr[idx] = bx + Math.sin(time * 0.8 + by * 0.1) * 0.4;
        posArr[idx + 1] = by + Math.cos(time * 0.8 + bx * 0.1) * 0.4;
        posArr[idx + 2] = bz + Math.sin(time * 0.5 + idx) * 0.3;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}

