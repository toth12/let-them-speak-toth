export const filtersChanged = (prevProps, props) => {
  let updated = false;
  ['selected', 'years'].map(field => {
    keys(prevProps[field]).map(v => {
      if (prevProps[field][v] !== props[field][v]) updated = true;
    })
  })
  return updated;
}

const keys = obj => Object.keys(obj);