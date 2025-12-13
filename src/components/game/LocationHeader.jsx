import React from 'react';

function LocationHeader({ location }) {
    // 자유 이동 제거됨 - 이동은 이벤트를 통해서만 가능
    return (
        <div className="glass-card p-4 mb-4">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{location.theme.particle}</span>
                <div>
                    <h2 className="text-lg font-bold" style={{ color: location.theme.accent }}>
                        {location.name}
                    </h2>
                    <p className="text-xs text-gray-400">{location.description}</p>
                </div>
            </div>
        </div>
    );
}

export default LocationHeader;
