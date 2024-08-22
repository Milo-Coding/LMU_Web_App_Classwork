const getMagicItem = async (searchIn) => {
    const search = encodeURIComponent(searchIn.toLowerCase());
    const url = `https://api.open5e.com/magicitems/?search=${search}`;
    console.log(url);
    
    // fetch(url)
    //   .then((response) => {
    //     return response.json()
    //     // console.log("Got response")
    //   })
    //   .catch((error) => {
    //     //TODO error handeling
    //   });
    try {
        const response = await fetch(url)
        // console.log("got response")
        const json = await response.json()
        // console.log("got json")
        return json
    } catch (error) {
        console.log("something went wrong")
        return error;
    }

      
};

export {getMagicItem};
