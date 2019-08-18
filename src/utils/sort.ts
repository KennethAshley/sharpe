const sort = (label: string, order: string, arr: any[]): any[] =>  {
  const sortedArray = arr.sort((a, b) => {

    /* i could use an ternary to determine the
     * return value but if statements were chosen
     * for readability.
     */
    if (order === 'asc') {
      if (a[label] < b[label]) {
        return -1;
      }

      if (a[label] > b[label]) {
        return 1;
      }
    }

    if (order === 'desc') {
      if (a[label] < b[label]) {
        return 1;
      }

      if (a[label] > b[label]) {
        return -1;
      }
    }


    return 0;
  });

  return sortedArray;
};

export default sort;

