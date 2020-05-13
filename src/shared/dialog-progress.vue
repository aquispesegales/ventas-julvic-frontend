<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      max-width="290"
      persistent>
      <v-card
        color="primary"
        dark>
        <v-card-text>
          {{titulo}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    props: ['titulo','dialog']
  }
</script>