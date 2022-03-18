import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../components/lists';

const initialMessages = [
  {
    id: 1,
    title: 'Barkimedes',
    description: 'Hey! Is it time to play yet?',
    image: require('../assets/GermanShepPuppy.webp'),
  },
  {
    id: 2,
    title: 'Doggo',
    description:
      "I'm interested in this treat. When will you be able to give it?",
    image: require('../assets/GermanAdult.jpeg'),
  },
  {
    id: 3,
    title: 'Dogz',
    description:
      "I'm interested in this treat. When will you be able to give it?",
    image: require('../assets/GermanAdult.jpeg'),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('Message selected', item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: 'Doggo',
              description: 'I am refreshed',
              image: require('../assets/GermanAdult.jpeg'),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
