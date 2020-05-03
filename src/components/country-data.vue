<template>
<div>
  
  <div id="topSearch">

    <div id="search">
      <input v-model="query" id="filterCountry" type="text" placeholder="Search for a country..." />
      Search Query: {{ searchCriteria }}
    </div>

    <div id="dropdownFilter">
      <select v-model="selectedType" >
        <option value="">Default</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Polar">Polar</option>
      </select>
    </div>

  </div>
  
  <ul v-if="posts && posts.length" id="country-list"> 
    <li v-for="post in filteredCountries" v-bind:key="post+posts.key + Math.random()">
      <!-- Flag Icon -->
      <clazy-load :src=post.flag>
         
         <transition name="fade">
            <img :src=post.flag>
         </transition>

           <!-- The placeholder slot displays while the image is loading. -->
           <transition name="fade" slot="placeholder">
              <div slot="placeholder">
                
                Loading....
              </div>
            </transition>

      </clazy-load>

      <div class="content">
        <h2>{{post.name}}</h2>
        
        <p><strong>Population</strong> {{post.population}}</p>
        <p><strong>Region</strong> {{post.region}}</p>
        <p><strong>Capital</strong> {{post.capital}}</p>
        <router-link :to="{ name: 'Single', params: {countryname: post.name, population: post.population,region: post.region, capital:post.capital,flag:post.flag, nativeName: post.nativeName, currencies: post.currencies[0].code, borders: post.borders, subregion: post.subregion} }">View More Information</router-link>
      </div>

     </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      search: [],
      search2: [],
      query: '',
      selectedType: '',
    }
  },

  // Fetches posts when the component is created.
  created() { 
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    
  },
  computed: {
    searchCriteria: function() {
      if (this.query) {
        return this.search.concat(this.query);
      }
      return this.search;
    },

    searchCriteria2: function() {
      if (this.selectedType) {
        return this.search2.concat(this.selectedType);
      }
      return this.search2;
    },
 

  filteredCountries: function() {
    if (this.searchCriteria.length) {
      return this.posts.filter((post) => {
        return this.searchCriteria.every(x => post.name.indexOf(x) > -1);
        });
      }

      else if (this.searchCriteria2.length) {
        return this.posts.filter((post) => {
          return this.searchCriteria2.every(x => post.region.indexOf(x) > -1);
        });
      }

      return this.posts

     },

  },

  methods: {
    toggleClass: function(){
       this.isActive = !this.isActive;
    }
  }

}

  
</script>

<style scoped media="print">
#country-list {   max-width: 1200px;margin: 2% auto;padding-left:0px;}
#country-list li {width:23%; display:inline-block; margin-left: 1%; margin-right: 1%;    margin-bottom: 2%;    vertical-align: top;}
#country-list li .content {    background: white;padding: 20px;}
#country-list  li img {width: 100%;min-height: 200px;}
#country-list li .content h2 {margin-top:0px;    font-family: 'Nunito Sans', sans-serif;font-weight: 900; font-size: 20px;margin-bottom: 10px;}
#country-list li p {font-family: 'Nunito Sans', sans-serif;font-weight: 300;font-size: 18px;margin:0px; line-height: 30px;}
.flag  {background-size:cover!important;width:100%;    max-height: 200px;min-height: 200px;}
#search {display: inline-block;    width: 60%;}
a {font-family: 'Nunito Sans', sans-serif;color: #FF5722;margin-top: 20px;display: block;text-decoration: none;font-weight: 400;}
a:hover {text-decoration: underline;}
#filterCountry {padding: 13px;width: 40%;border-radius: 5px;border: 1px solid #e0e0e0;
padding-left: 20px;margin-right: 20px;font-family: 'Nunito Sans', sans-serif;font-weight: 300;font-size: 18px;}
#dropdownFilter {display: inline-block;    width: 40%;vertical-align: top;}
#dropdownFilter select {float:right;padding: 13px; width: 50%;border-radius: 5px;border: 1px solid #e0e0e0; padding-left: 20px; font-family: 'Nunito Sans', sans-serif;font-weight: 300;font-size: 18px;}
#topSearch {max-width: 1180px;margin: 2% auto;}
.fade-enter, .fade-leave-to {opacity: 0;}
 

@media only screen and (max-width: 600px) {

  ul {
    margin:0px;
        padding-left: 0;
  }
   ul li {
     width:100%!important;
     margin: 0px 0px 20px 0px!Important;

   }

   #country-list {
     width:90%;
   }

   #search {
     width:100%;
     text-align: center;
   }

   #filterCountry {
     width: 300px;
     display: block;
     margin:20px auto;
     padding:10px;
   }

   #dropdownFilter {
    display: block;
    width: 100%;
    margin:20px 0px
   }

   #dropdownFilter select {
    margin: auto;
    display: block;
    float: none;
     padding:10px;
   }

}


</style>
