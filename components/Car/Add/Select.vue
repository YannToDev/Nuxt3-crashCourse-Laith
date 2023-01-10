<!-- composant correspond au select de la view /profile/listings/create -->
<template>
    <div class=" flex flex-col w-full md:w-[48%] mt-2">
        <label
            for="title" 
            class="text-cyan-500 mb-1 text-sm"
        >
            {{ props.title }}
        </label>
        <select
            v-model="state"
            @change="onChange" 
            name="title" 
            id="title"
            class="p-2 border rounded-md w-full"
        >
            <option
                v-for="option,index in options"
                :key="index"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">

    interface Props {
        title:String;
        options: string[];
        name: string
    }

   const props = defineProps<Props>();


    const emits = defineEmits<{
        (event: 'changeInput', prefix:{state:string,name:string} ): void
    }>();

    const state = ref("");

    // quand on change la valeur du select (donc la marque de voiture choisie et qui correspond au v-model de l'input) on envoie celle-çi
    // ainsi que la valeur de la props name qui correspond à la valeur à modifier dans le state "info"
    const onChange = () => {
    
        emits('changeInput',{state:state.value,name:props.name});
    };

</script>

