const getData = async (url) => {
  try {
    const data = await fetch(url);
    return data.json();
  } catch(err) {
    console.log(err)
  }
}

export default getData;