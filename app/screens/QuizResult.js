import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import Screen from '../components/Screen';
export default function QuizResult(props) {
  const navigation = useNavigation();
  return (
    <Screen style={styles.container}>
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
          <Text>
            As a fellow {props.house}, we are quite competitive. Each week on
            this app, you will find a weekly challenge on top of the Feed
            screen. Each dog can post a picture of them taking on the challenge
            of the week and the app allows users to "throw bones" at photos you
            like. At the end of each week, a trophy will be given out to the
            house that has received the highest number of likes. We encourage
            you to tackle these challenges and post a picture of the completed
            look! Best of luck!{' '}
          </Text>
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
  container: {
    // paddingTop: 40,
    // paddingHorizontal: 20,
    height: '100%',
    backgroundColor: colors.medium,
  },
  sectionTitle: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    color: colors.gold,
    fontSize: 18,
    // fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
