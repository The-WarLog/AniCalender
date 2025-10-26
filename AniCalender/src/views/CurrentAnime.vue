<template>
  <main class="current-anime">
  <FetchingAnime @data-fetched="handleDataFetched"/>

  <div v-if="loading" class="loading">Loading current season anime...</div>
  <div v-else-if="error" class="error">{{ error }} </div>
  <div v-else-if="animeList.length>0" class="anime-grid">
<AnimeCards
 v-for="(anime,index) in animeList"
 :key="index"
 :anime="anime"

/>
</div>
  <div v-else-if="!loading && !error" class="no-data">No anime data available for the current season.</div>
  </main>
</template>

<script setup lang="ts">
import AnimeCards from '@/components/AnimeCards.vue';
import FetchingAnime from '@/components/FetchingAnime.vue';
import { ref } from 'vue';
//making an interface for the anime prop
interface Anime {
  titleEnglish: string;
  imageUrl: string;
  status: string;
  rating: string;
  malScore?:number;
  episodes: number | null;
  airdate: string | number| null;
  broadcast: string | null;
}
//state to hold fetched anime data
const animeList=ref<Anime[]|null>(null);
const loading=ref<boolean>(true);
const error=ref<Error|null>(null);
//handler for data fetched event
function handleDataFetched(data): void {
  //fill animeList with fetched data
  loading.value=false;
  try {
    // Adjust based on API response structure
    if (Array.isArray(data)) {
      animeList.value = data;
    } else if (data.data && Array.isArray(data.data)) {
      animeList.value = data.data;
    } else if (data.anime && Array.isArray(data.anime)) {
      animeList.value = data.anime;
    } else {
      error.value = new Error('Unexpected data format');
      console.error('Unexpected data format:', data);
    }
  } catch (err) {
    error.value = new Error('Error processing fetched data');
    console.error(err);
  }
}

</script>

<style scoped>
.current-anime {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 28px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 40px 20px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
  background: #fef5f5;
  border: 1px solid #e74c3c;
  border-radius: 8px;
}

.loading {
  color: #3498db;
}

.no-data {
  color: #95a5a6;
}
</style>
