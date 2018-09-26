const uuidv4 = require('uuid/v4')

const createAction = ({ type, user }) => async () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          type,
          payload,
          uuid: uuidv4(),
        }),
      1000,
    )
  })

module.exports = createAction
