import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([
    { id: '1', name: 'Oil Change', price: '₹299', duration: '30 min', icon: '🛢️', color: '#FFE5CC' },
    { id: '2', name: 'AC Service', price: '₹499', duration: '1 hour', icon: '❄️', color: '#CCE5FF' },
    { id: '3', name: 'Battery Check', price: '₹99', duration: '15 min', icon: '🔋', color: '#E5FFCC' },
    { id: '4', name: 'Brake Service', price: '₹399', duration: '45 min', icon: '🛑', color: '#FFCCCC' },
  ]);

  const [userName, setUserName] = useState('Guest');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from API
      // const response = await axios.get(`${API_URL}/users/profile`);
      // setUserName(response.data.firstName);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('Booking', { service: item })}
    >
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDuration}>{item.duration}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Good {getTimeOfDay()}! 👋</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.subGreeting}>What service do you need?</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications" size={24} color="#FF6B35" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            <Text style={styles.viewAllLink}>View All →</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={services}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <Text style={styles.promoTitle}>First Booking?</Text>
          <Text style={styles.promoSubtitle}>Get 20% off on your first service</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Claim Offer</Text>
          </TouchableOpacity>
        </View>
        <Ionicons name="gift" size={60} color="#FF6B35" style={styles.promoIcon} />
      </View>

      {/* Recent Bookings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityStatus}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Oil Change - Completed</Text>
            <Text style={styles.activityDate}>June 5, 2025 • 2:30 PM</Text>
            <Text style={styles.activityVehicle}>Honda City • MH 01 AB 1234</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#ddd" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Service */}
      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="alert-circle" size={20} color="white" />
        <Text style={styles.emergencyText}>Emergency Service Available 24/7</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginTop: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationIcon: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  serviceCard: {
    backgroundColor: '#FFE5CC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 0,
  },
  promoBanner: {
    marginHorizontal: 16,
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 12,
  },
  promoIcon: {
    marginLeft: 20,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activityStatus: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  activityVehicle: {
    fontSize: 12,
    color: '#666',
  },
  emergencyButton: {
    marginHorizontal: 16,
    backgroundColor: '#f44336',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  emergencyText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
