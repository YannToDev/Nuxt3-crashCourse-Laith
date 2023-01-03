<template>
    <div>
        <div class="mt-32 flex flex-col items-center  md:flex-row md:items-start">        
            <NuxtErrorBoundary>
                <CarSideBar :city="city" />
                <NuxtPage />
                
                <!-- template, slot qui permet de gérer le rendu d'une erreur lorsqu'elle est captée par NuxtErrorBoundary -->
                <template #error="{error}">
                    <div class="text-center mx-auto flex flex-col gap-y-3">
                        <h1 class="text-4xl text-red-500">Sorry, something went wrong</h1>
                        <code>{{ error }}</code>
                        <button
                            @click="error.value = null" 
                            class="self-start mx-auto text-white bg-blue-400 px-10 py-3 rounded-lg mt-4"
                        >
                            Go Back
                        </button>
                    </div>
                </template>
            </NuxtErrorBoundary>
        </div>
    </div>
</template>

<script setup lang="ts">

    // pour utiliser le layout custom qui contient la Navbar et la div de type "container"
    definePageMeta({
        layout:'custom'
    });
    
    const route = useRoute();
    const city = route.params.city as string;
    const make = route.params.make as string;
    
    // Composable qui permet de mettre en majuscule la 1ere lettre de "make" et "city"
    const { toTitleCase } = useUtilities();

    // Permet de définir un titre dynamique en fonction du nom de la ville et du
    // fait que le paramètre optionnel "make" est renseigné ou non.
    useHead({
        title: `${toTitleCase(make ? make : 'Cars')} in ${toTitleCase(city)}`
    })

</script>

<!-- Dans le sous dossier dyanamique [city] on a un dossie(r "car" et un fichier du même nom "car"
ce qui se passe est que par exemple le chemin /city/persan/car nous amène a ce composant actuel et donc il va afficher le composant CarSideBar
a coup sur et tout le contenu des routes supplémentaires sera affichés dans la route /city/persan/car/[[make]] via le <NuxtPage />  -->P