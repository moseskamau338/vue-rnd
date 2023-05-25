<script setup>
defineProps(['name'])
</script>

<template>
<svg v-if="name === 'chevron-up'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.978 108.009">
  <path id="Icon_awesome-chevron-up" data-name="Icon awesome-chevron-up" d="M96.3,11.548,175.51,90.755a9.781,9.781,0,0,1,0,13.833l-9.238,9.238a9.781,9.781,0,0,1-13.817.016L89.386,51.07,26.318,113.843a9.781,9.781,0,0,1-13.817-.016l-9.238-9.238a9.781,9.781,0,0,1,0-13.833L82.47,11.548A9.782,9.782,0,0,1,96.3,11.548Z" transform="translate(-0.398 -8.683)"/>
</svg>

  <svg v-else-if="name === 'chevron-down'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.978 108.009">
    <path id="Icon_awesome-chevron-up" data-name="Icon awesome-chevron-up" d="M96.3,11.548,175.51,90.755a9.781,9.781,0,0,1,0,13.833l-9.238,9.238a9.781,9.781,0,0,1-13.817.016L89.386,51.07,26.318,113.843a9.781,9.781,0,0,1-13.817-.016l-9.238-9.238a9.781,9.781,0,0,1,0-13.833L82.47,11.548A9.782,9.782,0,0,1,96.3,11.548Z" transform="translate(178.375 116.692) rotate(180)"/>
  </svg>

  <svg v-else-if="name === 'chevron-both'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.978 280.009">
    <g id="Group_1569" data-name="Group 1569" transform="translate(1645 0)">
      <path id="Icon_awesome-chevron-up" data-name="Icon awesome-chevron-up" d="M96.3,11.548,175.51,90.755a9.781,9.781,0,0,1,0,13.833l-9.238,9.238a9.781,9.781,0,0,1-13.817.016L89.386,51.07,26.318,113.843a9.781,9.781,0,0,1-13.817-.016l-9.238-9.238a9.781,9.781,0,0,1,0-13.833L82.47,11.548A9.782,9.782,0,0,1,96.3,11.548Z" transform="translate(-1645.398 -8.683)"/>
      <path id="Icon_awesome-chevron-up-2" data-name="Icon awesome-chevron-up" d="M96.3,11.548,175.51,90.755a9.781,9.781,0,0,1,0,13.833l-9.238,9.238a9.781,9.781,0,0,1-13.817.016L89.386,51.07,26.318,113.843a9.781,9.781,0,0,1-13.817-.016l-9.238-9.238a9.781,9.781,0,0,1,0-13.833L82.47,11.548A9.782,9.782,0,0,1,96.3,11.548Z" transform="translate(-1466.625 288.692) rotate(180)"/>
    </g>
  </svg>

  <svg v-else-if="name === 'search'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>

    <svg v-else-if="name === 'spinner'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

  <svg v-else-if="name === 'pin-column-left'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.775 63.698">
      <path id="Path_917" data-name="Path 917" d="M62.159,78.7H12.616A10.616,10.616,0,0,1,2,68.082V25.616A10.616,10.616,0,0,1,12.616,15H62.159A10.616,10.616,0,0,1,72.775,25.616V68.082A10.616,10.616,0,0,1,62.159,78.7ZM25.022,28.188V62.656c0,1.954.022,7.755,0,8.964H62.159A3.539,3.539,0,0,0,65.7,68.082V25.616a3.539,3.539,0,0,0-3.539-3.539H25.022Z" transform="translate(-2 -15)"/>
    </svg>
    <svg v-else-if="name === 'pin-column-right'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.775 63.698">
    <path id="Path_918" data-name="Path 918" d="M62.159,78.7H12.616A10.616,10.616,0,0,1,2,68.082V25.616A10.616,10.616,0,0,1,12.616,15H62.159A10.616,10.616,0,0,1,72.775,25.616V68.082A10.616,10.616,0,0,1,62.159,78.7ZM12.616,22.078a3.539,3.539,0,0,0-3.539,3.539V68.082a3.539,3.539,0,0,0,3.539,3.539H49.495V22.078H12.616Z" transform="translate(-2 -15)"/>
  </svg>





</template>

<style scoped>

</style>