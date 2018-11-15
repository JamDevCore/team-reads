export const ascending = (array) => array.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt));
