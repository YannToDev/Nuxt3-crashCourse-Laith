<!-- Composant container des Cards -->

<template>
    <div class="w-full">
        <CarCard
            @favor="handleFavorite"
            v-for="car in cars"
            :key="car.id"
            :car="car"
            :favored="car.id in favorite"
        />
    </div>
</template>

<script setup lang="ts">

    // composables pour importer nos voitures
    const { cars } = useCars();

    const favorite = useLocalStorage("favorite",{})


    // méthode qui est délenché lors de la reception de l'émit provenant du composant enfant Card autremnt dit quand on clic sur un coeur.
    // si on a click sur un coeur dont l'id est déjà dans l'objet c'est qu'on ne veut plus qu'il soit favoris et donc on le supprime.
    // Au contraire, c'est qu'on veut l'ajouter en favoris et donc on utilise le destructuring pour l'ajouter à notre objet de sorte à conserver
    // les éléments déjà présents.
    const handleFavorite = (id: number) => {

        if(id in favorite.value){
            delete favorite.value[id]
        }
        else{
            
             favorite.value = {
                ...favorite.value,
                [id]: true
            }
        }
    }      

</script>