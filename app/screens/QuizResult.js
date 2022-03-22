import { StyleSheet, Text, View } from 'react-native';

export default function QuizResult(props) {
  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <Text style={styles.sectionTitle}> Your house is {props.house} </Text>
        <Text> An Image would go here </Text>
        <Text> Navigation to the home </Text>
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
    fontWeight: 'bold'
  }
});
