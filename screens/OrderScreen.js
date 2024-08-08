import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, StatusBar, Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as Updates from 'expo-updates';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../src/components/InputField';
import PDFShareButton from '../src/components/PDFShareButton';
import PDFShareStatus from '../src/components/PDFShareStatus';
import styles from '../styles';

const OrderScreen = () => {
  const [vegetables, setVegetables] = useState('');
  const [groceries, setGroceries] = useState('');
  const [meat, setMeat] = useState('');
  const [others, setOthers] = useState('');
  const [bar, setBar] = useState('');
  const [cafe, setCafe] = useState('');
  const [shared, setShared] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [checkingForUpdates, setCheckingForUpdates] = useState(true);

  useEffect(() => {
    const checkForUpdates = async () => {
      if (Platform.OS !== 'web' && !__DEV__) {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            Alert.alert(
              "Update Available",
              "A new update is available. The app will restart to apply the update.",
              [{ text: "OK", onPress: () => Updates.reloadAsync() }]
            );
          }
        } catch (error) {
          console.error("Error checking for updates", error);
        } finally {
          setCheckingForUpdates(false);
        }
      } else {
        setCheckingForUpdates(false);
      }
    };

    checkForUpdates();
    setAnimationStarted(true);
  }, []);

  const countItems = (items) => {
    return items.split(',').filter(item => item.trim() !== '').length;
  };

  const generateSection = (title, items) => {
    const itemsArray = items.split(',').map(item => item.trim()).filter(item => item !== '');
    return `
      <div>
        <h2>${title}</h2>
        <ul class="item-list">
          ${itemsArray.map(item => {
            const [name, quantity] = item.split(':');
            return `
              <li class="item">
                <div class="itemName">${name}</div>
                <div class="itemQuantity">${quantity}</div>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
  };

  const generateHTMLContent = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 10px; width: 227px; font-size: 12px; color: #333; background-color: #f5f5f5; }
            .container { background-color: #fff; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 16px; text-align: center; margin-bottom: 10px; font-weight: bold; color: #0965ef; }
            .date-time-container { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .date, .time { color: #666; }
            .day { text-align: center; margin-bottom: 10px; color: #666; }
            .blue-border { border-bottom: 2px solid #0965ef; padding-bottom: 5px; margin-bottom: 10px; }
            h2 { font-size: 14px; margin: 10px 0; font-weight: bold; color: #0965ef; }
            .item-list { list-style-type: none; padding: 0; margin: 0; }
            .item { margin: 5px 0; padding: 8px 0; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
            .itemName { flex: 1; }
            .itemQuantity { text-align: right; white-space: nowrap; font-weight: bold; }
            .total { margin-top: 15px; font-size: 14px; font-weight: bold; text-align: right; color: #0965ef; border-top: 2px solid #0965ef; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>HOTEL BANJARA INN</h1>
            <div class="date-time-container">
              <div class="date">Date: ${date}</div>
              <div class="time">Time: ${time}</div>
            </div>
            <div class="day">${day}</div>
            <div class="blue-border"></div>
            ${vegetables ? generateSection('Vegetables', vegetables) : ''}
            ${groceries ? generateSection('Groceries', groceries) : ''}
            ${meat ? generateSection('Meat', meat) : ''}
            ${others ? generateSection('Others', others) : ''}
            ${bar ? generateSection('Bar', bar) : ''}
            ${cafe ? generateSection('Cafe', cafe) : ''}
            <div class="total">
              Total Items: ${[vegetables, groceries, meat, others, bar, cafe]
                .map(items => countItems(items))
                .reduce((acc, count) => acc + count, 0)}
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleGenerateAndSharePDF = async () => {
    try {
      const orderData = {
        vegetables,
        groceries,
        meat,
        others,
        bar,
        cafe,
        date: new Date().toLocaleDateString(),
        totalItems: [vegetables, groceries, meat, others, bar, cafe]
          .map(items => countItems(items))
          .reduce((acc, count) => acc + count, 0),
      };

      const htmlContent = generateHTMLContent();
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      const result = await Sharing.shareAsync(uri);
      
      if (result && result.action === Sharing.SharingAction.SHARE) {
        const savedOrders = JSON.parse(await AsyncStorage.getItem('orders')) || [];
        savedOrders.push(orderData);
        await AsyncStorage.setItem('orders', JSON.stringify(savedOrders));
        setShared(true);
      } else {
        setShared(false);
        console.log('Sharing was canceled or failed.');
      }
    } catch (error) {
      console.error(error);
      setShared(false);
    }
  };

  if (checkingForUpdates) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0965ef" />
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Animatable.View
              animation={animationStarted ? "fadeInDown" : undefined}
              duration={1000}
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons name="silverware-fork-knife" size={80} color="#0965ef" />
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
                  subtitle="Please enter vegetables, groceries, meat, bar, cafe, and other items with quantities"
                  subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                  <InputField
                    label="Vegetables (item:quantity, comma separated)"
                    value={vegetables}
                    onChange={setVegetables}
                    icon="carrot"
                    placeholder="e.g., Carrot:3, Tomato:5"
                  />
                  <InputField
                    label="Groceries (item:quantity, comma separated)"
                    value={groceries}
                    onChange={setGroceries}
                    icon="food-apple"
                    placeholder="e.g., Rice:2, Sugar:1"
                    delay={200}
                  />
                  <InputField
                    label="Meat (item:quantity, comma separated)"
                    value={meat}
                    onChange={setMeat}
                    icon="cow"
                    placeholder="e.g., Chicken:1, Mutton:2"
                    delay={400}
                  />
                  <InputField
                    label="Bar (item:quantity, comma separated)"
                    value={bar}
                    onChange={setBar}
                    icon="glass-cocktail"
                    placeholder="e.g., Whiskey:1, Vodka:2"
                    delay={600}
                  />
                  <InputField
                    label="Cafe (item:quantity, comma separated)"
                    value={cafe}
                    onChange={setCafe}
                    icon="coffee"
                    placeholder="e.g., Espresso:2, Latte:1"
                    delay={800}
                  />
                  <InputField
                    label="Others (item:quantity, comma separated)"
                    value={others}
                    onChange={setOthers}
                    icon="dots-horizontal"
                    placeholder="e.g., Salt:2, Oil:1"
                    delay={1000}
                  />
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <PDFShareButton onPress={handleGenerateAndSharePDF} />
                </Card.Actions>
              </Card>
              <PDFShareStatus shared={shared} />
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderScreen;
