import { useState, useCallback } from 'react';
import BusinessLogicModule from '../turbo-modules/NativeBusinessLogic';
import type {
  AuthCredentials,
  User,
  BusinessOperationParams,
  BusinessOperationResult,
  BusinessMetrics,
  AppConfiguration,
  DeviceInfo,
  LogEventParams,
} from '../types/BusinessLogic';

export const useBusinessLogic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Authentication Methods
  const authenticateUser = useCallback(async (credentials: AuthCredentials): Promise<boolean | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.authenticateUser(credentials.username, credentials.password)
    );
  }, [handleAsyncOperation]);

  const logout = useCallback(async (): Promise<void> => {
    await handleAsyncOperation(() => BusinessLogicModule.logout());
  }, [handleAsyncOperation]);

  const isUserAuthenticated = useCallback(async (): Promise<boolean | null> => {
    return handleAsyncOperation(() => BusinessLogicModule.isUserAuthenticated());
  }, [handleAsyncOperation]);

  const getCurrentUser = useCallback(async (): Promise<string | null> => {
    return handleAsyncOperation(() => BusinessLogicModule.getCurrentUser());
  }, [handleAsyncOperation]);

  // Data Management Methods
  const fetchUserData = useCallback(async (userId: string): Promise<User | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.fetchUserData(userId)
    ) as Promise<User | null>;
  }, [handleAsyncOperation]);

  const updateUserProfile = useCallback(async (userData: Partial<User>): Promise<boolean | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.updateUserProfile(userData)
    );
  }, [handleAsyncOperation]);

  const syncData = useCallback(async (): Promise<boolean | null> => {
    return handleAsyncOperation(() => BusinessLogicModule.syncData());
  }, [handleAsyncOperation]);

  // Business Operations
  const performBusinessOperation = useCallback(async (
    operationType: string, 
    parameters: BusinessOperationParams
  ): Promise<BusinessOperationResult | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.performBusinessOperation(operationType, parameters)
    ) as Promise<BusinessOperationResult | null>;
  }, [handleAsyncOperation]);

  const getBusinessMetrics = useCallback(async (): Promise<BusinessMetrics | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.getBusinessMetrics()
    ) as Promise<BusinessMetrics | null>;
  }, [handleAsyncOperation]);

  const validateBusinessRules = useCallback(async (data: any): Promise<boolean | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.validateBusinessRules(data)
    );
  }, [handleAsyncOperation]);

  // Configuration Methods
  const getConfiguration = useCallback(async (): Promise<AppConfiguration | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.getConfiguration()
    ) as Promise<AppConfiguration | null>;
  }, [handleAsyncOperation]);

  const updateConfiguration = useCallback(async (config: Partial<AppConfiguration>): Promise<boolean | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.updateConfiguration(config)
    );
  }, [handleAsyncOperation]);

  // Utility Methods
  const getDeviceInfo = useCallback(async (): Promise<DeviceInfo | null> => {
    return handleAsyncOperation(() => 
      BusinessLogicModule.getDeviceInfo()
    ) as Promise<DeviceInfo | null>;
  }, [handleAsyncOperation]);

  const logEvent = useCallback(async (eventName: string, parameters: LogEventParams): Promise<void> => {
    await handleAsyncOperation(() => 
      BusinessLogicModule.logEvent(eventName, parameters)
    );
  }, [handleAsyncOperation]);

  return {
    loading,
    error,
    // Authentication
    authenticateUser,
    logout,
    isUserAuthenticated,
    getCurrentUser,
    // Data Management
    fetchUserData,
    updateUserProfile,
    syncData,
    // Business Operations
    performBusinessOperation,
    getBusinessMetrics,
    validateBusinessRules,
    // Configuration
    getConfiguration,
    updateConfiguration,
    // Utilities
    getDeviceInfo,
    logEvent,
  };
};