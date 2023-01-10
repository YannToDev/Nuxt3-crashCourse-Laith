<!-- composant correspond au textArea de la view /profile/listings/create -->
<template>
    <div class=" flex flex-col w-full mt-2">
        <label for="title" class="text-cyan-500 mb-1 text-sm">
            {{ props.title }}
        </label>
        <textarea 
            @input="onChange" 
            v-model="state" 
            type="text" 
            :placeholder="props.placeholder" 
            :name="props.name"
            class="p-2 border w-full rounded-md"
        >
        </textarea>
    </div>
</template>

<script setup lang="ts">

    interface Props {
        title: String;
        placeholder: string;
        name: string
    };

    const props = defineProps<Props>();

    const emits = defineEmits<{
        (event: 'changeInput', prefix: { state: string, name: string }): void
    }>();
    
    // Correspond au v-model de l'input qui sera send dans l'émit 
    const state = ref("");

    // quand on change la valeur du select (donc la marque de voiture choisie et qui correspond au v-model de l'input) on envoie celle-çi
    // ainsi que la valeur de la props name qui correspond à la valeur à modifier dans le state "info"
    const onChange = () => {

        emits('changeInput', { state: state.value, name: props.name });
    };

</script>