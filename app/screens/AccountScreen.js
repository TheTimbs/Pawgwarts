import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';

const menuItems = [
  {
    title: 'My Trainings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.blue,
    },
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
  },
  {
    title: 'My Dogs',
    icon: {
      name: 'dog',
      backgroundColor: colors.primary,
    },
  },
];

function AccountScreen(props) {
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
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
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
