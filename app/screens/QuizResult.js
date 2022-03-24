import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import Screen from '../components/Screen';
export default function QuizResult(props) {
  const navigation = useNavigation();
  return (
    <Screen style={styles.screen}>
      <View>
        <View>
          <Text style={styles.sectionTitle}> Your house is {props.house} </Text>
          {props.house === 'HufflePup' ? (
            <View>
              <Image
                source={require('../assets/hufflepup.png')}
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                }}
              />
              <Text style={styles.text}>
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
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                }}
              />
              <Text style={styles.text}>
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
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                }}
              />
              <Text style={styles.text}>
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
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                }}
              />
              <Text style={styles.text}>
                Congrats! Welcome to the RavenPaw Family. Excited to have a
                clever, intellectual dog like yourself join us.
              </Text>
            </View>
          ) : null}
          <Text style={styles.text}>Continue Home to enter Pawgwartz!</Text>
          <Button
            title="Home"
            onPress={() => navigation.navigate('App')}
          ></Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#E8EAED',
  // },
  screen: {
    padding: 20,
    backgroundColor: colors.medium,
  },
  // Wrapper: {
  //   paddingTop: 80,
  //   paddingHorizontal: 20,
  // },
  sectionTitle: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: 'bold',
<<<<<<< HEAD
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    color: colors.gold,
    fontSize: 18,
    // fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
=======
>>>>>>> main
  },
});
