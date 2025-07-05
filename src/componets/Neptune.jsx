import React, { useState } from 'react';

const Neptune = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Real Image of Neptune */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg"
                        alt="Neptune Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Neptune</h3>
                <p className="mt-1 text-gray-400">
                    Neptune is the eighth and farthest planet from the Sun. It is a gas giant known for its deep blue color and powerful storms.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 1.024 × 10²⁶ kg</li>
                        <li>Radius: 24,622 km</li>
                        <li>Density: 1,638 kg/m³</li>
                        <li>Gravity: 11.15 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Average: –214°C</li>
                        <li>Upper Atmosphere: ~55 K</li>
                        <li>Core: ~7,000 K</li>
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
                                <li>Hydrogen: ~80%</li>
                                <li>Helium: ~19%</li>
                                <li>Methane: ~1.5% (gives blue color)</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Winds & Weather</h4>
                            <ul className="list-disc list-inside">
                                <li>Strongest winds in the solar system</li>
                                <li>Speeds over 2,100 km/h</li>
                                <li>Storms like the Great Dark Spot</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day Length: 16.11 hours</li>
                                <li>Year Length: 164.8 Earth years</li>
                                <li>Distance from Sun: ~4.5 billion km</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>Tilted and offset from center</li>
                                <li>Stronger than Earth's</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Internal Structure</h4>
                            <ul className="list-disc list-inside">
                                <li>Rocky core</li>
                                <li>Ice and water mantle</li>
                                <li>Gaseous outer envelope</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons & Rings</h4>
                            <ul className="list-disc list-inside">
                                <li>14 known moons</li>
                                <li>Largest moon: Triton</li>
                                <li>5 faint rings</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Exploration</h4>
                            <ul className="list-disc list-inside">
                                <li>Voyager 2 flyby in 1989</li>
                                <li>No orbiters yet</li>
                                <li>Future missions proposed</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Neptune;
