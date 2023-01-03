<!-- Composant correspondant à la section contact de la vue détaillé d'une voiture -->

<template>
    <div class="mt-10">
        <div class="flex flex-col gap-y-2 md:gap-y-0 md:flex-row gap-x-1 justify-between w-full">
            <input type="text" placeholder="Name" class="border p-1 rounded-md w-full md:w-1/3">
            <input type="text" placeholder="Email" class="border p-1 rounded-md w-full md:w-1/3">
            <input type="text" placeholder="Phone" class="border p-1 rounded-md w-full md:w-1/3">
        </div>
    
        <div class="flex mt-4 w-full">
            <textarea class="border p-1 w-full" placeholder="Message" />
        </div>
    
        <button class="bg-blue-400 text-white px-10 py-3 rounded-md mt-4">
            Submit
        </button>
    
    </div>
</template>