<!-- vue principale du sous dossier listings correspond a /profile/listings -->

<template>
    <div>
<div class="flex justify-between items-center mt-24">
    <h1 class="text-6xl">
        My Listings
    </h1>
    <NuxtLink 
        to="/profile/listings/create"
        class="w-9 h-9 flex items-center justify-center bg-blue-400 font-bold rounded-full text-white cursor-pointer"
    >
        +
    </NuxtLink>
</div>

<div class="shadow rounded p-3 mt-5">
    <CarListingCard 
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
    />
</div>

    </div>
</template>

<script setup lang="ts">

    const { listings } = useCars();

    definePageMeta({
        layout:'custom',
        middleware:['auth']
    });

</script>


<!-- inline middleware défini directement dans le component ce n'est pas une bonne pratique -->
 middleware:[
    function(to,from){
        
        const user = useSupabaseUser();
        if(user.value){
            return;
        }
        return navigateTo("/login");
    }
]