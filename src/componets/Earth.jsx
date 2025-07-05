import React, { useState } from 'react';

const Earth = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Earth Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
                        alt="Earth Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Earth</h3>
                <p className="mt-1 text-gray-400">
                    Earth is the third planet from the Sun and the only astronomical object known to harbor life.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 5.972 × 10²⁴ kg</li>
                        <li>Radius: 6,371 km</li>
                        <li>Density: 5,514 kg/m³</li>
                        <li>Gravity: 9.807 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Avg Surface: 288 K (15°C)</li>
                        <li>Min: –89.2°C (Antarctica)</li>
                        <li>Max: 56.7°C (Death Valley)</li>
                        <li>Core: ~6,000 K</li>
                    </ul>
                </div>
            </div>

            {/* Expandable Details */}
            <div>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-4 text-blue-400 hover:text-blue-300 transition"
                >
                    {expanded ? '▲ Hide Details' : '▼ See More'}
                </button>

                {expanded && (
                    <div className="mt-4 space-y-4 text-sm text-gray-400">
                        <div>
                            <h4 className="text-white font-medium mb-1">Atmosphere Composition</h4>
                            <ul className="list-disc list-inside">
                                <li>Nitrogen: 78.08%</li>
                                <li>Oxygen: 20.95%</li>
                                <li>Argon: 0.93%</li>
                                <li>Carbon Dioxide: 0.04%</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>Strength: ~25 to 65 µT</li>
                                <li>Dipole tilt: ~11°</li>
                                <li>Protects from solar wind</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Sidereal Day: 23.93 hours</li>
                                <li>Orbital Period: 365.25 days</li>
                                <li>Distance from Sun: 149.6 million km</li>
                                <li>Orbital Speed: 29.78 km/s</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons</h4>
                            <ul className="list-disc list-inside">
                                <li>Moon (Luna) — Only natural satellite</li>
                                <li>Orbital period: 27.3 days</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Geology</h4>
                            <ul className="list-disc list-inside">
                                <li>Crust: 5–70 km thick</li>
                                <li>Mantle: ~2,900 km</li>
                                <li>Outer Core: Liquid iron/nickel</li>
                                <li>Inner Core: Solid iron</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Other Facts</h4>
                            <ul className="list-disc list-inside">
                                <li>Surface area: 510.1 million km²</li>
                                <li>Water coverage: ~71%</li>
                                <li>Life diversity: ~8.7 million species</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Earth;
