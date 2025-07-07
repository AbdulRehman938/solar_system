import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import Sun from '../componets/Sun.jsx';
import Earth from '../componets/Earth.jsx';
import Jupiter from '../componets/Jupiter.jsx';
import Mars from '../componets/Mars.jsx';
import Mercury from '../componets/Murcury.jsx';
import Neptune from '../componets/Neptune.jsx';
import Saturn from '../componets/Saturn.jsx';
import Uranus from '../componets/Uranus.jsx';
import Venus from '../componets/Venus.jsx';

const getTextureUrl = (fileName) => `/textures/${fileName}`;


const Home = () => {
    const mountRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [showPlanetCopy, setShowPlanetCopy] = useState(false);
    const planetCopyRef = useRef(null);
    const planetCopySceneRef = useRef(null);
    const planetCopyRendererRef = useRef(null);
    const planetCopyAnimationRef = useRef(null);
    const guiRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const planetsDataRef = useRef([]);
    const planetsMeshesRef = useRef([]);
    const sunRef = useRef(null);
    const ambientLightRef = useRef(null);
    const animationFrameId = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const cameraOffset = useRef(new THREE.Vector3());

    const defaultSettings = {
        revolutionSpeed: 0.1,
        rotationSpeed: 0.005,
        lightIntensity: 1.2,
    };
    const settings = useRef({ ...defaultSettings });

    const getPlanetData = useCallback((name) => {
        const data = planetsDataRef.current.find(p => p.name === name);
        if (name === 'Sun') {
            return {
                name: 'Sun',
                size: 10,
                selfRotationSpeed: 0.002,
                texture: getTextureUrl('sun.jpg'),
                description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.'
            };
        }
        return data;
    }, []);


    useEffect(() => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(150, 150, 100);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.8;
        controls.panSpeed = 0.8;
        controls.minDistance = 10;
        controls.maxDistance = 1000;
        controls.target.set(0, 0, 0);
        controls.update();
        controlsRef.current = controls;

        renderer.domElement.style.cursor = 'grab';
        controls.addEventListener('start', () => {
            renderer.domElement.style.cursor = 'grabbing';
        });
        controls.addEventListener('end', () => {
            renderer.domElement.style.cursor = 'grab';
        });

        const gui = new dat.GUI({ width: 250 });
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '20px';
        gui.domElement.style.right = '20px';
        gui.domElement.style.zIndex = '99';
        gui.domElement.style.transition = 'all 0.5s ease-in-out';
        gui.hide();
        guiRef.current = gui;

        gui.add(settings.current, 'revolutionSpeed', 0, 0.5, 0.001).name('Revolution Speed');
        gui.add(settings.current, 'rotationSpeed', 0, 0.1, 0.001).name('Self-Rotation Speed');
        gui.add(settings.current, 'lightIntensity', 0, 5, 0.1).name('Ambient Light').onChange((value) => {
            if (ambientLightRef.current) {
                ambientLightRef.current.intensity = value;
            }
        });

        gui.add({
            reset: () => {
                settings.current.revolutionSpeed = defaultSettings.revolutionSpeed;
                settings.current.rotationSpeed = defaultSettings.rotationSpeed;
                settings.current.lightIntensity = defaultSettings.lightIntensity;
                gui.__controllers.forEach(controller => {
                    controller.setValue(defaultSettings[controller.property]);
                });
            }
        }, 'reset').name('🔁 Reset Settings');

        const ambient = new THREE.AmbientLight(0xffffff, settings.current.lightIntensity);
        scene.add(ambient);
        ambientLightRef.current = ambient;

        const pointLight = new THREE.PointLight(0xffffff, 5, 1000);
        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);

        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            setLoading(false);
            gui.show();
        };

        const loader = new THREE.TextureLoader(manager);

        const bgSphere = new THREE.Mesh(
            new THREE.SphereGeometry(1000, 64, 64),
            new THREE.MeshBasicMaterial({
                map: loader.load('/textures/milkyWay.jpeg'),
                side: THREE.BackSide,
            })
        );
        scene.add(bgSphere);

        planetsDataRef.current = [
            { name: 'Sun', size: 10, selfRotationSpeed: 0.002, texture: '/textures/sun.jpg', description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.' },
            { name: 'Mercury', size: 1, distance: 20, revolutionSpeed: 0.01, selfRotationSpeed: 0.015, texture: '/textures/mercury.jpg', description: 'Mercury is the smallest planet...' },
            { name: 'Venus', size: 1.5, distance: 30, revolutionSpeed: 0.008, selfRotationSpeed: 0.005, texture: '/textures/venus.jpg', description: 'Venus is the second planet...' },
            { name: 'Earth', size: 1.7, distance: 40, revolutionSpeed: 0.007, selfRotationSpeed: 0.01, texture: '/textures/earth.jpg', description: 'Earth is the third planet...' },
            { name: 'Mars', size: 1.3, distance: 53, revolutionSpeed: 0.006, selfRotationSpeed: 0.009, texture: '/textures/mars.jpg', description: 'Mars is the fourth planet...' },
            { name: 'Jupiter', size: 4, distance: 65, revolutionSpeed: 0.004, selfRotationSpeed: 0.02, texture: '/textures/jupiter.jpg', description: 'Jupiter is the fifth planet...' },
            { name: 'Saturn', size: 3.5, distance: 85, revolutionSpeed: 0.003, selfRotationSpeed: 0.018, texture: '/textures/saturn.jpg', description: 'Saturn is the sixth planet...' },
            { name: 'Uranus', size: 2.5, distance: 100, revolutionSpeed: 0.002, selfRotationSpeed: 0.008, texture: '/textures/uranus.jpg', description: 'Uranus is the seventh planet...' },
            { name: 'Neptune', size: 2.4, distance: 110, revolutionSpeed: 0.0015, selfRotationSpeed: 0.007, texture: '/textures/neptune.jpg', description: 'Neptune is the eighth planet...' },
        ];

        const colorMap = {
            Mercury: 0xffddaa, Venus: 0xffcc99, Earth: 0x99ccff, Mars: 0xff6666,
            Jupiter: 0xffcc66, Saturn: 0xffe0aa, Uranus: 0xaaffff, Neptune: 0x6699ff,
        };

        const sunData = getPlanetData('Sun');
        const sunMesh = new THREE.Mesh(
            new THREE.SphereGeometry(sunData.size, 64, 64),
            new THREE.MeshBasicMaterial({ map: loader.load(sunData.texture) })
        );
        sunMesh.name = 'Sun';
        scene.add(sunMesh);
        sunRef.current = { mesh: sunMesh, data: sunData };

        const planets = [];

        planetsDataRef.current.filter(p => p.name !== 'Sun').forEach((planetData) => {
            const texture = loader.load(planetData.texture);
            const geometry = new THREE.SphereGeometry(planetData.size, 64, 64);
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.name = planetData.name;
            mesh.position.x = planetData.distance;

            const glow = new THREE.PointLight(colorMap[planetData.name], 1.5, 20);
            mesh.add(glow);

            if (planetData.name === 'Saturn') {
                const ringTexture = loader.load('/textures/saturn_ring.jpg');
                const ringGeometry = new THREE.RingGeometry(planetData.size + 1.5, planetData.size + 5.5, 128);
                const ringMaterial = new THREE.MeshBasicMaterial({
                    map: ringTexture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    alphaMap: ringTexture,
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2;
                mesh.add(ring);
            }

            const orbit = new THREE.Mesh(
                new THREE.RingGeometry(planetData.distance - 0.05, planetData.distance + 0.05, 256),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: 0.6, transparent: true })
            );
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);

            scene.add(mesh);
            planets.push({ mesh, data: planetData, angle: Math.random() * Math.PI * 2 });
        });

        planetsMeshesRef.current = planets;

        const interactableObjects = [sunMesh, ...planets.map(p => p.mesh)];
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event) => {
            if (selectedPlanet) return;
            const bounds = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(interactableObjects);
            renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : (controls.dragging ? 'grabbing' : 'grab');
        };

        const handleClick = (event) => {
            if (selectedPlanet) return;

            const bounds = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(interactableObjects);

            if (intersects.length > 0) {
                const obj = intersects[0].object;
                const planetData = getPlanetData(obj.name);

                setSelectedPlanet(obj.name);
                setPlanetInfo(planetData);
                setIsSidebarOpen(true);

                // Move GUI to left top corner with animation
                guiRef.current.domElement.style.left = '20px';
                guiRef.current.domElement.style.right = 'auto';
                guiRef.current.domElement.style.top = '20px';
                guiRef.current.show();

                // Create planet copy scene
                createPlanetCopy(planetData, loader);
            }
        };

        const createPlanetCopy = (planetData, loader) => {
            // Create separate scene for planet copy
            const copyScene = new THREE.Scene();
            planetCopySceneRef.current = copyScene;

            // Calculate planet size based on screen dimensions
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const sidebarWidth = 600;
            const availableWidth = screenWidth - sidebarWidth;

            // Make planet size responsive and much larger
            const basePlanetSize = Math.min(availableWidth, screenHeight) * 0.6; // 60% of available space
            const planetSize = Math.max(basePlanetSize, 350); // Minimum size of 350px

            // Create camera for planet copy with adjusted FOV and position
            const copyCamera = new THREE.PerspectiveCamera(40, availableWidth / screenHeight, 0.1, 1000);
            copyCamera.position.set(0, 0, planetSize * 1.2);

            // Create renderer for planet copy with larger dimensions
            const copyRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            copyRenderer.setSize(availableWidth, screenHeight);
            copyRenderer.setClearColor(0x000000, 0);
            planetCopyRendererRef.current = copyRenderer;

            // Add ambient light to copy scene
            const copyAmbientLight = new THREE.AmbientLight(0xffffff, 0.6);
            copyScene.add(copyAmbientLight);

            // Add multiple directional lights for better illumination
            const copyDirectionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
            copyDirectionalLight1.position.set(5, 5, 5);
            copyScene.add(copyDirectionalLight1);

            const copyDirectionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
            copyDirectionalLight2.position.set(-5, -5, 5);
            copyScene.add(copyDirectionalLight2);

            // Add point light for extra glow
            const copyPointLight = new THREE.PointLight(0xffffff, 0.3, planetSize * 3);
            copyPointLight.position.set(0, 0, planetSize);
            copyScene.add(copyPointLight);

            // Create planet copy mesh 
            const copyGeometry = new THREE.SphereGeometry(planetSize * 0.3, 128, 128);
            const copyMaterial = planetData.name === 'Sun'
                ? new THREE.MeshBasicMaterial({ map: loader.load(planetData.texture) })
                : new THREE.MeshStandardMaterial({
                    map: loader.load(planetData.texture),
                    roughness: 0.7,
                    metalness: 0.1
                });

            const copyMesh = new THREE.Mesh(copyGeometry, copyMaterial);
            copyScene.add(copyMesh);
            planetCopyRef.current = copyMesh;

            // Add Saturn's rings
            if (planetData.name === 'Saturn') {
                const ringTexture = loader.load('/textures/saturn_ring.jpg');
                const actualPlanetRadius = planetSize * 0.3;
                const ringInnerRadius = actualPlanetRadius * 1.2;
                const ringOuterRadius = actualPlanetRadius * 2.2;

                const ringGeometry = new THREE.RingGeometry(ringInnerRadius, ringOuterRadius, 128);
                const ringMaterial = new THREE.MeshLambertMaterial({
                    map: ringTexture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.9,
                    alphaTest: 0.1
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2;
                ring.rotation.z = Math.PI / 12; // Slight tilt for better visibility
                copyMesh.add(ring);

                // Add a second ring layer for depth
                const ring2Geometry = new THREE.RingGeometry(ringInnerRadius * 0.85, ringOuterRadius * 1.1, 128);
                const ring2Material = new THREE.MeshLambertMaterial({
                    map: ringTexture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.6,
                    alphaTest: 0.1
                });
                const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
                ring2.rotation.x = Math.PI / 2;
                ring2.rotation.z = -Math.PI / 24; // Opposite slight tilt
                copyMesh.add(ring2);

                // Add inner ring for more detail
                const ring3Geometry = new THREE.RingGeometry(ringInnerRadius * 0.7, ringInnerRadius * 1.1, 128);
                const ring3Material = new THREE.MeshLambertMaterial({
                    map: ringTexture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.4,
                    alphaTest: 0.1
                });
                const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
                ring3.rotation.x = Math.PI / 2;
                copyMesh.add(ring3);
            }

            // Start animation for planet copy
            const animatePlanetCopy = () => {
                if (planetCopyRef.current && planetCopySceneRef.current) {
                    planetCopyRef.current.rotation.y += planetData.selfRotationSpeed * 1.5;
                    copyRenderer.render(copyScene, copyCamera);
                    planetCopyAnimationRef.current = requestAnimationFrame(animatePlanetCopy);
                }
            };

            setShowPlanetCopy(true);
            animatePlanetCopy();
        };

        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleClick);

        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);

            if (ambientLightRef.current) {
                ambientLightRef.current.intensity = settings.current.lightIntensity;
            }

            planetsMeshesRef.current.forEach((planet) => {
                planet.mesh.rotation.y += planet.data.selfRotationSpeed * settings.current.rotationSpeed;
                planet.angle += planet.data.revolutionSpeed * settings.current.revolutionSpeed;
                planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
                planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
            });

            if (sunRef.current) {
                sunRef.current.mesh.rotation.y += sunRef.current.data.selfRotationSpeed * settings.current.rotationSpeed;
            }

            if (selectedPlanet) {
                const selectedMeshObject = planetsMeshesRef.current.find(p => p.mesh.name === selectedPlanet);
                const mesh = selectedMeshObject?.mesh || sunRef.current?.mesh;

                if (mesh) {
                    const planetWorldPos = new THREE.Vector3();
                    mesh.getWorldPosition(planetWorldPos);

                    // Smooth camera movement towards desired position
                    const desiredCameraPos = new THREE.Vector3().copy(planetWorldPos).add(cameraOffset.current);
                    cameraRef.current.position.lerp(desiredCameraPos, 0.05); // Adjust the interpolation speed here (0.05 is smooth)

                    // Smooth controls target update
                    controlsRef.current.target.lerp(planetWorldPos, 0.05);
                    controlsRef.current.update();
                }
            }


            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            if (planetCopyAnimationRef.current) {
                cancelAnimationFrame(planetCopyAnimationRef.current);
            }
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('click', handleClick);
            gui.destroy();
            controls.dispose();
            if (renderer.domElement?.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            if (planetCopyRendererRef.current) {
                planetCopyRendererRef.current.dispose();
            }
            renderer.dispose();
        };
    }, []);

    const handleClosePlanetView = () => {
        setSelectedPlanet(null);
        setPlanetInfo(null);
        setIsSidebarOpen(false);
        setShowPlanetCopy(false);

        // Move GUI back to right top corner with animation
        guiRef.current.domElement.style.left = 'auto';
        guiRef.current.domElement.style.right = '20px';
        guiRef.current.domElement.style.top = '20px';
        guiRef.current.show();

        // Stop planet copy animation
        if (planetCopyAnimationRef.current) {
            cancelAnimationFrame(planetCopyAnimationRef.current);
            planetCopyAnimationRef.current = null;
        }

        // Clean up planet copy renderer
        if (planetCopyRendererRef.current) {
            planetCopyRendererRef.current.dispose();
            planetCopyRendererRef.current = null;
        }

        // Reset refs
        planetCopyRef.current = null;
        planetCopySceneRef.current = null;
    };

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white text-xl font-semibold">
                    Loading Solar System...
                </div>
            )}

            <div ref={mountRef} className="w-full h-full" />

            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex transition-all duration-500 ease-in-out
                ${selectedPlanet ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ pointerEvents: selectedPlanet ? 'auto' : 'none' }}>

                {/* Planet Copy Container - Now takes full available space */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className={`relative w-full h-full transition-all duration-700 ease-in-out transform
                        ${showPlanetCopy ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <div
                            ref={(el) => {
                                if (el && planetCopyRendererRef.current && showPlanetCopy) {
                                    el.innerHTML = '';
                                    el.appendChild(planetCopyRendererRef.current.domElement);
                                }
                            }}
                            className="h-full w-full overflow-hidden"
                        />
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className={`w-[60rem] bg-black bg-opacity-90 text-white p-6 shadow-lg transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{planetInfo?.name}</h2>
                        <button
                            onClick={handleClosePlanetView}
                            className="text-lg text-gray-400 hover:text-white transition-colors duration-200 
                                     hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="space-y-4 overflow-y-auto max-h-[80vh]">
                        {planetInfo?.name === 'Sun' ? (
                            <Sun />
                        ) :
                            planetInfo?.name === 'Earth' ? (
                                <Earth />
                            ) :
                                planetInfo?.name === 'Jupiter' ? (
                                    <Jupiter />
                                ) :
                                    planetInfo?.name === 'Mars' ? (
                                        <Mars />
                                    ) :
                                        planetInfo?.name === 'Mercury' ? (
                                            <Mercury />
                                        ) :
                                            planetInfo?.name === 'Neptune' ? (
                                                <Neptune />
                                            ) :
                                                planetInfo?.name === 'Saturn' ? (
                                                    <Saturn />
                                                ) :
                                                    planetInfo?.name === 'Uranus' ? (
                                                        <Uranus />
                                                    ) :
                                                        planetInfo?.name === 'Venus' ? (
                                                            <Venus />
                                                        ) : (
                                                            <>
                                                                <div className="text-sm text-gray-300 leading-relaxed">
                                                                    {planetInfo?.description}
                                                                </div>
                                                                <div className="pt-4 border-t border-gray-700">
                                                                    <p className="text-xs text-gray-500 italic">
                                                                        Click and drag to explore • ESC to close
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;