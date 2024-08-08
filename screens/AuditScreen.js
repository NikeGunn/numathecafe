import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AuditScreen = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const savedOrders = JSON.parse(await AsyncStorage.getItem('orders')) || [];
      setOrders(savedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`Order Date: ${item.date}`}
        subtitle={`Total Items: ${item.totalItems}`}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        left={(props) => <MaterialCommunityIcons name="file-document-outline" size={24} color="#0965ef" />}
      />
      <Card.Content>
        <View style={styles.contentContainer}>
          <Text style={styles.itemText}>Vegetables: {item.vegetables}</Text>
          <Text style={styles.itemText}>Groceries: {item.groceries}</Text>
          <Text style={styles.itemText}>Meat: {item.meat}</Text>
          <Text style={styles.itemText}>Others: {item.others}</Text>
          <Text style={styles.itemText}>Bar: {item.bar}</Text>
          <Text style={styles.itemText}>Cafe: {item.cafe}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default AuditScreen;
