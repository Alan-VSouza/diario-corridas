import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig!.extra!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
