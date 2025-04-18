import { Product } from "@/types/product";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(product);
  };

  return (
    <div className="pb-6 max-w-full">
      <AspectRatio
        ratio={8 / 9}
        className="dark:bg-neutral-900 bg-neutral-100 px-4 content-center rounded-2xl group"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-md object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out "
        />
      </AspectRatio>
      <div className="space-y-1">
        <h2 className="font-display font-bold mt-4 truncate">
          {product.title}
        </h2>
        <p className="text-foreground text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <Badge variant="outline">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Badge>
        <div className="space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddToWishlist}
            className="active:scale-95"
          >
            <Heart
              className={cn(
                "text-neutral-600 dark:text-neutral-400",
                isInWishlist && "fill-red-500 text-red-500"
              )}
            />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddToCart}
            className="active:scale-95"
          >
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </div>
  );
}
