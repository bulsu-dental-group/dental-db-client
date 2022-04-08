import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://ynsmkmgnjzkmfnwyybua.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluc21rbWduanprbWZud3l5YnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc0MzU4OTQsImV4cCI6MTk2MzAxMTg5NH0.192LQOyJOendtXEZ1JbM_1hYgyM6tGQTz-g_XUW_wa0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {localStorage: AsyncStorage})