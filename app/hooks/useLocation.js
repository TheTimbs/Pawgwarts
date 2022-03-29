import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// o: is this being used somewhere?
export default useLocation = () => {
  const [location, setLocation] = useState();

  // o: shouldn't this be defined within the useEffect hook?
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
