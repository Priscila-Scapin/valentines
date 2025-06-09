import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fgvmeflhcwicxnhvvfhu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndm1lZmxoY3dpY3huaHZ2Zmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MzIwNzYsImV4cCI6MjA2NTAwODA3Nn0.QX9sJ_qz2OYf64-maFPu3OL0UuqbcH-CPrQMORvik_0'

export const supabase = createClient(supabaseUrl, supabaseKey)