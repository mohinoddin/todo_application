export default (todo, token) => {
    return fetch(``, {
      method: 'PUT',
      headers: {
       
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        action: todo.action,
        status: todo.status
      })
    })
      .then(response => response.json())
  }