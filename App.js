import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as Animatable from 'react-native-animatable';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const App = () => {
  const [vegetables, setVegetables] = useState('');
  const [groceries, setGroceries] = useState('');
  const [meat, setMeat] = useState('');
  const [others, setOthers] = useState('');
  const [shared, setShared] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const handleGenerateAndSharePDF = async () => {
    try {
      const parseItems = (items) => {
        return items.split(',').map(item => {
          const [name, quantity] = item.split(':').map(str => str.trim());
          return { name, quantity: quantity || '1' };
        });
      };

      const htmlContent = `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 10px; 
              width: 227px; 
              font-size: 12px; 
              color: #333; 
              background-color: #f5f5f5;
            }
            .container {
              background-color: #fff; 
              border-radius: 8px; 
              padding: 15px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 { 
              font-size: 16px; 
              text-align: center; 
              margin-bottom: 10px; 
              font-weight: bold;
              color: #4CAF50;
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 5px;
            }
            h2 { 
              font-size: 14px; 
              margin: 10px 0; 
              font-weight: bold;
              color: #4CAF50;
            }
            .item-list {
              list-style-type: none; 
              padding: 0; 
              margin: 0; 
            }
            .item {
              margin: 5px 0; 
              padding: 8px 0;
              border-bottom: 1px solid #ddd;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .itemName {
              flex: 1;
            }
            .itemQuantity {
              text-align: right;
              white-space: nowrap;
              font-weight: bold;
            }
            .total { 
              margin-top: 15px; 
              font-size: 14px; 
              font-weight: bold; 
              text-align: right; 
              color: #4CAF50;
              border-top: 2px solid #4CAF50;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>HOTEL BANJARA INN</h1>
            <h2>Vegetables</h2>
            <ul class="item-list">
              ${vegetables.split(',').map(veg => {
                const [name, quantity] = veg.split(':').map(part => part.trim());
                return `<li class="item"><span class="itemName">${name}</span><span class="itemQuantity">${quantity || 'N/A'}</span></li>`;
              }).join('')}
            </ul>
            <h2>Groceries</h2>
            <ul class="item-list">
              ${groceries.split(',').map(grocery => {
                const [name, quantity] = grocery.split(':').map(part => part.trim());
                return `<li class="item"><span class="itemName">${name}</span><span class="itemQuantity">${quantity || 'N/A'}</span></li>`;
              }).join('')}
            </ul>
            <h2>Meat</h2>
            <ul class="item-list">
              ${meat.split(',').map(meatItem => {
                const [name, quantity] = meatItem.split(':').map(part => part.trim());
                return `<li class="item"><span class="itemName">${name}</span><span class="itemQuantity">${quantity || 'N/A'}</span></li>`;
              }).join('')}
            </ul>
            <h2>Others</h2>
            <ul class="item-list">
              ${others.split(',').map(other => {
                const [name, quantity] = other.split(':').map(part => part.trim());
                return `<li class="item"><span class="itemName">${name}</span><span class="itemQuantity">${quantity || 'N/A'}</span></li>`;
              }).join('')}
            </ul>
            <div class="total">
              Total Items: ${vegetables.split(',').length + groceries.split(',').length + meat.split(',').length + others.split(',').length}
            </div>
          </div>
        </body>
      </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
      setShared(true);
    } catch (error) {
      console.error(error);
      if (error.message.includes('User did not share')) {
        console.log('Sharing was canceled by the user.');
      } else {
        console.log('An unexpected error occurred.');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Animatable.View
              animation={animationStarted ? "fadeInDown" : undefined}
              duration={1000}
              style={styles.appbar}
            >
            </Animatable.View>
            <Animatable.View
              animation={animationStarted ? "fadeInDown" : undefined}
              duration={1000}
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons 
                name="silverware-fork-knife" 
                size={80} 
                color="#4CAF50" 
              />
            </Animatable.View>
            <Animatable.View
              animation={animationStarted ? "slideInLeft" : undefined}
              duration={1000}
              style={styles.centeredContainer}
            >
              <Card style={styles.card}>
                <Card.Title 
                  title="Input Order Details" 
                  titleStyle={styles.cardTitle}
                  subtitle="Please enter vegetables, groceries, meat, and other items with quantities"
                  subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                  <Animatable.View
                    animation={animationStarted ? "fadeInRight" : undefined}
                    duration={1000}
                  >
                    <TextInput
                      label="Vegetables (item:quantity, comma separated)"
                      value={vegetables}
                      onChangeText={setVegetables}
                      style={styles.input}
                      mode="outlined"
                      theme={{ colors: { primary: '#4CAF50', underlineColor: 'transparent' } }}
                      left={<TextInput.Icon name="carrot" color="#4CAF50" />}
                      placeholder="e.g., Carrot:3, Tomato:5"
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation={animationStarted ? "fadeInLeft" : undefined}
                    duration={1000}
                    delay={200}
                  >
                    <TextInput
                      label="Groceries (item:quantity, comma separated)"
                      value={groceries}
                      onChangeText={setGroceries}
                      style={styles.input}
                      mode="outlined"
                      theme={{ colors: { primary: '#4CAF50', underlineColor: 'transparent' } }}
                      left={<TextInput.Icon name="food-apple" color="#4CAF50" />}
                      placeholder="e.g., Rice:2, Sugar:1"
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation={animationStarted ? "fadeInRight" : undefined}
                    duration={1000}
                    delay={400}
                  >
                    <TextInput
                      label="Meat (item:quantity, comma separated)"
                      value={meat}
                      onChangeText={setMeat}
                      style={styles.input}
                      mode="outlined"
                      theme={{ colors: { primary: '#4CAF50', underlineColor: 'transparent' } }}
                      left={<TextInput.Icon name="cow" color="#4CAF50" />}
                      placeholder="e.g., Chicken:1, Mutton:2"
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation={animationStarted ? "fadeInLeft" : undefined}
                    duration={1000}
                    delay={600}
                  >
                    <TextInput
                      label="Others (item:quantity, comma separated)"
                      value={others}
                      onChangeText={setOthers}
                      style={styles.input}
                      mode="outlined"
                      theme={{ colors: { primary: '#4CAF50', underlineColor: 'transparent' } }}
                      left={<TextInput.Icon name="dots-horizontal" color="#4CAF50" />}
                      placeholder="e.g., Salt:2, Oil:1"
                    />
                  </Animatable.View>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <Animatable.View
                    animation={animationStarted ? "fadeInUp" : undefined}
                    duration={1000}
                    delay={800}
                  >
                    <Button 
                      mode="contained" 
                      onPress={handleGenerateAndSharePDF} 
                      style={styles.button}
                      labelStyle={styles.buttonText}
                      icon="share-variant"
                    >
                      <Text style={styles.text}>Share</Text>
                    </Button>
                  </Animatable.View>
                </Card.Actions>
              </Card>
              {shared && (
                <Animatable.View animation="fadeInUp" duration={800} style={styles.animation}>
                  <Text style={styles.sharedText}>PDF Shared Successfully!</Text>
                </Animatable.View>
              )}
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 120,
  },
  centeredContainer: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  cardActions: {
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
  },
  animation: {
    marginTop: 20,
    alignItems: 'center',
  },
  sharedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  text: {
    color: '#fff',
    fontSize: 18
  },
});

export default App;

