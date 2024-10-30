import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white for contrast

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 100, 300); // Move camera farther away to fit the model

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    mount.appendChild(renderer.domElement);

    // Add lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 50); // Adjust light position
    directionalLight.castShadow = true; // Enable shadow casting from the light
    scene.add(directionalLight);

    // Configure shadow properties for the light
    directionalLight.shadow.mapSize.width = 2048; // Increase shadow map resolution for better quality
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 1000;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;

    // Create a helper for the shadow camera (optional for debugging shadows)
    const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(shadowCameraHelper);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Create a plane to receive shadows
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Make the plane horizontal
    plane.position.set(0, -10, 0); // Place the plane slightly below the model
    plane.receiveShadow = true; // Enable shadow receiving on the plane
    scene.add(plane);

    // Load the STL model
    const loader = new STLLoader();
    loader.load('/model4.stl', (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.5, roughness: 0.3 });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.scale.set(0.1, 0.1, 0.1); // Scale down the model if necessary
      mesh.position.set(0, 0, 0); // Adjust position if needed
      mesh.castShadow = true; // Enable shadow casting on the model
      mesh.receiveShadow = true; // Ensure model can receive shadows (optional)
      scene.add(mesh);

      geometry.center(); // Center the model in the scene
    });

    // Set camera position
    camera.position.z = 150;

    // OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default ModelViewer;
