import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://oakajmwzstobkfmpdgnm.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2FqbXd6c3RvYmtmbXBkZ25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4ODAwNTYsImV4cCI6MTk4NDQ1NjA1Nn0.HfVxeDDztWzyuCRncseILWSB0Ob9VCXnqrVEjFuKVVg"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
            .select("*");
        }
    }
}
function atualiza() {
    return {
        updateAllVideos() {
            return supabase
            .channel('*')
        }
    }
}

export const videoServices = {
    videoService,
    atualiza
}