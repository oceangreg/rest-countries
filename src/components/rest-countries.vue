<template>
  <div v-bind:class="[isActive ? 'dark' : 'white']">
   <div class="header-bar">
    <div class="inner">
        <h1>Where in the world</h1>
        <span id="darkMode" @click="isActive = !isActive">Dark Mode</span>
    </div>
    </div>
    <CountryData />
    <FooterBottom />
  </div>
</template>

<script>
 import CountryData from "./country-data";
import FooterBottom from "./footer";
 
export default {

  data() {
    return {
      isActive: "",
    }
  },

  name: "RestCountries",
  components: {
     CountryData,
     FooterBottom
  },

  methods: {
    toggleClass: function(){
       this.isActive = !this.isActive;
    }
  }

};

</script>
