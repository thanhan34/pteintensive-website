"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js animated background for the Hero section.
 * - Particle field (floating dots) in brand-friendly warm whites
 * - Floating wireframe geometric shapes (icosahedron, torus, octahedron)
 * - Mouse parallax camera movement
 * Colors stay within the existing orange brand palette.
 */
export default function HeroThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // --- Scene / Camera / Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    container.appendChild(renderer.domElement);

    // --- Particles ---
    const particleCount = 350;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
      speeds[i] = 0.002 + Math.random() * 0.006;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Floating wireframe shapes (brand tones) ---
    const shapes: THREE.Mesh[] = [];
    const shapeConfigs: {
      geometry: THREE.BufferGeometry;
      position: [number, number, number];
      color: number;
      opacity: number;
      scale: number;
    }[] = [
      {
        geometry: new THREE.IcosahedronGeometry(1.6, 0),
        position: [7, 2.5, -4],
        color: 0xffffff,
        opacity: 0.22,
        scale: 1.4,
      },
      {
        geometry: new THREE.TorusGeometry(1.2, 0.35, 10, 40),
        position: [-8, -2.5, -5],
        color: 0xfedac2,
        opacity: 0.28,
        scale: 1.2,
      },
      {
        geometry: new THREE.OctahedronGeometry(1.1, 0),
        position: [-6.5, 3.5, -6],
        color: 0xffffff,
        opacity: 0.18,
        scale: 1,
      },
      {
        geometry: new THREE.TorusKnotGeometry(0.8, 0.25, 60, 10),
        position: [8, -3.2, -6],
        color: 0xfedac2,
        opacity: 0.22,
        scale: 1,
      },
      {
        geometry: new THREE.DodecahedronGeometry(0.8, 0),
        position: [0, 4.6, -8],
        color: 0xffffff,
        opacity: 0.15,
        scale: 1,
      },
    ];

    shapeConfigs.forEach((cfg) => {
      const material = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: cfg.opacity,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(cfg.geometry, material);
      mesh.position.set(...cfg.position);
      mesh.scale.setScalar(cfg.scale);
      mesh.userData.rotSpeed = {
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.006,
      };
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      mesh.userData.baseY = cfg.position[1];
      scene.add(mesh);
      shapes.push(mesh);
    });

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Resize ---
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // --- Animation loop ---
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Drift particles upward, wrap around
        const pos = particleGeometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += speeds[i];
          if (pos[i * 3 + 1] > 13) pos[i * 3 + 1] = -13;
        }
        particleGeometry.attributes.position.needsUpdate = true;
        particles.rotation.y = t * 0.02;

        // Rotate & float shapes
        shapes.forEach((mesh) => {
          mesh.rotation.x += mesh.userData.rotSpeed.x;
          mesh.rotation.y += mesh.userData.rotSpeed.y;
          mesh.position.y =
            mesh.userData.baseY +
            Math.sin(t * 0.5 + mesh.userData.floatOffset) * 0.5;
        });

        // Smooth camera parallax
        target.x += (mouse.x * 1.2 - target.x) * 0.03;
        target.y += (mouse.y * 0.8 - target.y) * 0.03;
        camera.position.x = target.x;
        camera.position.y = target.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      particleGeometry.dispose();
      particleMaterial.dispose();
      shapes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
