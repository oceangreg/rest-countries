<template>
<div v-bind:class="[isActive ? 'dark' : 'white']">
     <div class="header-bar">
        <div class="inner">
          <h1>Where in the world</h1>
          <span id="darkMode" @click="isActive = !isActive">Dark Mode</span>
        </div>
      </div>
        <div class="single-main">

            <a href="/">Back to list </a>

            <div class="flag" :style="{backgroundImage: `url(${flag})` }"></div>
            <div class="information">
                <h1>{{countryname}}</h1>
                <ul>
                    <li><strong>Native Name:</strong> {{nativeName}} </li>
                    <li><strong>Population:</strong> {{population}}</li>
                    <li><strong>Region:</strong> {{region}}</li>
                    <li><strong>Sub Region:</strong> {{subregion}}</li>
                    <li><strong>Capital:</strong> {{capital}}</li>
                    <li><strong>Currencies:</strong> {{currencies}}</li>
                </ul>

             </div>
         </div>
    <FooterBottom />
</div>

</template>

<script>
import axios from 'axios';
import FooterBottom from "./footer";

export default {
  name: "singledata",
  components: {
    FooterBottom
  },

  props: ["countryname", "population", "region", "capital", "flag", "nativeName", "currencies", "borders", "subregion"],

   data() {
    return {
      posts: [],
       errors: [],
       isActive: "",
     }
  },


  created() {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data;
    })
    .catch(e => {
      this.errors.push(e)
    })
    
  },

};




</script>

<style scoped>
.single-main {max-width:1200px;margin:auto;padding:100px 0px;}
.flag {    width: 40%;height: 300px;background-size: cover;display: inline-block;}
.information {display: inline-block;vertical-align: top; margin-left: 40px;width:50%}
a {display: block; margin-bottom: 40px; text-decoration: none; background: white; width: 100px; text-align: center;padding: 10px;border-radius: 10px; font-size: 14px; box-shadow: 1px 5px 10px #0000002e;color: black;}
ul {padding-left:0px;}
li {list-style: none; display: inline-block;width: 50%;margin-bottom: 20px;}

@media only screen and (max-width: 600px) {
  .flag {
    background-size: cover;
    height: 270px;
    background-position: center;
    width:100%
  }
  .single-main {padding:50px 0px}
  a {margin-left: 20px;;}
  li {width:100%;}
}

</style>