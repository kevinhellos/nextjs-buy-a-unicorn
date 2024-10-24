import { productData } from "@/productData";
import unicorn from "@/media/unicorn-chibi.gif";

export default function Product() {
  
  // Only show paid content stuff if it is not in test mode.
  // Supposed we accidentally deploy a test config, buyers who made a purchase will not gain access
  // to the paid products
  if (!productData.isTestMode) {

  // Paid content goes here
  // E.g. paid course/ video URL
    return (
      <div className="ui-product-card text-center">
        <img 
          src={String(unicorn.src)} 
          alt={`${productData}`}
          width={225}
          className="mx-auto rounded-md mt-10"
        />
        <p className="text-sm text-black mt-5 mb-10">
          Here is a dancing Unicorn GIF for you !
        </p>
        <div className="text-xs text-gray-300">
          <span className="font-medium">Image credit: </span>
          https://tenor.com/view/unicorn-chibi-universe-cartoon-dab-gif-26630234
        </div>
      </div>
    );
  }
}
