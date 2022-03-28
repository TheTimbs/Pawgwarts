import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import Screen from '../components/Screen';
import Button from '../components/Button';
import { useFonts } from 'expo-font';

export default function QuizResult(props) {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Screen>
      <ImageBackground
        blurRadius={1}
        style={styles.background}
        source={require('../assets/BlueBackground.jpeg')}
      >
        <View>
          <View>
            <Text style={styles.sectionTitle1}> Your house is </Text>
            <Text style={styles.sectionTitle2}> {props.house} </Text>
            {props.house === 'HufflePup' ? (
              <View>
                <Image
                  source={require('../assets/hufflepup.png')}
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.textbold}>
                  Congrats! Welcome to the HufflePup Family. Excited to have a
                  trustworthy, loyal, and hardworking dog like yourself join us.
                </Text>
              </View>
            ) : null}
            {props.house === 'GryffinDog' ? (
              <View>
                <Image
                  source={require('../assets/gryffindog.jpeg')}
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.textbold}>
                  Congrats! Welcome to the GryffinDog Family. Excited to have a
                  courageous and daring dog join us.
                </Text>
              </View>
            ) : null}
            {props.house === 'Slobberin' ? (
              <View>
                <Image
                  source={require('../assets/slobberin.jpeg')}
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.textbold}>
                  Congrats! Welcome to the Slobberin Family. We are ambitious,
                  achievement-oriented, and strong, and are excited to have you
                  alongside us.
                </Text>
              </View>
            ) : null}
            {props.house === 'RavenPaw' ? (
              <View>
                <Image
                  source={require('../assets/ravenpaw.jpeg')}
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.textbold}>
                  Congrats! Welcome to the RavenPaw Family. Excited to have a
                  clever, intellectual dog like yourself join us.
                </Text>
              </View>
            ) : null}
            <Text style={styles.rules}>
              Each week you will find a weekly challenge on top of the Feed
              screen. Each dog can post a picture of them completing the
              challenge as well as like photos of other dogs doing the same. At
              the end of each week, a trophy will be given out to the house that
              has received the highest number of likes. We encourage you to
              tackle these challenges and post a picture of your completed look!
              Best of luck!{' '}
            </Text>
            <Text style={styles.textbold}>
              Continue Home to enter Pawgwartz!
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="Home"
                onPress={() => navigation.navigate('App')}
                color="blue"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle1: {
    color: colors.gold,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 3,
    fontFamily: 'Harry-Potter',
  },
  sectionTitle2: {
    color: colors.gold,
    fontSize: 55,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 15,
    fontFamily: 'Harry-Potter',
  },
  textbold: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Harry-Potter',
  },
  rules: {
    color: colors.gold,
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    width: '100%',
  },
});
