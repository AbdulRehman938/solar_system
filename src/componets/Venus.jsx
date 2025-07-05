import React, { useState } from 'react';

const Venus = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Venus Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg"
                        alt="Venus Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Venus</h3>
                <p className="mt-1 text-gray-400">
                    Venus is the second planet from the Sun. It's similar in size to Earth but has a dense CO₂ atmosphere and extremely hot surface.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 4.867 × 10²⁴ kg</li>
                        <li>Radius: 6,052 km</li>
                        <li>Density: 5,243 kg/m³</li>
                        <li>Gravity: 8.87 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Surface: ~464°C</li>
                        <li>Upper Clouds: ~-70°C</li>
                        <li>Hotter than Mercury</li>
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
                                <li>CO₂: ~96.5%</li>
                                <li>Nitrogen: ~3.5%</li>
                                <li>Thick sulfuric acid clouds</li>
                                <li>Pressure: ~92x Earth's</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day: ~243 Earth days</li>
                                <li>Year: ~225 Earth days</li>
                                <li>Retrograde rotation</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Surface & Structure</h4>
                            <ul className="list-disc list-inside">
                                <li>Volcanoes & lava plains</li>
                                <li>Mountains & impact craters</li>
                                <li>No water on surface</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Exploration</h4>
                            <ul className="list-disc list-inside">
                                <li>Visited by Venera, Magellan</li>
                                <li>Radar mapping through clouds</li>
                                <li>Surface probes melted quickly</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Interesting Facts</h4>
                            <ul className="list-disc list-inside">
                                <li>Brightest object after the Moon</li>
                                <li>Known as Earth’s twin</li>
                                <li>Thick greenhouse effect</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Venus;
