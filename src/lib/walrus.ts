const publisher = "https://publisher.walrus-testnet.walrus.space";
const aggregator = "https://aggregator.walrus-testnet.walrus.space";

export const walrusStore = async (formData: any) => {
  return fetch(`${publisher}/v1/store?epochs=5`, {
    method: "put",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const walrusRead = async (blobId: string) => {
  return fetch(`${aggregator}/v1/${blobId}`)
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
