<template>
  <div class="fetching-anime">
    <p v-if="loading">Loading anime data...</p>
    <p v-if="error">{{ error.message }}</p>

  </div>
  <div aria-hidden="true"></div>
</template>


<script setup lang="ts">
import {  watch,ref ,onMounted} from 'vue';

const animeRequest=defineProps<{
    season?:string;
    year?:number;
    name?:string;


}>()
const emit=defineEmits<{
  (e:'dataFetched',data : JSON ):void;
  (e:'loading',loading:boolean):void;
  (e:'error',error:Error|null):void;
}>();
const loading=ref<boolean>(true);
const error=ref<Error|null>(null);
function buildUrl() {
  if (animeRequest.name) return `http://localhost:3000/anime/search/${encodeURIComponent(animeRequest.name)}`;
  if (animeRequest.year && animeRequest.season) return `http://localhost:3000/anime/${animeRequest.year}/${animeRequest.season}`;
  return `http://localhost:3000/anime/current-season`;
}




async function fetchAnimeData(){
  const callbackurl=await fetch(buildUrl());
  if(!callbackurl.ok){
    error.value=new Error("Failed to fetch anime data");
    return;
  }
  try{
    const data=await callbackurl.json();
    loading.value=true;
    emit('dataFetched',data);
    console.log(data);
  }catch(err){
    error.value = err instanceof Error ? err : new Error(String(err));
  }finally{
    loading.value=false;// set loading to false after fetch is done

  }

}
//Watch the props and re-fetch when they change.
// Using { immediate: true } makes it run on mount, replacing onMounted.
watch(
  () => [animeRequest.name, animeRequest.season, animeRequest.year],
  () => {
    fetchAnimeData();
  },
  { immediate: true }
);


//fetch anime data when component is mounted
onMounted(()=>{
  //fetch anime data here
  fetchAnimeData();
});

//Expose loading, error, and fetchAnimeData to parent components
defineExpose({
  loading,
  error,
  fetchAnimeData,
  emit


});

</script>


<style scoped>


.fetching-anime{
  padding:16px;
}
.fetching-anime p{
  font-size:18px;
  color:#333;
}
.fetching-anime .loading{
  font-style:italic;
  color: blue;
}
.fetching-anime .error{
  color:red;
}

</style>
