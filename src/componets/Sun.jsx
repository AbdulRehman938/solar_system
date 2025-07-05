import React, { useState } from 'react';

const Sun = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="text-sm text-gray-300 space-y-4">
            <div className="flex justify-center items-center w-full h-full bg-black py-6">
                <div className="relative w-60 h-60 rounded-full overflow-visible">
                    <img
                        src="https://imgs.search.brave.com/Zlm0NglunfQc7iIV1ZO74BZKalczoM6RgsdZYa5aeNU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L1pw/aTV1dGNmN3pkZ2dv/dXREaUJFZ0IuanBn"
                        alt="Sun Real"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full]"
                    />
                </div>
            </div>



            {/* Basic Info */}
            <div>
                <h3 className="text-xl font-semibold text-white">Sun</h3>
                <p className="mt-1 text-gray-400">
                    The Sun is a nearly perfect ball of hot plasma and the central star of our solar system.
                </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Size & Mass</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        <li>Mass: 1.9884 × 10²⁴ kg</li>
                        <li>Radius: 695,700 km</li>
                        <li>Density: 1,408 kg/m³</li>
                        <li>Surface gravity: 274.0 m/s²</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-1">Temperature</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        <li>Core: 15.7 million K</li>
                        <li>Surface: 5,772 K</li>
                        <li>Photosphere: 4,400–6,600 K</li>
                        <li>Chromosphere: ~30,000 K</li>
                    </ul>
                </div>
            </div>

            {/* See More */}
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
                            <h4 className="text-white font-medium mb-1">Core Conditions</h4>
                            <ul className="list-disc list-inside">
                                <li>Pressure: 2.477 × 10¹¹ bar</li>
                                <li>Density: 1.622 × 10⁵ kg/m³</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Composition</h4>
                            <ul className="list-disc list-inside">
                                <li>Hydrogen: 90.965%</li>
                                <li>Helium: 8.889%</li>
                                <li>Oxygen: 774 ppm</li>
                                <li>Carbon: 330 ppm</li>
                                <li>Iron: 43 ppm</li>
                                <li>Others: Neon, Nitrogen, Magnesium...</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Energy & Luminosity</h4>
                            <ul className="list-disc list-inside">
                                <li>Luminosity: 382.8 × 10²⁴ J/s</li>
                                <li>Mass conversion: 4.26 × 10⁶ kg/s</li>
                                <li>Emission: 62.94 × 10⁶ J/m²s</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Rotation & Motion</h4>
                            <ul className="list-disc list-inside">
                                <li>Sidereal period: 25.4 days</li>
                                <li>Obliquity: 7.25°</li>
                                <li>Stellar speed: 19.4 km/s</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Atmospheric Layers</h4>
                            <ul className="list-disc list-inside">
                                <li>Photosphere: ~500 km thick</li>
                                <li>Chromosphere: ~2,500 km thick</li>
                                <li>Pressure (top): 0.868 mb</li>
                                <li>Pressure (bottom): 125 mb</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Magnetic Field</h4>
                            <ul className="list-disc list-inside">
                                <li>Polar: 1–2 Gauss</li>
                                <li>Sunspots: 3,000 Gauss</li>
                                <li>Prominences: 10–100 Gauss</li>
                                <li>Chromospheric network: 25 Gauss</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Distance & Appearance</h4>
                            <ul className="list-disc list-inside">
                                <li>Distance: ~149.6 million km</li>
                                <li>Visual Magnitude: –26.74</li>
                                <li>Spectral Type: G2 V</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-medium mb-1">Solar Activity</h4>
                            <ul className="list-disc list-inside">
                                <li>Sunspot cycle: 11.4 years</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sun;
