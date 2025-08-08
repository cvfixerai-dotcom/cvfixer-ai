import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://omoxedxrdaqneyemcucl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tb3hlZHhyZGFxbmV5ZW1jdWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTU1ODIsImV4cCI6MjA2OTI3MTU4Mn0.0ziGHRurMjIkiqGcNfXGl2F6Yi-mMs-Of8XdHIL5CQ8'

export const supabase = createClient(supabaseUrl, supabaseKey)