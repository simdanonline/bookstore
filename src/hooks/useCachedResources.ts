import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'poppins600': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
          'poppins500': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
          'poppins400': require('../assets/fonts/poppins/Poppins-Regular.ttf'),

        });
        await Asset.loadAsync([
          require('../assets/img/Rectangle.png'), 
          require('../assets/img/camera_boy.png'), 
          require('../assets/img/Vector.png'), 
          require('../assets/img/top_right_corner.png'), 
          require('../assets/img/middlecurve.png'),
          require('../assets/img/beside_middlecurve.png'),
          require('../assets/img/beside_adeventure.png')
        ]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
