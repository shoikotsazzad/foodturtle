"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Clock, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, CATEGORIES, type TmProduct } from "@/lib/turtlemart-data";

export default function TurtlemartProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const { lang } = useLanguage();
  const router = useRouter();
  const { items, addItem, updateQuantity } = useCart();

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
          <h1 className="text-xl font-bold text-turtle-dark mb-2">Product not found</h1>
          <Link href="/turtlemart" className="text-turtle-pink font-medium hover:underline">
            ← Back to Turtlemart
          </Link>
        </div>
        <Footer />
        <MobileNav />
      </>
    );
  }

  const name = lang === "bn" ? product.name_bn : product.name_en;
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      id: product.id,
      restaurant_id: "turtlemart",
      restaurant_slug: "turtlemart",
      restaurant_name_en: "Turtlemart",
      restaurant_name_bn: "টার্টেলমার্ট",
      name_en: product.name_en,
      name_bn: product.name_bn,
      price: product.price,
      original_price: product.original_price,
      image: product.image,
    });
  };

  const catEmoji = CATEGORIES.find((c) => c.name === product.category)?.emoji ?? "🛒";
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discountPct = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6 pb-20 sm:pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-turtle-gray-2 mb-6">
          <Link href="/" className="hover:text-turtle-pink">Home</Link>
          <span>›</span>
          <Link href="/turtlemart" className="hover:text-turtle-pink">Turtlemart</Link>
          <span>›</span>
          <span className="text-turtle-dark">{product.name_en}</span>
        </nav>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-turtle-gray-2 hover:text-turtle-pink mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={name}
              className="w-full h-72 md:h-96 object-cover rounded-2xl"
            />
            {product.isOffer && (
              <span className="absolute top-4 left-4 bg-turtle-pink text-white text-xs font-bold px-3 py-1 rounded-full">
                🔥 OFFER
              </span>
            )}
            <span className="absolute top-4 right-4 bg-white/95 text-turtle-pink text-xs font-bold px-3 py-1 rounded-full border border-turtle-pink/20">
              Save Tk {product.save}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-turtle-pink-bg text-turtle-pink px-2 py-0.5 rounded-full font-medium">
                {catEmoji} {product.category}
              </span>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                {discountPct}% OFF
              </span>
            </div>

            <h1 className="text-2xl font-bold text-turtle-dark mb-1">{name}</h1>
            <p className="text-sm text-turtle-gray-2 mb-4">{product.description_en}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-turtle-pink">Tk {product.price}</span>
              <s className="text-lg text-turtle-gray-2">Tk {product.original_price}</s>
            </div>

            {/* Badges */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-turtle-dark bg-turtle-gray p-2 rounded-lg">
                <Clock size={13} className="text-turtle-gray-2" />
                <span>Delivery 15–30 min</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-turtle-dark bg-turtle-gray p-2 rounded-lg">
                <Shield size={13} className="text-green-500" />
                <span>Fresh guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-turtle-dark bg-turtle-gray p-2 rounded-lg">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>4.7 rating</span>
              </div>
            </div>

            {/* Cart controls */}
            {qty > 0 ? (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3 bg-turtle-pink-bg rounded-full px-4 py-2">
                  <button
                    onClick={() => updateQuantity(product.id, qty - 1)}
                    className="w-8 h-8 rounded-full border border-turtle-pink/30 flex items-center justify-center bg-white hover:bg-turtle-pink hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-lg font-bold text-turtle-dark w-6 text-center">{qty}</span>
                  <button
                    onClick={() => updateQuantity(product.id, qty + 1)}
                    className="w-8 h-8 rounded-full bg-turtle-pink text-white flex items-center justify-center hover:bg-turtle-pink/90 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  className="flex-1 bg-turtle-pink text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-turtle-pink/90 transition-colors"
                >
                  <ShoppingCart size={16} />
                  Go to Checkout
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full bg-turtle-pink text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-turtle-pink/90 transition-colors mb-4"
              >
                <Plus size={16} />
                Add to Cart
              </button>
            )}

            <Link
              href="/checkout"
              className="block w-full text-center border-2 border-turtle-pink text-turtle-pink py-3 rounded-full font-bold text-sm hover:bg-turtle-pink-bg transition-colors"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-turtle-dark mb-4">More from {catEmoji} {product.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((p) => {
                const rName = lang === "bn" ? p.name_bn : p.name_en;
                return (
                  <Link key={p.id} href={`/turtlemart/${p.id}`} className="block bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow">
                    <img src={p.image} alt={rName} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <p className="text-xs font-medium text-turtle-dark line-clamp-2 mb-1">{rName}</p>
                    <p className="text-sm font-bold text-turtle-pink">Tk {p.price}</p>
                    <s className="text-xs text-turtle-gray-2">Tk {p.original_price}</s>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
