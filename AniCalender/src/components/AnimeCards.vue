<template>
<div class="anime-card">
  <div class="image">
    <img :src="animeInfo?.imageUrl" alt="image" />
  </div>
  <div class="anime-title">
    <h3>{{ animeInfo?.titleEnglish }}</h3>
  </div>

  <div class="anime-details">
    <p><strong>Rating:</strong> {{ animeInfo?.rating }}</p>
    <p><strong>Episodes:</strong> {{ animeInfo?.episodes }}</p>
    <p><strong>Score:</strong>{{ animeInfo.malScore }}</p>
    <p v-if="animeInfo?.airdate"><strong>Airdate:</strong> {{ formatAirdate(animeInfo.airdate) }}</p>
    <p v-if="animeInfo?.broadcast"><strong>Broadcast:</strong> {{ animeInfo?.broadcast }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
//import { on } from 'events';
import {  defineProps ,ref , computed, watch} from 'vue';

//making an interface for the anime prop
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
const props = defineProps<{
  anime: Anime ;
}>();
// const emit =defineEmits<{
//   (e: 'selectAnime', anime: Anime): void;
// }>();
const error=ref<Error|null>(null);
const animeInfo = computed(() => props.anime);
const formatAirdate = (airdate: string | number | Date | null | undefined) => {
  if (!airdate) return "N/A";
  const date = new Date(airdate);
  return date.toUTCString();
};
// function animeSelected(){
//   emit('selectAnime',animeInfo.value);
// }
function handleError(){
  if(props.anime===null ||
  props.anime===undefined ||
  Object.keys(props.anime).length===0 ||
  props.anime.imageUrl===null ||
  props.anime.imageUrl===undefined ||
  props.anime.titleEnglish===null ){
    error.value=new Error("Anime data is not available");
  }

}
//watch for changes in the anime prop
watch(() => props.anime, () => handleError(), { immediate: true });

</script>

<style scoped>

</style>
