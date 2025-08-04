import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import type { BusinessMetrics } from '../types/BusinessLogic';

export const BusinessOperationsCard: React.FC = () => {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  const [operationResult, setOperationResult] = useState<string>('');

  const { 
    loading, 
    error, 
    performBusinessOperation, 
    getBusinessMetrics, 
    validateBusinessRules,
    syncData,
  } = useBusinessLogic();

  const handleGetMetrics = async () => {
    const result = await getBusinessMetrics();
    if (result) {
      setMetrics(result);
      Alert.alert('Success', 'Business metrics retrieved successfully!');
    }
  };

  const handleBusinessOperation = async (operationType: string) => {
    const parameters = {
      timestamp: new Date().toISOString(),
      source: 'mobile_app',
      version: '1.0.0',
    };

    const result = await performBusinessOperation(operationType, parameters);
    if (result) {
      setOperationResult(`${result.operationType}: ${result.result}`);
      Alert.alert('Operation Complete', result.result);
    }
  };

  const handleValidateRules = async () => {
    const testData = {
      userId: '12345',
      amount: 1000,
      currency: 'USD',
      timestamp: new Date().toISOString(),
    };

    const isValid = await validateBusinessRules(testData);
    Alert.alert(
      'Validation Result', 
      `Business rules validation: ${isValid ? 'PASSED' : 'FAILED'}`
    );
  };

  const handleSyncData = async () => {
    const success = await syncData();
    Alert.alert(
      'Data Sync', 
      success ? 'Data synchronized successfully!' : 'Data sync failed!'
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Business Operations</Text>
      <Text style={styles.subtitle}>Test your business logic methods</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Metrics</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetMetrics}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Get Business Metrics</Text>
            )}
          </TouchableOpacity>

          {metrics && (
            <View style={styles.metricsContainer}>
              <Text style={styles.metricsText}>Total Users: {metrics.totalUsers}</Text>
              <Text style={styles.metricsText}>Active Users: {metrics.activeUsers}</Text>
              <Text style={styles.metricsText}>Revenue: ${metrics.revenue.toLocaleString()}</Text>
            </View>
          )}
        </View>

        {/* Operations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Operations</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => handleBusinessOperation('PROCESS_PAYMENT')}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Process Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => handleBusinessOperation('GENERATE_REPORT')}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Generate Report</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => handleBusinessOperation('UPDATE_INVENTORY')}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Update Inventory</Text>
          </TouchableOpacity>

          {operationResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{operationResult}</Text>
            </View>
          )}
        </View>

        {/* Validation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Validation</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.warningButton]} 
            onPress={handleValidateRules}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Validate Business Rules</Text>
          </TouchableOpacity>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Data Management</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.infoButton]} 
            onPress={handleSyncData}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Sync Data</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
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
    maxHeight: 500,
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  infoButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  metricsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  metricsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  resultContainer: {
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});