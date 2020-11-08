export const apiurl = `${process.env.NODE_ENV === "development" ?
    `http://${process.env.URL || `localhost`}:${process.env.PORT || 80}` :
    `http://${process.env.URL || `horsin-around.herokuapp.com`}` }/api/v1`;
