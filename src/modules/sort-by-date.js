const sort = (array) => array.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt));

export default sort;
