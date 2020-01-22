export const apiurl = `${process.env.NODE_ENV === "development" ?
    `http://localhost:${process.env.PORT || 80}` :
    `https://${process.env.URL || `horsinaround.app`}` }/api/v1`;
