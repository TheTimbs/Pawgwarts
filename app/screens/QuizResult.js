import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function QuizResult(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <Text style={styles.sectionTitle}> Your house is {props.house} </Text>
        {props.house === 'HufflePup' ? (
          <Image
            source={require('../assets/hufflepup.png')}
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
          />
        ) : null}
        {props.house === 'GryffinDog' ? (
          <Image
            source={require('../assets/gryffindog.jpeg')}
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
          />
        ) : null}
        {props.house === 'Slobberin' ? (
          <Image
            source={require('../assets/slobberin.jpeg')}
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
          />
        ) : null}
        {props.house === 'RavenPaw' ? (
          <Image
            source={require('../assets/ravenpaw.jpeg')}
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
          />
        ) : null}
        <Text> An Image would go here </Text>
        <Text> Navigation to the home </Text>
        <Button
          title="Home"
          onPress={() => navigation.navigate('App')}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  Wrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
