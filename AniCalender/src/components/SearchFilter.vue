<template>
  <main>
    <FetchingAnime :name="SearchQuery" @data-fetched="handleData" />
  </main>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
//import { useRouter } from 'vue-router';
import FetchingAnime from '@/components/FetchingAnime.vue';
//props
const props=defineProps<{
 SearchQuery?:string;
}>();
//defining the emits
const emit=defineEmits<{
  (e:'dataFetched',data : any ):void;
}>();
const loading=ref<boolean>(false);
const error=ref<Error|null>(null);

function handleData(data:any){
  try{
    loading.value=true;
    emit('data-fetched',data);
  }catch(err){
    error.value=err instanceof Error ? err : new Error(String(err));
  }finally{
    loading.value=false;
  }
}
</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 20px;
}
</style>
