import React, { useState } from 'react';

const Jupiter = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Jupiter Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg"
                        alt="Jupiter Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Jupiter</h3>
                <p className="mt-1 text-gray-400">
                    Jupiter is the largest planet in our solar system, a gas giant known for its Great Red Spot and powerful magnetic field.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 1.898 × 10²⁷ kg</li>
                        <li>Radius: 69,911 km</li>
                        <li>Density: 1,326 kg/m³</li>
                        <li>Gravity: 24.79 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Avg Cloud Top: -145°C</li>
                        <li>Core Temp: ~24,000 K</li>
                        <li>Heat Emission: More than it receives from Sun</li>
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
                            <h4 className="text-white font-medium mb-1">Atmosphere</h4>
                            <ul className="list-disc list-inside">
                                <li>Hydrogen: ~90%</li>
                                <li>Helium: ~10%</li>
                                <li>Trace gases: Methane, Ammonia</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>Strongest among planets</li>
                                <li>Magnetosphere: 4 million km wide</li>
                                <li>10x stronger than Earth's</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day Length: 9.9 hours</li>
                                <li>Year Length: 11.86 Earth years</li>
                                <li>Distance from Sun: 778 million km</li>
                                <li>Orbital Speed: 13.07 km/s</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons</h4>
                            <ul className="list-disc list-inside">
                                <li>At least 95 confirmed moons</li>
                                <li>Major: Io, Europa, Ganymede, Callisto</li>
                                <li>Ganymede: Largest moon in solar system</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Great Red Spot</h4>
                            <ul className="list-disc list-inside">
                                <li>Giant storm lasting over 300 years</li>
                                <li>2–3x the size of Earth</li>
                                <li>Winds up to 432 km/h</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rings & Structure</h4>
                            <ul className="list-disc list-inside">
                                <li>Has faint ring system</li>
                                <li>Mainly dust particles</li>
                                <li>Structure: No solid surface, gas & liquid layers</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jupiter;
