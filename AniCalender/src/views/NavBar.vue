
<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="left">
        <a class="site-logo" href="/current-season">Anime Calendar</a>
      </div>

      <div class="center">
        <nav class="navigation" aria-label="Main navigation">
          <ul>
            <li><a href="/current-season">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>

          </ul>
        </nav>
      </div>

      <div class="right">
        <div class="auth-links">
          <a class="signup" href="/signup">sign up</a>
          <a class="login" href="/login">log in</a>
        </div>
      </div>
    </div>
  </header>

  <div class="controls-container">
    <div class="controls-grid">
      <div class="control-group">
        <label for="name-search-input">Search by Name:</label>
      <form action="/search" class="input-row" @submit.prevent="performSearch">
    <input
      type="text"
      id="name-search-input"
      placeholder="e.g., 'Cowboy Bebop'"
      minlength="2"
      v-model="searchInput"
      @input="updateSearch"
    >

    <button id="name-search-btn" type="submit">Search</button>

    <slot :searchQuery="searchInput"></slot>
  </form>
      </div>

      <div class="control-group">
        <label for="year-select">Search by Season:</label>
        <div class="input-row">
          <select id="year-select" >
          <option v-for="year in compute" :key="year" :value="year">{{ year }}</option>
          </select>
          <select id="season-select">
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
          <button id="season-search-btn">Get Season</button>
        </div>
      </div>

      <div class="control-group">
        <label for="rating-select">Filter by Rating:</label>
        <select id="rating-select">
          <option value="">All</option>
          <option value="g">G - All Ages</option>
          <option value="pg">PG - Children</option>
          <option value="pg13">PG-13</option>
          <option value="r17">R - 17+</option>
          <option value="r">R+ (Mild Nudity)</option>
          <option value="rx">Rx (Hentai)</option>
        </select>
      </div>
    </div>
  </div>



</template>

<script lang="ts" setup>
import { computed,ref,Ref ,inject,watch} from 'vue';
import { useRouter } from 'vue-router';

//Search bar Values

const searchInput=ref<string>('');
const router=useRouter();
const start=1990;
const currentYear=new Date().getFullYear();
const searchQuery=inject<Ref<string>>('searchQuery');
const compute=computed(()=>{
  const years=[];
  for(let y=currentYear;y>=start;y--){
    years.push(y);
  }
  return years;
})
// keep local input in sync with the provided searchQuery (so input shows current value)
if (searchQuery && searchQuery.value) {
  searchInput.value = searchQuery.value;
}
watch(searchQuery, (val) => {
  if (typeof val === 'string') {
    // when parent / other components update the shared ref, update local input
    if (searchInput.value !== val) searchInput.value = val;
  } else if (val && 'value' in val) {
    if (searchInput.value !== val.value) searchInput.value = val.value;
  }
});

function updateSearch(){
  if(searchQuery){
    searchQuery.value=searchInput.value;
  }
}
function performSearch(){
  const query = searchInput.value.trim();

      if (query) {
        // Use Vue Router to push to the new route.
        // We use encodeURIComponent to make sure spaces or special
        // characters (like 'Cowboy Bebop') are safe for a URL.
        router.push('/anime/search/' + encodeURIComponent(query));
      }
}
</script>

<style >
:root{
  --header-height: 64px;
  --max-width: 1160px;
  --accent: #e54b4b;
  --muted: #666;
  --bg: rgba(255,255,255,0.95);
}

.site-header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background: var(--bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  height: var(--header-height);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

/* center the inner content and create three columns */
.header-inner{
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 16px;
  gap: 12px;
}

/* left / logo */
.left{
  display: flex;
  align-items: center;
}
.site-logo{
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  padding: 6px 10px;
  display: inline-block;
}

/* center navigation: take available space and center links */
.center{
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigation ul{
  display: flex;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navigation a{
  color: #222;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 4px;
}
.navigation a:hover{
  background: rgba(0,0,0,0.04);
}

/* right side: search + auth */
.right{
  display: flex;
  align-items: center;
  gap: 12px;
}
.site-search{
  display: flex;
  align-items: center;
  gap: 6px;
}
.site-search input{
  width: 180px;
  height: 34px;
  padding: 6px 10px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  outline: none;
  font-size: 13px;
}
.site-search button{
  height: 34px;
  padding: 0 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
}

/* auth links */
.auth-links a{
  margin-left: 8px;
  color: var(--muted);
  font-size: 13px;
  text-decoration: none;
}
.auth-links a.signup{
  color: var(--accent);
  font-weight: 600;
}

/* responsive: collapse center nav on small screens */
@media (max-width: 880px){
  .center{ display: flex; }
  .site-search input{ width: 120px; }
  .site-logo{ font-size: 18px; }
}

/* Controls section styling */
.controls-container{
  margin-top: calc(var(--header-height) + 20px);
  padding: 20px 16px;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}

.controls-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.control-group{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label{
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.input-row{
  display: flex;
  gap: 8px;
  align-items: center;
}

.control-group input[type="text"],
.control-group select{
  flex: 1;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
}

.control-group input[type="text"]:focus,
.control-group select:focus{
  border-color: var(--accent);
}

.control-group button{
  height: 38px;
  padding: 0 16px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}

.control-group button:hover{
  background: #d43d3d;
}

.control-group button:active{
  transform: scale(0.98);
}

/* responsive controls */
@media (max-width: 768px){
  .controls-grid{
    grid-template-columns: 1fr;
  }
  .input-row{
    flex-wrap: wrap;
  }
}
@media (max-width: 880px){
  .header-inner{ gap: 8px; padding: 0 10px; }
  .site-logo{ font-size: 18px; }

  /* don't hide the nav; allow horizontal scroll */
  .center{
    display: block;           /* was: display:none */
    flex: 1 1 auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;    /* Firefox: hide scrollbar */
  }
  .center::-webkit-scrollbar{ display: none; } /* WebKit: hide scrollbar */

  .navigation ul{
    display: inline-flex;     /* single row that can scroll */
    gap: 16px;
    padding: 8px 0;
    min-width: max-content;   /* ensures scroll when cramped */
  }
  .navigation a{
    font-size: 14px;
    padding: 6px 10px;
  }
}

</style>
