import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  // Authentication methods
  authenticateUser(username: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  isUserAuthenticated(): Promise<boolean>;
  getCurrentUser(): Promise<string | null>;
  
  // Data management methods
  fetchUserData(userId: string): Promise<object>;
  updateUserProfile(userData: object): Promise<boolean>;
  syncData(): Promise<boolean>;
  
  // Business operations
  performBusinessOperation(operationType: string, parameters: object): Promise<object>;
  getBusinessMetrics(): Promise<object>;
  validateBusinessRules(data: object): Promise<boolean>;
  
  // Configuration methods
  getConfiguration(): Promise<object>;
  updateConfiguration(config: object): Promise<boolean>;
  
  // Utility methods
  getDeviceInfo(): Promise<object>;
  logEvent(eventName: string, parameters: object): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BusinessLogicModule');