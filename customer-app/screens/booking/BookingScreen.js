import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

export default function BookingScreen({ route, navigation }) {
  const { service } = route.params;
  const [step, setStep] = useState(1); // 1: Vehicle, 2: Date, 3: Time, 4: Address, 5: Review
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const vehicles = [
    { id: '1', name: 'Honda City', plate: 'MH 01 AB 1234', brand: 'Honda' },
    { id: '2', name: 'Maruti Swift', plate: 'MH 01 CD 5678', brand: 'Maruti' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  ];

  const nextDates = Array.from({ length: 7 }, (_, i) =>
    moment().add(i + 1, 'days')
  );

  const handleBooking = async () => {
    if (!selectedVehicle || !selectedDate || !selectedTime || !address) {
      Alert.alert('Error', 'Please fill all details');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        vehicle: selectedVehicle.id,
        service: service.id,
        scheduledDate: selectedDate.format('YYYY-MM-DD'),
        timeSlot: { startTime: selectedTime, endTime: selectedTime },
        serviceLocation: { street: address, city: '', state: '', zipCode: '' },
        totalAmount: service.price,
      };

      // const response = await axios.post(`${API_URL}/bookings`, bookingData);
      // if (response.status === 200) {
      navigation.navigate('Payment', {
        service,
        vehicle: selectedVehicle,
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedTime,
        address,
        amount: service.price,
      });
      // }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressBar}>
      {[1, 2, 3, 4, 5].map((s) => (
        <View
          key={s}
          style={[
            styles.progressStep,
            {
              backgroundColor: s <= step ? '#FF6B35' : '#e0e0e0',
              flex: 1,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderProgressBar()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step 1: Select Vehicle */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select Your Vehicle</Text>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  selectedVehicle?.id === vehicle.id && styles.selectedCard,
                ]}
                onPress={() => {
                  setSelectedVehicle(vehicle);
                  setStep(2);
                }}
              >
                <View style={styles.vehicleIconContainer}>
                  <Ionicons name="car" size={24} color="#FF6B35" />
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ddd" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addVehicleButton}>
              <Ionicons name="add-circle-outline" size={20} color="#FF6B35" />
              <Text style={styles.addVehicleText}>Add New Vehicle</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select Date</Text>
            <FlatList
              data={nextDates}
              renderItem={({ item: date }) => (
                <TouchableOpacity
                  style={[
                    styles.dateCard,
                    selectedDate?.format('YYYY-MM-DD') === date.format('YYYY-MM-DD') &&
                      styles.selectedCard,
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setStep(3);
                  }}
                >
                  <Text style={styles.dateDay}>{date.format('DD')}</Text>
                  <Text style={styles.dateMonth}>{date.format('MMM')}</Text>
                  <Text style={styles.dateDayName}>{date.format('ddd')}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.format('YYYY-MM-DD')}
              horizontal
              scrollEnabled={false}
              contentContainerStyle={styles.dateGrid}
            />
          </View>
        )}

        {/* Step 3: Select Time */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select Time Slot</Text>
            <FlatList
              data={timeSlots}
              renderItem={({ item: time }) => (
                <TouchableOpacity
                  style={[
                    styles.timeCard,
                    selectedTime === time && styles.selectedCard,
                  ]}
                  onPress={() => {
                    setSelectedTime(time);
                    setStep(4);
                  }}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.timeGrid}
            />
          </View>
        )}

        {/* Step 4: Enter Address */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Service Location</Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter service address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
              multiline
            />
            <TouchableOpacity style={styles.useCurrentLocationButton}>
              <Ionicons name="location" size={16} color="#FF6B35" />
              <Text style={styles.useLocationText}>Use Current Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.nextButton, !address && styles.buttonDisabled]}
              onPress={() => setStep(5)}
              disabled={!address}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Review Booking</Text>
            <View style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Service</Text>
                <Text style={styles.reviewValue}>{service.name}</Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Vehicle</Text>
                <Text style={styles.reviewValue}>{selectedVehicle?.name}</Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Date</Text>
                <Text style={styles.reviewValue}>
                  {selectedDate?.format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Time</Text>
                <Text style={styles.reviewValue}>{selectedTime}</Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Location</Text>
                <Text style={styles.reviewValue} numberOfLines={2}>
                  {address}
                </Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Duration</Text>
                <Text style={styles.reviewValue}>{service.duration}</Text>
              </View>
              <View style={[styles.reviewRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalPrice}>₹{service.price}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBooking}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="card" size={18} color="white" />
                  <Text style={styles.bookButtonText}>Proceed to Payment</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setStep(1)}
            >
              <Text style={styles.editButtonText}>Edit Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      {step > 1 && step < 5 && (
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  progressStep: {
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F0',
  },
  vehicleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFE5CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 12,
    color: '#999',
  },
  addVehicleButton: {
    backgroundColor: '#FFF5F0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
  },
  addVehicleText: {
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 8,
  },
  dateGrid: {
    gap: 8,
  },
  dateCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 0.145,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  dateDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateMonth: {
    fontSize: 11,
    color: '#999',
    marginVertical: 2,
  },
  dateDayName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  timeGrid: {
    gap: 8,
  },
  timeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  addressInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  useCurrentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 16,
  },
  useLocationText: {
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 8,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  reviewRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reviewLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  reviewValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});
