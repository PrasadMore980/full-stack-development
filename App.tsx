import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AuthenticationCard } from './src/components/AuthenticationCard';
import { BusinessOperationsCard } from './src/components/BusinessOperationsCard';
import { DeviceInfoCard } from './src/components/DeviceInfoCard';
import { ConfigurationCard } from './src/components/ConfigurationCard';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Logic App</Text>
        <Text style={styles.headerSubtitle}>Turbo Module Integration Demo</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentication Section */}
        <AuthenticationCard />

        {/* Business Operations Section */}
        <BusinessOperationsCard />

        {/* Device Information Section */}
        <DeviceInfoCard />

        {/* Configuration Section */}
        <ConfigurationCard />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This app demonstrates Turbo Module integration with private iOS CocoaPods and Android Maven dependencies.
          </Text>
          <Text style={styles.footerNote}>
            Replace the mock implementations in the native modules with your actual private framework calls.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    padding: 20,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  footerNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});

export default App;