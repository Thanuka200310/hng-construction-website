import { createClient } from "@supabase/supabase-js";

const supabaseUrl ="https://kfdfsmppxkccunipqmbf.supabase.co";
const supabaseAnonKey ="sb_publishable_6RrGaJXcg7ucVmJ-2o6yaw_guAim70W";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);