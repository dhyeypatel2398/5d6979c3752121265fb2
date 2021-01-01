import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'false',
      text: '',
      data: [],
    }
  }

  random = () => {

    fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=WmhBwH1RkksrWYwHqChKma5PUbNyQJcQGTy4HJkr')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.near_earth_objects });
        console.log(this.state.data)

      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });

  }
  render() {
    const { text, data } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView behavior={Platform.OS=="ios"?"padding":"height"}>
          <ScrollView showsVerticalScrollIndicator ={false}>
        <Row style={{ marginTop: "50%" }}>
          <TextInput style={styles.TextInput}
            placeholder="Enter Asteroid ID"
            onChangeText={(text) => this.setState({ text })}
            value={text}
          >

          </TextInput>
        </Row>
        {text == "" ? (
          <View>

          </View>
        ) : (

            <Row style={styles.ButtonRow}>
              <TouchableOpacity style={styles.Button}>
                <Text style={styles.RandomText}>Submit</Text>
              </TouchableOpacity>
            </Row>

          )}


        <Row style={styles.ButtonRow}>
          <TouchableOpacity style={styles.Button} onPress={() => this.random()}>
            <Text style={styles.RandomText}>Random Asteroid</Text>
          </TouchableOpacity>
        </Row>

        <Row style={styles.ButtonRow}>
          <Col>
            <Text>Name:</Text>
          </Col>
          <Col>
            <Text>{data.absolute_magnitude_h}</Text>
          </Col>
        </Row>
        <Row style={styles.ButtonRow}>
          <Col>
            <Text>nasa_jpl_url:</Text>
          </Col>
          <Col>
            <Text>{data.absolute_magnitude_h}</Text>
          </Col>
        </Row>
        <Row style={styles.ButtonRow}>
          <Col>
            <Text>is_potentially_hazardous_asteroid:</Text>
          </Col>
          <Col>
            <Text>{data.absolute_magnitude_h}</Text>
          </Col>
        </Row>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {

    borderWidth: 1,
    height: 30,
    width: "98%",
    // marginRight: 20,
    marginLeft:5
  },
  ButtonRow: {
    marginTop: "15%",
    height: 30,
  },
  Button: {
    width: "98%",
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: "center",
    marginLeft: 3
  },
  RandomText: {
    textAlign: 'center',
    color: '#fff'
  }
});
