import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

export default function ServicesScreen({ navigation }) {
  const [services, setServices] = useState([
    { id: '1', name: 'Oil Change', category: 'Maintenance', price: 299, duration: '30 mins', description: 'Regular oil change and filter replacement' },
    { id: '2', name: 'AC Service', category: 'Maintenance', price: 499, duration: '1 hour', description: 'AC gas refill and cooling check' },
    { id: '3', name: 'Battery Check', category: 'Inspection', price: 99, duration: '15 mins', description: 'Battery health and charging test' },
    { id: '4', name: 'Brake Service', category: 'Maintenance', price: 399, duration: '45 mins', description: 'Brake pad replacement and alignment' },
    { id: '5', name: 'Car Wash', category: 'Maintenance', price: 199, duration: '30 mins', description: 'Full exterior and interior wash' },
    { id: '6', name: 'Tire Rotation', category: 'Maintenance', price: 249, duration: '45 mins', description: 'Tire rotation and balancing' },
  ]);

  const [filteredServices, setFilteredServices] = useState(services);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Maintenance', 'Repair', 'Inspection', 'Accessories'];

  useEffect(() => {
    filterServices();
  }, [searchText, selectedCategory]);

  const filterServices = () => {
    let filtered = services;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => navigation.navigate('Booking', { service: item })}
    >
      <View style={styles.serviceIconContainer}>
        <Ionicons name="wrench" size={24} color="#FF6B35" />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceDetails}>
          <Ionicons name="time" size={12} color="#999" />
          <Text style={styles.serviceDetail}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{item.price}</Text>
        <Ionicons name="chevron-forward" size={20} color="#FF6B35" />
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === category && styles.categoryChipTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(renderCategoryChip)}
        </ScrollView>

        {/* Services List */}
        {loading ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator size="large" color="#FF6B35" />
          </View>
        ) : filteredServices.length > 0 ? (
          <FlatList
            data={filteredServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryContainer: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  categoryChipTextActive: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  serviceItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFE5CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetail: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});
