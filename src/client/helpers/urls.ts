export const apiurl = `https://${process.env.NODE_ENV === "development" ?
    `localhost:${process.env.PORT || 9000}` :
    `${process.env.URL || `horsinaround.app`}` }/api/v1`;
