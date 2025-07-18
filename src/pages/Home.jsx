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
import Moon from '../componets/Moon.jsx';


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
    const guiControllers = useRef({});
    const [isPaused, setIsPaused] = useState(false);
    const isPausedRef = useRef(false);
    const planetTailsRef = useRef({});




    const defaultSettings = {
        revolutionSpeed: 1,
        rotationSpeed: 1, // previously 2
        lightIntensity: 1,
    };

    const settings = useRef({ ...defaultSettings });

    const getPlanetData = useCallback((name) => {
        const data = planetsDataRef.current.find(p => p.name === name);
        if (name === 'Sun') {
            return {
                name: 'Sun',
                size: 80,
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

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 15000);
        camera.position.set(1000, 1000, 100);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.physicallyCorrectLights = true; // Light realism

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
        controls.rotateSpeed = 2;
        controls.zoomSpeed = 0.8;
        controls.panSpeed = 0.8;
        controls.minDistance = 80;
        controls.maxDistance = 3000;
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

        guiControllers.current.revolutionSpeed = gui
            .add(settings.current, 'revolutionSpeed', 0, 2, 0.001)
            .name('Revolution Speed');

        guiControllers.current.rotationSpeed = gui
            .add(settings.current, 'rotationSpeed', 0, 1, 0.001)
            .name('Self-Rotation Speed');

        guiControllers.current.lightIntensity = gui
            .add(settings.current, 'lightIntensity', 0, 20, 0.1)
            .name('Ambient Light')
            .onChange((value) => {
                if (ambientLightRef.current) {
                    ambientLightRef.current.intensity = value;
                }
            });


        gui.add({
            reset: () => {
                Object.keys(defaultSettings).forEach((key) => {
                    settings.current[key] = defaultSettings[key];
                    guiControllers.current[key]?.setValue(defaultSettings[key]);
                });
            }
        }, 'reset').name('🔁 Reset Settings');


        const ambient = new THREE.AmbientLight(0xffffff, settings.current.lightIntensity);
        scene.add(ambient);
        ambientLightRef.current = ambient;

        const pointLight = new THREE.PointLight(0xffffff, 2, 300);
        pointLight.position.set(0, 0, 0);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        pointLight.shadow.camera.near = 1;
        pointLight.shadow.camera.far = 500;
        scene.add(pointLight);

        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);

        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            setLoading(false);
            gui.show();
        };

        const loader = new THREE.TextureLoader(manager);

        const bgSphere = new THREE.Mesh(
            new THREE.SphereGeometry(5000, 64, 64),
            new THREE.MeshBasicMaterial({
                map: loader.load('/textures/milkyWay.jpeg'),
                side: THREE.BackSide,
            })
        );
        scene.add(bgSphere);

        planetsDataRef.current = [
            { name: 'Sun', size: 150, selfRotationSpeed: 0.04, texture: '/textures/sun.jpg', description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.' },
            { name: 'Mercury', size: 10, distance: 130, revolutionSpeed: 0.0100, selfRotationSpeed: 0.005, texture: '/textures/mercury.jpg', description: 'Mercury is the smallest planet...' },
            { name: 'Venus', size: 25, distance: 240, revolutionSpeed: 0.0039, selfRotationSpeed: 0.00121, texture: '/textures/venus.jpg', description: 'Venus is the second planet...' },
            {
                name: 'Earth',
                size: 40, distance: 333, revolutionSpeed: 0.0024, selfRotationSpeed: 0.005,
                texture: '/textures/earth.jpg',
                description: 'Earth is the third planet...',
                moons: [
                    {
                        name: 'Moon',
                        size: 10, // realistic scale
                        distance: 60, // from Earth
                        revolutionSpeed: 0.04,
                        selfRotationSpeed: 0.001,
                        texture: '/textures/Moon.jpg',
                    }
                ]
            }
            ,
            { name: 'Mars', size: 35, distance: 507, revolutionSpeed: 0.0013, selfRotationSpeed: 0.00486, texture: '/textures/mars.jpg', description: 'Mars is the fourth planet...' },
            { name: 'Jupiter', size: 60, distance: 800, revolutionSpeed: 0.0002, selfRotationSpeed: 0.02, texture: '/textures/jupiter.jpg', description: 'Jupiter is the fifth planet...' },
            { name: 'Saturn', size: 40, distance: 1000, revolutionSpeed: 0.000081, selfRotationSpeed: 0.01296, texture: '/textures/saturn.jpg', description: 'Saturn is the sixth planet...' },
            { name: 'Uranus', size: 50, distance: 1200, revolutionSpeed: 0.000029, selfRotationSpeed: 0.00811, texture: '/textures/uranus.jpg', description: 'Uranus is the seventh planet...' },
            { name: 'Neptune', size: 50, distance: 1500, revolutionSpeed: 0.000015, selfRotationSpeed: 0.00754, texture: '/textures/neptune.jpg', description: 'Neptune is the eighth planet...' },
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
        sunMesh.castShadow = true;
        sunMesh.receiveShadow = true;


        sunMesh.name = 'Sun';
        scene.add(sunMesh);
        sunRef.current = { mesh: sunMesh, data: sunData };

        const spriteMaterial = new THREE.SpriteMaterial({
            map: loader.load('/textures/sun_glow.png'),
            color: 0xffaa00,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });
        const glowSprite = new THREE.Sprite(spriteMaterial);
        glowSprite.scale.set(sunData.size * 2, sunData.size * 2, 1);
        sunMesh.add(glowSprite);


        const planets = [];

        planetsDataRef.current.filter(p => p.name !== 'Sun').forEach((planetData) => {
            const texture = loader.load(planetData.texture);
            const geometry = new THREE.SphereGeometry(planetData.size, 64, 64);
            const material = new THREE.MeshStandardMaterial({
                map: texture,
                metalness: 0.2,
                roughness: 0.7,
            });
            ;
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

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
            // Add moons if any (e.g., Moon around Earth)
            if (planetData.moons) {
                planetData.moons.forEach((moonData) => {
                    const moonTexture = loader.load(moonData.texture);
                    const moonGeometry = new THREE.SphereGeometry(moonData.size, 32, 32);
                    const moonMaterial = new THREE.MeshStandardMaterial({
                        map: moonTexture,
                        metalness: 0.2,
                        roughness: 0.7,
                    });

                    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
                    moonMesh.castShadow = true;
                    moonMesh.receiveShadow = true;
                    moonMesh.name = moonData.name;
                    moonMesh.position.set(moonData.distance, 0, 0); // Place moon at distance from Earth

                    moonMesh.userData.data = moonData;

                    // Pivot for revolution
                    const moonPivot = new THREE.Object3D();
                    moonPivot.userData.angle = Math.random() * Math.PI * 2;
                    moonPivot.userData.revolutionSpeed = moonData.revolutionSpeed;

                    moonPivot.add(moonMesh);       // Add moon to pivot
                    mesh.add(moonPivot);           // Add pivot to Earth

                    // Optional reference
                    planetData.moonPivot = moonPivot;
                });
            }

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
            const copyGeometry = new THREE.SphereGeometry(planetData.size, 128, 128);
            const copyMaterial = planetData.name === 'Sun'
                ? new THREE.MeshStandardMaterial({
                    map: loader.load(sunData.texture),
                    emissive: 0xffaa00,
                    emissiveIntensity: 1.5,
                    roughness: 1,
                    metalness: 0,
                })

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

        let simulatedEarthDays = 0;
        let lastUpdateTime = performance.now();
        const secondsPerEarthDay = 0.1; // 1 real second = 10 Earth days → 1 Earth day = 0.1s

        const animate = () => {
            const now = performance.now();
            const deltaTime = (now - lastUpdateTime) / 1000;
            lastUpdateTime = now;

            animationFrameId.current = requestAnimationFrame(animate);

            // Update ambient light regardless of pause state
            if (ambientLightRef.current) {
                ambientLightRef.current.intensity = settings.current.lightIntensity;
            }

            if (!isPausedRef.current) {
                simulatedEarthDays += (deltaTime / secondsPerEarthDay) * settings.current.revolutionSpeed;

                const earthDayCounter = document.getElementById('earth-day-counter');
                if (earthDayCounter) {
                    earthDayCounter.textContent = simulatedEarthDays.toFixed(1);
                }

                // Animate planets
                planetsMeshesRef.current.forEach((planet) => {
                    planet.mesh.rotation.y += planet.data.selfRotationSpeed * settings.current.rotationSpeed;
                    planet.angle += planet.data.revolutionSpeed * settings.current.revolutionSpeed;
                    planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
                    planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;

                    // Moons
                    if (planet.data.moons && planet.mesh.children.length > 0) {
                        planet.mesh.children.forEach((child) => {
                            if (child instanceof THREE.Object3D && child.children.length > 0) {
                                const moon = child.children[0];
                                if (moon.userData?.data) {
                                    child.userData.angle += child.userData.revolutionSpeed * settings.current.revolutionSpeed;
                                    child.rotation.y = child.userData.angle;
                                    moon.rotation.y += moon.userData.data.selfRotationSpeed * settings.current.rotationSpeed;
                                }
                            }
                        });
                    }

                    planet.mesh.position.y = Math.sin(planet.angle * 0.3) * 2;
                });

                // Animate Sun
                if (sunRef.current) {
                    sunRef.current.mesh.rotation.y += sunRef.current.data.selfRotationSpeed * settings.current.rotationSpeed;
                }

                if (sunRef.current?.mesh.material.map) {
                    sunRef.current.mesh.material.map.offset.x += 0.0002;
                    sunRef.current.mesh.material.needsUpdate = true;
                }

                sunRef.current.mesh.material.map.wrapS = THREE.RepeatWrapping;
                sunRef.current.mesh.material.map.wrapT = THREE.RepeatWrapping;
            }

            // Smooth camera tracking on selected planet (always active)
            if (selectedPlanet) {
                const selectedMeshObject = planetsMeshesRef.current.find(p => p.mesh.name === selectedPlanet);
                const mesh = selectedMeshObject?.mesh || sunRef.current?.mesh;

                if (mesh) {
                    const planetWorldPos = new THREE.Vector3();
                    mesh.getWorldPosition(planetWorldPos);

                    const desiredCameraPos = new THREE.Vector3().copy(planetWorldPos).add(cameraOffset.current);
                    cameraRef.current.position.lerp(desiredCameraPos, 0.05);
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
                            planetInfo?.name === 'Moon' ? (
                                <Moon />
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
            <div className="absolute top-4 left-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded shadow text-sm font-mono flex items-center gap-4">
                Earth Days: <span id="earth-day-counter">0</span>
                <button
                    onClick={() => {
                        setIsPaused((prev) => {
                            isPausedRef.current = !prev;  // <- keep ref in sync
                            return !prev;
                        });
                    }}
                    className="ml-2 bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                >
                    {isPaused ? '▶ Play' : '❚❚ Pause'}
                </button>

            </div>


        </div>
    );
};

export default Home;