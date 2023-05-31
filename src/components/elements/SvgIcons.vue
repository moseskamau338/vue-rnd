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

  <svg v-else-if="name === 'workshop'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
      <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
      <path fill-rule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>

  <svg v-else-if="name === 'categories'" xmlns="http://www.w3.org/2000/svg" width="16.29" height="16.333" viewBox="0 0 16.29 16.333">
    <g id="Group_2007" data-name="Group 2007" transform="translate(-2.5 -2.45)">
      <path id="Path_864" data-name="Path 864" d="M7.652,9.352H14a.807.807,0,0,0,.686-1.286L11.51,2.836a.881.881,0,0,0-1.458,0L6.88,8.066A.853.853,0,0,0,7.652,9.352Z" transform="translate(-0.607 0)"/>
      <circle id="Ellipse_48" data-name="Ellipse 48" cx="3.858" cy="3.858" r="3.858" transform="translate(11.074 11.067)"/>
      <path id="Path_865" data-name="Path 865" d="M8.5,13H3.357a.922.922,0,0,0-.857.857V19a.922.922,0,0,0,.857.857H8.5A.922.922,0,0,0,9.359,19V13.857A.922.922,0,0,0,8.5,13Z" transform="translate(0 -1.505)"/>
    </g>
  </svg>







</template>

<style scoped>

</style>