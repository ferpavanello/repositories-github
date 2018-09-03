import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import Repo from "./src/components/Repo";
import NewRepoModal from "./src/components/NewRepoModal";

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: []
  };

  async componentDidMount() {
    const repos =
      JSON.parse(await AsyncStorage.getItem("@Repositories:reposGitHub")) || [];

    this.setState({ repos });
  }

  _addRepository = async newRepoText => {
    const repoCall = await fetch(`http://api.github.com/repos/${newRepoText}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login
    };

    this.setState({
      modalVisible: false,
      repos: [...this.state.repos, repository]
    });

    await AsyncStorage.setItem(
      "@Repositories:reposGitHub",
      JSON.stringify(this.state.repos)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Repositories</Text>
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.repoList}>
          {this.state.repos.map(repo => (
            <Repo key={repo.id} data={repo} />
          ))}
        </ScrollView>

        <NewRepoModal
          onCancel={() => this.setState({ modalVisible: false })}
          onAdd={this._addRepository}
          visible={this.state.modalVisible}
        />
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
