import { createGlideClient } from "@paywithglide/glide-js";
class Glide{
 
  async sendfunds(projectid,data) {
    const glideClient = createGlideClient({
      projectId: projectid,
     
      // Lists the chains where payments will be accepted
      chains: [
        { id: 1 }, // Ethereum
        { id: 8543 }, // Base
        { id: 10 }, // Optimism
        { id: 137 }, // Polygon
        { id: 42161 }, // Arbitrum
      ],
  });


  const txHash = await glideClient.writeContract(data);
      if(txHash){
        return txHash;
      }
  } 
}


const glide = new Glide();
window.glide = glide;
export {glide}