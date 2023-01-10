<template>
    <div class="shadow rounded-md overflow-hidden flex flex-col md:flex-row justify-between mb-4">
        
        <div class="flex flex-col xl:flex-row"> 
            <NuxtImg
                :src="listing.url"
                alt="car image"
                class="w-80 h-44 mr-3"
            />

            <div class="p-3">
                <h1 class="text-2xl">{{ listing.name }}</h1>
                <p class="text-blue-400">${{ listing.price }}</p>
            </div>
        </div>

        <div class="p-3 flex">
            <NuxtLink 
                :to="`/profile/listings/view/${listing.id}`"
                class="text-blue-400 mr-4"
            >
                View
            </NuxtLink>
            <p class="text-red-400 cursor-pointer">Delete</p>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { Listing } from '@/types/carsType'

    interface Props { 
        listing: Listing
    };
    
  const prop = defineProps<Props>();
</script>
