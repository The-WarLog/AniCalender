<script setup lang="ts">
import NavBar from '@/views/NavBar.vue';
import {ref,provide}  from 'vue';

const searchQuery = ref<string>('');
provide('searchQuery', searchQuery);
</script>

<template>
  <main>
       <NavBar />

    <RouterView />

  </main>
</template>

<style scoped>


</style>
