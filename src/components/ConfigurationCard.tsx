import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import type { AppConfiguration } from '../types/BusinessLogic';

export const ConfigurationCard: React.FC = () => {
  const [config, setConfig] = useState<AppConfiguration | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedConfig, setEditedConfig] = useState<Partial<AppConfiguration>>({});

  const { 
    loading, 
    error, 
    getConfiguration, 
    updateConfiguration 
  } = useBusinessLogic();

  const handleGetConfiguration = async () => {
    const configuration = await getConfiguration();
    if (configuration) {
      setConfig(configuration);
      setEditedConfig(configuration);
    }
  };

  const handleUpdateConfiguration = async () => {
    if (!editedConfig) return;

    const success = await updateConfiguration(editedConfig);
    if (success) {
      setConfig({ ...config, ...editedConfig } as AppConfiguration);
      setEditMode(false);
      Alert.alert('Success', 'Configuration updated successfully!');
    } else {
      Alert.alert('Error', 'Failed to update configuration');
    }
  };

  const handleCancelEdit = () => {
    setEditedConfig(config || {});
    setEditMode(false);
  };

  useEffect(() => {
    handleGetConfiguration();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Configuration</Text>
      <Text style={styles.subtitle}>Manage app settings</Text>

      {config && (
        <View style={styles.configContainer}>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>API URL:</Text>
            {editMode ? (
              <TextInput
                style={styles.configInput}
                value={editedConfig.apiUrl || ''}
                onChangeText={(text) => setEditedConfig(prev => ({ ...prev, apiUrl: text }))}
                placeholder="API URL"
              />
            ) : (
              <Text style={styles.configValue}>{config.apiUrl}</Text>
            )}
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Timeout (seconds):</Text>
            {editMode ? (
              <TextInput
                style={styles.configInput}
                value={editedConfig.timeout?.toString() || ''}
                onChangeText={(text) => setEditedConfig(prev => ({ ...prev, timeout: parseInt(text) || 0 }))}
                placeholder="Timeout"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.configValue}>{config.timeout}s</Text>
            )}
          </View>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Enable Logging:</Text>
            {editMode ? (
              <Switch
                value={editedConfig.enableLogging ?? false}
                onValueChange={(value) => setEditedConfig(prev => ({ ...prev, enableLogging: value }))}
              />
            ) : (
              <Text style={styles.configValue}>{config.enableLogging ? 'Yes' : 'No'}</Text>
            )}
          </View>
        </View>
      )}

      {editMode ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.successButton]} 
            onPress={handleUpdateConfiguration}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={handleCancelEdit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetConfiguration}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Refresh Config</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => setEditMode(true)}
            disabled={loading || !config}
          >
            <Text style={styles.secondaryButtonText}>Edit Config</Text>
          </TouchableOpacity>
        </View>
      )}

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
  configContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  configValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  configInput: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
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