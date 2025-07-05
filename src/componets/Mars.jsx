import React, { useState } from 'react';

const Mars = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Mars Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
                        alt="Mars Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Mars</h3>
                <p className="mt-1 text-gray-400">
                    Mars, known as the Red Planet, is the fourth planet from the Sun and a focus of human exploration due to its potential for life.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 6.39 × 10²³ kg</li>
                        <li>Radius: 3,389.5 km</li>
                        <li>Density: 3,933 kg/m³</li>
                        <li>Gravity: 3.71 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Avg Surface: –63°C</li>
                        <li>Min: –143°C (polar)</li>
                        <li>Max: 35°C (day)</li>
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
                                <li>Carbon Dioxide: 95.3%</li>
                                <li>Nitrogen: 2.7%</li>
                                <li>Argon: 1.6%</li>
                                <li>Oxygen: 0.13%</li>
                                <li>Trace: Water vapor, CO</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Surface Features</h4>
                            <ul className="list-disc list-inside">
                                <li>Olympus Mons: Tallest volcano (22 km)</li>
                                <li>Valles Marineris: 4,000 km long canyon</li>
                                <li>Polar ice caps</li>
                                <li>Dust storms & dunes</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day Length: 24.6 hours</li>
                                <li>Year Length: 687 Earth days</li>
                                <li>Distance from Sun: ~228 million km</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons</h4>
                            <ul className="list-disc list-inside">
                                <li>Phobos</li>
                                <li>Deimos</li>
                                <li>Both small, irregular shaped</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>No global magnetic field</li>
                                <li>Local crustal magnetism in some regions</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Water Evidence</h4>
                            <ul className="list-disc list-inside">
                                <li>Past flowing water confirmed</li>
                                <li>Subsurface ice and seasonal flows</li>
                                <li>Key target for astrobiology</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mars;
