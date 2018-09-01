import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import Repo from "./src/components/Repo";

export default class App extends Component {
  state = {
    repos: [
      {
        id: 1,
        thumbnail:
          "https://avatars0.githubusercontent.com/u/19414947?s=400&u=67c25fee9392fd19f064902a6b9762b330720205&v=4",
        title: "teste",
        author: "salve"
      },
      {
        id: 2,
        thumbnail:
          "https://avatars0.githubusercontent.com/u/19414947?s=400&u=67c25fee9392fd19f064902a6b9762b330720205&v=4",
        title: "again",
        author: "salvo"
      },
      {
        id: 3,
        thumbnail:
          "https://avatars0.githubusercontent.com/u/19414947?s=400&u=67c25fee9392fd19f064902a6b9762b330720205&v=4",
        title: "ahhh",
        author: "ops"
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dale React Native!!</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.repoList}>
          {this.state.repos.map(repo => (
            <Repo key={repo.id} data={repo} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },

  header: {
    height: 70,
    paddingTop: 20,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },

  headerButton: {
    fontSize: 24,
    fontWeight: "bold"
  },

  headerText: {
    fontSize: 26,
    fontWeight: "bold"
  },

  repoList: {
    padding: 20
  }
});
