<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <!-- LOCATION START -->
        <div class="p-5 flex justify-between relative cursor border-b">
            <h3>Location</h3>
            <h3
                @click="updateLocationModal()" 
                class=" text-blue-400 capitalize cursor-pointer"
            >
                {{ route.params.city }}
            </h3>

            <div
                v-if="modal.location"
                class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
            >
                <input
                    v-model="newCity"
                    class="border p-1 rounded"
                    type="text"
                >
                <button
                    @click="onChangeLocation" 
                    class="bg-blue-400 w-full mt-2 rounded text-white  p-1"
                >
                    apply
                </button>
            </div>
        </div>
        <!-- LOCATION END -->

        <!-- MAKE START -->
        <div class="p-5 flex justify-between relative cursor border-b">
            <h3>Make</h3>
            <h3 
                @click="updateMakeModal()"
                class=" text-blue-400 capitalize cursor-pointer"
            >
                {{ route.params.make || "Any"  }}
            </h3>

            <div
                v-if="modal.make" 
                class="absolute flex justify-between flex-wrap border p-5 shadow left-20 md:left-56 top-1 -m-1  w-[200px] md:w-[350px] xl:w-[600px] bg-white"
            >
                <h4 
                    @click="onChangeMake(make)"
                    v-for="make in makes" 
                    :key="make"
                    class="w-1/3 cursor-pointer"
                >
                {{ make }}
            </h4>
            </div>
        </div>
        <!-- MAKE END -->

        <!-- PRICE START -->
        <div class="p-5 flex justify-between relative cursor border-b">
            <h3>Price</h3>
            <h3 
                @click="updatePriceModal"
                class=" text-blue-400 capitalize cursor-pointer"
            >
                {{ priceRangeText }}
            </h3>

            <div 
                v-if="modal.price"
                class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
            >
                <input
                    v-model="priceRange.min" 
                    type="number"
                    placeholder="Min"
                    class="border p-1 rounded"
                >
                <input 
                    v-model="priceRange.max" 
                    type="number" 
                    placeholder="Max" 
                    class="border p-1 rounded mt-2"
                >

                <button 
                    @click="onChangePrice" 
                    class="w-full bg-blue-400 mt-2 p-1 rounded-md text-white"
                >
                    Apply
                </button>
            </div>

        </div>
        <!-- PRICE END -->

    </div>
</template>

<script setup lang="ts">
   
    const route = useRoute();
    const router = useRouter();

  
    // commosable qui nous permet de récupérer les makes
    const { makes } = useCars();

    // ref qui sert au rendu conditionnel des modales
    const modal = ref({
        make:false,
        location:false,
        price:false
    });

    // pour les inputs de la modale associée aux prix
    const priceRange = ref({
        min:'',
        max:''
    });

    // computed qui permet de gérer le rendu condition du prix
    // 1. on recupère les paramètres de requête pour le prix minimum et le prix maximum qui peuvent être pasé sous la forme
    //    http://localhost:3000/city/Persan/car?minPrice=3000&maxPrice=10000 par exemple
    // 2. on traite tous les cas possible et on adapte le rendu conditionnel.
    const priceRangeText = computed(() => {

        const minPrice = route.query.minPrice;
        const maxPrice = route.query.maxPrice;

        if(!minPrice  && ! maxPrice) return "Any";

        else if(!minPrice && maxPrice) {
            return `<$${maxPrice}`
        }
        else if(minPrice && !maxPrice) {
            return `>${minPrice}`
        }
        else {
            return `$${minPrice}-$${maxPrice}`
        }
    });

    // lui appel ca "city" tout court
    const newCity = ref("");

    // fonction qui gère l'ouverture/fermeture de la modale permet de changer de ville
    const updateLocationModal = ():boolean => {

         return modal.value.location = !modal.value.location
    };

    // fonction qui gère l'ouverture/ fermeture de la modale qui permet de changer de marque de voiture
    const updateMakeModal =():boolean =>{

        return modal.value.make =!modal.value.make;

    };

    const updatePriceModal = ():boolean => {

        return modal.value.price =!modal.value.price;
         
    };
    
    // 1. si il n'y a pas de valeur saisie alors on return autrement dit on ferme la modale
    // 2. On vérifie la valeur saisie est valide autrement dit est valide(voir plus bas)
    // 3. on délenche la méthode précédente pour fermer la modale
    // 4.on change l'url pour la mettre à jour avec la nouvelle ville saisie et on réinitialise la valeur de l'input
    const onChangeLocation = () => {
        
        if(!newCity.value) return;
        if(!isNaN(parseInt(newCity.value))){
            throw createError({
                statusCode: 404,
                message :"Invalid city Format"
            })
        };

        updateLocationModal();
        navigateTo(`/city/${newCity.value}/car/${route.params.make}`);
        newCity.value = "";
    };


    // 1. on récupère le nom de la voiture passé en paramètre dans le DOM.
    // 2. on ferme la modale.
    // 3. On change l'url pour la mettre à jour avec la nouvelle marque de voiture.
    const onChangeMake = (make:string) => {

        updateMakeModal()
        navigateTo(`/city/${route.params.city}/car/${make}`)
    };

    // Méthode qui permet d'ajouter dans l'url les paramètres de requête correspondant aux valeurs
    // saisies dans les inputs de la modale price.
    // On traite tous les cas qui sont possibles
    const onChangePrice = () => {
        updatePriceModal();
        
        if(priceRange.value.max && priceRange.value.min) {
            if(priceRange.value.min > priceRange.value.max) return;

            router.push({
                query: {
                    maxPrice: priceRange.value.max,
                    minPrice: priceRange.value.min
                }
            })
        }
        else if (priceRange.value.max && !priceRange.value.min) {

            router.push({
                query: {
                    maxPrice: priceRange.value.max
                }
            })
        }
        else if (!priceRange.value.max && priceRange.value.min) {

            router.push({
                query: {
                    minPrice: priceRange.value.min
                }
            })
        }
    };

</script>

    <!-- Si on rencontre une erreur du a une mauvaise ville par exemple un nombre au lieu d'une chaine de caractère alors on a une erreur de type clien et non serveur
     car le seurveur a déjà hydraté notre application en renvoyant le composant qui est déjà visible d'ou le fait qu'on doit gérer l'erreur coté client et c'est ce qu'on 
    a fait dans la vue qui affiche ce composant (/city/[city]/car.vue) en l'englobant d'un NuxtErrorBoundary -->
