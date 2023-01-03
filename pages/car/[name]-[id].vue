<!-- View qui correspond par exmple à la route /car/Toyota-123 -->
<template>
    <div>   
        <CarDetailHero 
            :miles="car.miles"
            :name="car.name"
            :price="car.price"
            :seats = "car.seats"
            :url="car.url"
        />
        <CarDetailAttribute 
            :features = car.features
        />
        <CarDetailDescription 
            :description="car.description" 
        />
        <CarDetailContact />
    </div>
</template>

<script setup lang="ts">

    import { Car } from '~~/types/carsType';

    // pour utiliser le layout custom qui contient la Navbar et la div de type "container"
    definePageMeta({
        layout: 'custom',
    });


    // Composable pour mettre la premiere lettre du paramètre "name" en majuscule
    const { toTitleCase } = useUtilities();

    // composable pour importer la liste de cars
    const { cars } = useCars();

    const route = useRoute();
    const name = route.params.name as string;
    const id = parseInt(route.params.id as string);


    // On récupère la voiture dont l'id correspond à celui recupéré en paramètre de l'url.
    // paer défaut renvoie Car | undefined mais on arrive sur cette page après avoir cliqué sur la photo
    // d'une voiture donc on est sur qu'elle existe à ce stade donc on force le typage en Car tout court
    const car = computed(() => {

        return cars.find(car => car.id === id) as Car;
    }); 

    // Si on trouve pas de voiture alors on définit une erreur et c'est bien une erreur de type serveur car on ne l'a trouve pas dans
    // les data et on ne peut pas procéder au rendus de la page.
    if(!car.value){

        throw createError({
            statusCode: 404,
            message: `Car with ID of ${id} does not exist`,
        })
    };


    // pour donner un titre dynamique correspondant au nom de la voiture
    useHead({
        title: `${toTitleCase(name)}`
    })

</script>

