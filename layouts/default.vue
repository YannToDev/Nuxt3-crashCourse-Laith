<!-- Layout par défault qui s'applique à toutes les pages, il affiche la navbar puis le rendu des pages
via le slot -->

<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>
