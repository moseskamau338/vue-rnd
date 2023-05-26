// mouse.js
import {ref, onMounted, onUnmounted, computed} from 'vue'

// by convention, composable function names start with "use"
export function usePagination(options = {
    totalRecords: 0,
    totalPages: 0,
    maxButtons: 5,
    currentPage: 1,
}) {
  const pages = computed(() => {
      let totalPages = options.totalPages

      let numShown = Math.min(options.maxButtons, totalPages);
      let first = options.currentPage - Math.floor(numShown / 2);
      first = Math.max(first, 1);
      first = Math.min(first, totalPages - numShown + 1);
      const resArr = [...Array(numShown)].map((k,i) => i + first);
      const lastPageArr = ["...", totalPages];

      if(totalPages > options.maxButtons){
        return [...[...resArr, ...lastPageArr]];
      } else {
        return [...resArr]
      }
    });
  const pageSizeOptions = computed(() => {
      let pageSizeOptionsArr = [];
      let tensArr = [5, 10,20, 50, 100];
      let hundredsArr = [300, 500];
      let thousandsArr = [1000, 2000, 3000, 5000];
      const total = options.total;

      if(total > 1000){
        pageSizeOptionsArr = [...tensArr, ...hundredsArr, ...thousandsArr];

      } else if (total < 1000 && total > 100) {
        pageSizeOptionsArr = [...tensArr, ...hundredsArr];
      } else {
        pageSizeOptionsArr = [...tensArr];
      }
      return pageSizeOptionsArr;
    })
  return { pageSizeOptions, pages }
}