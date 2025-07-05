import React, { useState } from 'react';

const Saturn = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            {/* Real Image of Saturn */}
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://imgs.search.brave.com/ibHBpGi-Y9HzxxfDrEy6S82ASgaqdvzXYndUFNPavhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXJ0/aHNreS5vcmcvdXBs/LzIwMjMvMDgvc2F0/dXJuLU5hbmN5LVJp/Y2lnbGlhbmEtTG9u/Zy1Jc2xhbmQtTlkt/YXVnMjctMjAyMy1s/Zy1lMTY5MzM0ODY0/MzcwOS5wbmc"
                        alt="Saturn Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Saturn</h3>
                <p className="mt-1 text-gray-400">
                    Saturn is the sixth planet from the Sun and is best known for its spectacular ring system. It’s a gas giant with a low density.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Mass: 5.683 × 10²⁶ kg</li>
                        <li>Radius: 58,232 km</li>
                        <li>Density: 687 kg/m³</li>
                        <li>Gravity: 10.44 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Average: –138°C</li>
                        <li>Upper Atmosphere: ~134 K</li>
                        <li>Core: ~11,700°C</li>
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
                                <li>Hydrogen: ~96%</li>
                                <li>Helium: ~3%</li>
                                <li>Trace gases: Methane, Ammonia</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rings</h4>
                            <ul className="list-disc list-inside">
                                <li>7 main rings</li>
                                <li>Thousands of ringlets</li>
                                <li>Mainly ice particles</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Orbit</h4>
                            <ul className="list-disc list-inside">
                                <li>Day Length: ~10.7 hours</li>
                                <li>Year Length: 29.4 Earth years</li>
                                <li>Distance from Sun: ~1.43 billion km</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>Strong, symmetrical</li>
                                <li>Magnetosphere extends far</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Moons</h4>
                            <ul className="list-disc list-inside">
                                <li>At least 145 known moons</li>
                                <li>Largest: Titan</li>
                                <li>Other major: Enceladus, Rhea</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Internal Structure</h4>
                            <ul className="list-disc list-inside">
                                <li>Core: Rock and ice</li>
                                <li>Metallic hydrogen layer</li>
                                <li>Outer gaseous envelope</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Exploration</h4>
                            <ul className="list-disc list-inside">
                                <li>Pioneer 11, Voyager 1 & 2</li>
                                <li>Cassini orbiter (2004–2017)</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Saturn;
