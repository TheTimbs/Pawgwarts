import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function QuizResult(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <Text style={styles.sectionTitle}> Your house is {props.house} </Text>
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
