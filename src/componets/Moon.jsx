import React, { useState } from 'react';

const Moon = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Moon Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="/textures/Moon.jpg"
                        alt="Moon Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Moon</h3>
                <p className="mt-1 text-gray-400">
                    The Moon is Earth's only natural satellite. It is the fifth largest satellite in the Solar System and the largest relative to its planet.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 7.35 × 10²² kg</li>
                        <li>Radius: 1,737.1 km</li>
                        <li>Density: 3,346 kg/m³</li>
                        <li>Gravity: 1.62 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Avg Surface: –20°C</li>
                        <li>Min: –173°C (night)</li>
                        <li>Max: 127°C (day)</li>
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
                            <h4 className="text-white font-medium mb-1">Orbit & Rotation</h4>
                            <ul className="list-disc list-inside">
                                <li>Orbital Period: 27.3 days</li>
                                <li>Rotational Period: 27.3 days (tidally locked)</li>
                                <li>Distance from Earth: ~384,400 km</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Surface Features</h4>
                            <ul className="list-disc list-inside">
                                <li>Maria (dark basalt plains)</li>
                                <li>Craters</li>
                                <li>Rilles & Highlands</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Atmosphere</h4>
                            <ul className="list-disc list-inside">
                                <li>Extremely thin exosphere</li>
                                <li>Mainly hydrogen, helium, neon</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Exploration</h4>
                            <ul className="list-disc list-inside">
                                <li>First human landing: 1969 (Apollo 11)</li>
                                <li>Multiple robotic landers & orbiters</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Interesting Facts</h4>
                            <ul className="list-disc list-inside">
                                <li>Always shows the same face to Earth</li>
                                <li>Causes Earth's tides</li>
                                <li>Only celestial body visited by humans</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Moon;
