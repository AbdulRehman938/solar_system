import React, { useState } from 'react';

const Uranus = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Uranus Real Image */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg"
                        alt="Uranus Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Uranus</h3>
                <p className="mt-1 text-gray-400">
                    Uranus is the seventh planet from the Sun and the third-largest by diameter. It has a pale blue color due to methane in its atmosphere.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 8.681 × 10²⁵ kg</li>
                        <li>Radius: 25,362 km</li>
                        <li>Density: 1,270 kg/m³</li>
                        <li>Gravity: 8.69 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Average: –224°C</li>
                        <li>Upper Atmosphere: ~76 K</li>
                        <li>Core: ~5,000 K</li>
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
                                <li>Hydrogen: ~82%</li>
                                <li>Helium: ~15%</li>
                                <li>Methane: ~2.3%</li>
                                <li>Cloud layers: Water, Ammonia</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day Length: ~17.2 hours</li>
                                <li>Year Length: 84 Earth years</li>
                                <li>Distance from Sun: ~2.87 billion km</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Axial Tilt</h4>
                            <ul className="list-disc list-inside">
                                <li>98° tilt (rotates sideways)</li>
                                <li>Extreme seasonal changes</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rings</h4>
                            <ul className="list-disc list-inside">
                                <li>13 known rings</li>
                                <li>Dark and narrow</li>
                                <li>Composed of dust & ice</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons</h4>
                            <ul className="list-disc list-inside">
                                <li>At least 27 known moons</li>
                                <li>Major moons: Titania, Oberon, Ariel</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Internal Structure</h4>
                            <ul className="list-disc list-inside">
                                <li>Icy mantle: water, ammonia</li>
                                <li>Rocky core</li>
                                <li>No solid surface</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Exploration</h4>
                            <ul className="list-disc list-inside">
                                <li>Voyager 2 flyby in 1986</li>
                                <li>No other missions yet</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Uranus;
