import 'dotenv/config';

export default {
  expo: {
    name: 'Diário de Corridas',
    slug: 'diario-corridas',
    version: '1.0.0',
    sdkVersion: '54.0.0',
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
