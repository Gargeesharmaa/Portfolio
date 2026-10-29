import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberGridBackground3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.038);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Dynamic 3D Cyber Perspective Grid Floor
    const gridHelper = new THREE.GridHelper(120, 60, 0x00f5ff, 0x1e293b);
    gridHelper.position.y = -6;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    scene.add(gridHelper);

    // Ceiling Inverted Grid for Infinite Spatial Corridor
    const ceilingGrid = new THREE.GridHelper(120, 60, 0xa855f7, 0x0f172a);
    ceilingGrid.position.y = 14;
    ceilingGrid.material.transparent = true;
    ceilingGrid.material.opacity = 0.2;
    scene.add(ceilingGrid);

    // Floating 3D Geometric Objects (Wireframe Polyhedra)
    const polyGroup = new THREE.Group();
    scene.add(polyGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.TorusGeometry(1.6, 0.15, 16, 50),
      new THREE.OctahedronGeometry(1.8, 0),
      new THREE.RingGeometry(1.2, 1.4, 32),
      new THREE.DodecahedronGeometry(1.2, 0)
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.25 })
    ];

    const floatingObjects = [];
    for (let i = 0; i < 16; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 16 + 2,
        (Math.random() - 0.5) * 30 - 5
      );

      polyGroup.add(mesh);
      floatingObjects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        initialY: mesh.position.y,
        floatSpeed: 0.8 + Math.random() * 0.8
      });
    }

    // Glowing Particle Dust Stream
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 50;
      dustPos[i + 1] = (Math.random() - 0.5) * 25 + 2;
      dustPos[i + 2] = (Math.random() - 0.5) * 45;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Mouse & Scroll Physics
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

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Animate grid moving forward (infinite run)
      gridHelper.position.z = (time * 2.5) % 2;
      ceilingGrid.position.z = (time * 1.8) % 2;

      // Camera adapts to scroll position and mouse tilt
      const scrollProgress = scrollY / Math.max(1, document.body.scrollHeight - height);
      camera.position.x = mouse.x * 3.5;
      camera.position.y = 4 - scrollProgress * 6 + mouse.y * 1.5;
      camera.position.z = 18 - scrollProgress * 8;
      camera.rotation.z = mouse.x * 0.03;
      camera.rotation.y = -mouse.x * 0.08;

      // Animate floating geometric objects
      floatingObjects.forEach((obj, idx) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.mesh.position.y = obj.initialY + Math.sin(time * obj.floatSpeed + idx) * 0.4;
      });

      // Dust slow orbit
      dustParticles.rotation.y = time * 0.02;

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

