export const publisher = "https://publisher.walrus-testnet.walrus.space";
export const aggregator = "https://aggregator.walrus-testnet.walrus.space";

// @ts-ignore
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
      if (!response.ok)
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);

      return response.arrayBuffer();
    })
    .then((buffer) => {
      const mp3Blob = new Blob([buffer as BlobPart], { type: "audio/mp3" });
      const bUrl = window.URL.createObjectURL(mp3Blob);

      return bUrl;
    })
    .catch((error) => {
      console.log(error);
    });
};
