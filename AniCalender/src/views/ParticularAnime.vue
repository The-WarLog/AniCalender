<template>
  <main>
    <SearchFilter :SearchQuery="searchQuery" @data-fetched="handleData" />

    <div v-if="loading" class="loading">Searching for anime...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="animeList.length > 0" class="anime-grid">
      <div class="results-count">
        <p>Found {{ animeList.length }} results</p>
      </div>
    </div>
    <AnimeCards
      v-for="(anime, index) in animeList"
      :key="index"
      :anime="anime"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute
import SearchFilter from '@/components/SearchFilter.vue';
import AnimeCards from '@/components/AnimeCards.vue';
interface Anime {
  titleEnglish: string;
  imageUrl: string;
  status: string;
  rating: string;
  malScore?:number;
  episodes: number | null;
  airdate: string| number| null;
  broadcast: string | null;

}
const route = useRoute();
const searchQuery = ref<string>('');
//const searchQuery=inject<Ref<string>>('')
const animeList=ref<Anime[]>([]);
const loading = ref<boolean>(false);
const error = ref<Error | null>(null);
function updateQueryFromRoute() {
  const nameFromRoute = route.params.name;
  if (typeof nameFromRoute === 'string') {
    searchQuery.value = nameFromRoute;
  }
}
// Watch the route for changes and update the query
// (This runs immediately to get the query on page load)
watch(() => route.params.name, updateQueryFromRoute, { immediate: true });
function handleData(data: any) {
  loading.value = false;
  error.value = null;
  // Accept different possible structures returned by your fetching logic
  if (Array.isArray(data)) {
    animeList.value = data;
  } else if (data && Array.isArray(data.data)) {
    animeList.value = data.data;
  } else if (data && Array.isArray(data.anime)) {
    animeList.value = data.anime;
  } else {
    // fallback: try to use data as an array or clear list
    if (Array.isArray(data)) {
      animeList.value = data;
    } else {
      animeList.value = [];
      // you can set an error message here if needed
    }
  }
}

</script>
