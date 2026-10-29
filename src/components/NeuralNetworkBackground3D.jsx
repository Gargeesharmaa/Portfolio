import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralNetworkBackground3D({ theme = 'dark' }) {
  const mountRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const isDark = themeRef.current === 'dark';

    // Atmospheric Fog
    scene.fog = new THREE.FogExp2(isDark ? 0x030712 : 0xf8fafc, 0.02);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 4, 32);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Perspective Horizon Grid (Subtle Dimensional Plane)
    const gridHelper = new THREE.GridHelper(
      180,
      40,
      isDark ? 0x0891b2 : 0x0284c7,
      isDark ? 0x1e293b : 0xe2e8f0
    );
    gridHelper.position.y = -12;
    scene.add(gridHelper);

    // 2. Soft Circular Photons (Canvas Radial Gradient - Zero harsh lines or boxes)
    const makePhotonSprite = (dark) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      if (dark) {
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.25, 'rgba(34, 211, 238, 0.8)');
        grad.addColorStop(0.6, 'rgba(16, 185, 129, 0.25)');
        grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      } else {
        grad.addColorStop(0, 'rgba(2, 132, 199, 0.9)');
        grad.addColorStop(0.3, 'rgba(14, 165, 233, 0.6)');
        grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.2)');
        grad.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 25;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleData.push({
        x,
        y,
        z,
        speed: 0.4 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isDark ? 1.6 : 1.3,
      map: makePhotonSprite(isDark),
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 4;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = mouseX * 4;
      targetY = 4 - mouseY * 2.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth grid scrolling
      gridHelper.position.z = (time * 4) % (180 / 40);

      // Organic gentle particle motion
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        positions[i * 3 + 1] = p.y + Math.sin(time * p.speed + p.offset) * 1.5;
        positions[i * 3] = p.x + Math.cos(time * 0.3 + p.offset) * 1.0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth camera lerp
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
