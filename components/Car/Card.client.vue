<!-- Composant correspondant à une card en particulier -->

<template>
    <div class="w-full">
        <div 
            
            class=" relative shadow border w-full h-screen md:h-[200px] mb-5 overflow-hidden"
            ref="target" :style="{transform: cardTransform, transition :'transform 0.25s ease-out'}"    
        >
            
            <img
                @click="emit('favor',car.id)" 
                :src="favored ? heartFilled : heartOutline" 
                alt="favored icon" 
                class="absolute w-7 top-2 right-5 z-20 cursor-pointer"
            >

            <div class="flex h-full">
                <NuxtImg 
                    @click="navigateTo(`/car/${props.car.name}-${props.car.id}`)"
                    :src=props.car.url
                    alt="car image"
                    class="md:w-[300px] h-full object-cover cursor-pointer"
                />

                <div class="p-4 flex flex-col">
                    <div>
                        <h1 class="text-2xl text-blue-700">
                            {{ props.car.name }}
                        </h1>
                        <p class="text-gray-700">
                            {{ props.car.description  }}
                        </p>
                    </div>

                    <h1 class="mt-auto text-xl">${{props.car.price }}</h1>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import  heartFilled from "@/assets/heartFilled.png"
    import  heartOutline from "@/assets/heartOutline.png";
    import { Car } from '~~/types/carsType';

    import { useMouseInElement } from '@vueuse/core';

    const target = ref(null);
    const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(target);

    const cardTransform = computed(() => {

        const MAX_ROTATION = 8;

        const rx = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
        const ry = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2)

        return isOutside.value ? '' : `perspective(${elementWidth.value}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });



    // On défini le type de la props que va recevoir le composant. 
    // Ici il s'agit de notre interface Car, autrement dit un objet de type Car
    // il recoit aussi en props tous les id des car qui ont un état de favoris. 
    interface Props {
        car: Car,
        favored:boolean
    }

    const props = defineProps<Props>();


    // typage de l'émit, ici on a un emit qui s'appel 'favor' et qui va émettre un number en argument
    const emit = defineEmits<{ 
        (event: 'favor', prefix: number): void 
    }>();


</script>

<!-- on a  définit ce fichier en .client car sinon quand on rafraichit la page on a pas la persistance du state de façon visuelle alors qu'on l'a bien dans le
localstorage. Cela vient du fait qu'en rafraichissant la page on fait une requête au serveur qui va réhydrater la page et il  n'a pas accés aux données du localStorage.
C'est pour cela qu'on doit préciser que le refresh et donc le rechargement de la page se fait uniquement coté client et pas au niveau du serveur.-->

<!-- Même si cela fonctionne on constate que l'on a un flash blanc lors de reload de la page ce qui n'est pas terrible du tout il faudrait ajouter un état de loading. -->

  // const favored = useState(`favored-${props.car.id}`, () => {

    //     return false
    // });


