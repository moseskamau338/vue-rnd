<script setup>
import "gridjs/dist/theme/mermaid.css";
import {onMounted} from "vue";
import { Grid, h } from "gridjs";
import { RowSelection } from "gridjs/plugins/selection";

onMounted(() => {
    new Grid({
      columns: [
          {
            id: 'myCheckbox',
            name: '',
            sort: false,
            plugin: {
              // install the RowSelection plugin
              component: RowSelection,
            }
          },
          'Name', 'Language', 'Released At', 'Artist',
          {
            name: 'Actions',
            formatter: (cell, row) => {
              return h('button', {
                className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => alert(`Editing ${JSON.stringify(cell)} "${row.cells[0].data}" "${row.cells[1].data}"`)
              }, 'Edit');
            }
          },
      ],
      server: {
        url: 'https://api.scryfall.com/cards/search?q=Inspiring',
        then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist]),
        handle: (res) => {
          // no matching records found
          if (res.status === 404) return {data: []};
          if (res.ok) return res.json();

          throw Error('oh no :(');
        },
      },
      sort: true,
      search: true,
      fixedHeader: true,
        autoWidth: true,
        resizable: true,
      pagination: {
        limit: 10,
        summary: false
      }
    }).render(document.getElementById('wrapper'));
})

</script>

<template>
<div id="wrapper"></div>
</template>

<style scoped>

</style>