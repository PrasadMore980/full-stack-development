import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import type { DeviceInfo } from '../types/BusinessLogic';

export const DeviceInfoCard: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  const { loading, error, getDeviceInfo, logEvent } = useBusinessLogic();

  const handleGetDeviceInfo = async () => {
    const info = await getDeviceInfo();
    if (info) {
      setDeviceInfo(info);
      // Log the device info retrieval event
      await logEvent('device_info_retrieved', {
        platform: info.platform,
        version: info.version,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleTestLogging = async () => {
    await logEvent('test_event', {
      action: 'button_pressed',
      component: 'DeviceInfoCard',
      timestamp: new Date().toISOString(),
      userAgent: deviceInfo?.platform || 'unknown',
    });
  };

  useEffect(() => {
    handleGetDeviceInfo();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Device Information</Text>
      <Text style={styles.subtitle}>System and logging utilities</Text>

      {deviceInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platform:</Text>
            <Text style={styles.infoValue}>{deviceInfo.platform}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>{deviceInfo.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Model:</Text>
            <Text style={styles.infoValue}>{deviceInfo.model}</Text>
          </View>
          {deviceInfo.name && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{deviceInfo.name}</Text>
            </View>
          )}
          {deviceInfo.manufacturer && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Manufacturer:</Text>
              <Text style={styles.infoValue}>{deviceInfo.manufacturer}</Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleGetDeviceInfo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Refresh Device Info</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={handleTestLogging}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>Test Event Logging</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});