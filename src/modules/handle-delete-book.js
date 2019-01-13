import api from './api-call';

let modulePromise;

const deleteBook = async ({ bookId, userId }, promise) => {
  modulePromise = promise;
  try {
    const deletedBook = await api.delete(`book/${bookId}`)
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch(err => modulePromise.reject(err));
    const updatedUser =
        await api.get(`user/${userId}`)
          .then((res) => {
            console.log(res)
            const { books } = res.data.user;
            return api.put(`user/${userId}`, {
              books,
            })
              .then(response => response)
              .catch(err => modulePromise.resolve(err))
          })
          .catch(err => modulePromise.resolve(err));
    if (deletedBook && updatedUser) modulePromise.resolve();
  } catch (exception) {
    modulePromise.reject({
      type: 'handleDeleteBook.deleteBook',
      reason: exception,
    });
  }
};

const handleDeleteBook  = async ({ bookId, userId }) => new Promise((resolve, reject) => {
  deleteBook({ bookId, userId }, { resolve, reject });
});

export default handleDeleteBook;
