<!-- composant qui correspond à l'input de recherche placé dans la Hero de la page d'acceuil -->

<template>    
    <div
        class="font-serif  mx-auto text-2xl rounded-xl bg-white flex justify-between overflow-hidden drop-shadow-2xl"
        :class="cityError? 'border-2 border-red-600' :''"
    >
        
        <input 
            @focus="resetErrorCity"
            v-model="city"
            type="text" 
            :placeholder="cityError? 'Enter a city Please' :'Search by city'"
            class="py-3 px-5 w-full  text-2xl rounded-xl focus:outline-none"
            :class="cityError? ' placeholder:text-red-600' :''"
        >
        
        <button
            @click="handleSearch"
            class="bg-sky-500 px-10 text-white w-1/5"
        >
            Search
        </button>
        
    </div>
</template>

<script setup lang="ts">

    const city = ref("");
    const cityError = ref(false)

    const handleSearch = () => {

        if(!city.value){

            cityError.value = true;
            return;
        }

        navigateTo(`/city/${city.value}/car`);
    }

    // Quand l'erreur est active, on la reset des que l'input est focus de nouveau
    const resetErrorCity =()=> {

        cityError.value = false;
    }

</script>
