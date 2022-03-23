import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import { SignOut } from './SignOut';

const menuItems = [
  {
    title: 'My Trainings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.blue,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: 'My Dogs',
    icon: {
      name: 'dog',
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Christopher Cruz"
          subTitle="pawgwarts@gmail.com"
          image={require('../assets/ChrisPic.jpeg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      {/* <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=> SignOut()}
      /> */}
      <SignOut>SignOut</SignOut>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
