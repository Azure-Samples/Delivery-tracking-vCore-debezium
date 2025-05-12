function getDistanceFromLatLonInKm(coords1, coords2) {
    
    const [ lat1, lon1 ] = coords1
    const [ lat2, lon2 ] = coords2
    
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getTravelTime(distanceKm, speedKmph) {
  if (speedKmph <= 0) return 'Invalid speed';

  const timeHours = distanceKm / speedKmph;
  const totalSeconds = timeHours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

  module.exports = { getDistanceFromLatLonInKm, getTravelTime };
  