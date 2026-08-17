import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  MapPin,
  Star,
  Check,
  X,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Package,
  Truck,
  Award,
  CheckCircle2,
  Sparkles,
  GitCompareArrows,
} from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from '@/lib/motion';

interface Shop {
  id: string;
  name: string;
  product: string;
  type: string;
  location: string;
  price: number;
  distance: string;
  availability: 'In Stock' | 'Limited' | 'Out of Stock';
  rating: number;
  delivery: string;
}

const shops: Shop[] = [
  {
    id: 'shop-a',
    name: 'GreenGrow Agri Mart',
    product: 'Copper Oxychloride 50% WP',
    type: 'Fungicide',
    location: 'Kolhapur Central',
    price: 420,
    distance: '2.4 km',
    availability: 'In Stock',
    rating: 4.7,
    delivery: 'Same-day pickup',
  },
  {
    id: 'shop-b',
    name: 'Shree Krishi Kendra',
    product: 'Copper Oxychloride 50% WP',
    type: 'Fungicide',
    location: 'Kolhapur South',
    price: 385,
    distance: '5.1 km',
    availability: 'In Stock',
    rating: 4.5,
    delivery: 'Tomorrow, 11 AM',
  },
  {
    id: 'shop-c',
    name: 'AgriPlus Supplies',
    product: 'Copper Oxychloride 50% WP',
    type: 'Fungicide',
    location: 'Kolhapur North',
    price: 445,
    distance: '7.8 km',
    availability: 'Limited',
    rating: 4.2,
    delivery: 'Tomorrow, 6 PM',
  },
];

type OrderStep = 'browsing' | 'selected' | 'cart' | 'ordered';

interface FertilizerMarketplaceProps {
  onBackToDiagnosis: () => void;
}

export default function FertilizerMarketplace({ onBackToDiagnosis }: FertilizerMarketplaceProps) {
  const [showCompare, setShowCompare] = useState(false);
  const [orderStep, setOrderStep] = useState<OrderStep>('browsing');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const bestValue = shops.reduce((min, s) => (s.price < min.price ? s : min));

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    setOrderStep('selected');
  };

  const handleAddToCart = () => setOrderStep('cart');
  const handlePlaceOrder = () => setOrderStep('ordered');
  const handleReset = () => {
    setOrderStep('browsing');
    setSelectedShop(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-lime-glow" />
            <h3 className="font-display text-lg font-semibold text-offwhite">
              Fertilizer Marketplace
            </h3>
          </div>
          <p className="mt-2 text-sm text-offwhite-muted">
            Recommended for your detected crop condition — Early Blight on Tomato
          </p>
        </div>
        <button
          onClick={onBackToDiagnosis}
          className="group inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-lime-glow/30 hover:text-lime-glow sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Diagnosis
        </button>
      </div>

      {/* Compare toggle */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => setShowCompare((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
            showCompare
              ? 'border-lime-glow/40 bg-lime-glow/10 text-lime-glow'
              : 'border-white/[0.1] bg-white/[0.03] text-offwhite-muted hover:border-lime-glow/30 hover:text-lime-glow'
          }`}
        >
          <GitCompareArrows className="h-4 w-4" />
          {showCompare ? 'Hide Comparison' : 'Compare Prices'}
        </button>
      </div>

      {/* Comparison table */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ComparisonTable shops={shops} bestValueId={bestValue.id} onSelect={handleSelectShop} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop cards */}
      {orderStep === 'browsing' && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} isBestValue={shop.id === bestValue.id} onSelect={() => handleSelectShop(shop)} />
          ))}
        </motion.div>
      )}

      {/* Order flow */}
      <AnimatePresence mode="wait">
        {orderStep === 'selected' && selectedShop && (
          <motion.div
            key="selected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ProductView shop={selectedShop} onAddToCart={handleAddToCart} onBack={handleReset} />
          </motion.div>
        )}

        {orderStep === 'cart' && selectedShop && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <CartView shop={selectedShop} onPlaceOrder={handlePlaceOrder} onBack={() => setOrderStep('selected')} />
          </motion.div>
        )}

        {orderStep === 'ordered' && selectedShop && (
          <motion.div
            key="ordered"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <OrderConfirmation shop={selectedShop} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Shop Card
   ============================================================ */

function ShopCard({
  shop,
  isBestValue,
  onSelect,
}: {
  shop: Shop;
  isBestValue: boolean;
  onSelect: () => void;
}) {
  const availStyles = {
    'In Stock': 'text-emerald-glow bg-emerald-glow/10',
    Limited: 'text-amber-glow bg-amber-glow/10',
    'Out of Stock': 'text-red-400 bg-red-400/10',
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`glass-card group relative flex flex-col p-5 ${
        isBestValue ? 'border-lime-glow/30' : 'hover:border-lime-glow/20'
      } hover:bg-white/[0.05]`}
    >
      {isBestValue && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-lime-glow/20 px-2.5 py-0.5 text-xs font-semibold text-lime-glow ring-1 ring-lime-glow/30">
          <Award className="h-3 w-3" />
          Best Value
        </span>
      )}

      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/20">
          <Store className="h-5 w-5 text-lime-glow" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${availStyles[shop.availability]}`}>
          {shop.availability}
        </span>
      </div>

      <h4 className="mt-4 font-display text-base font-semibold text-offwhite">
        {shop.name}
      </h4>
      <p className="mt-1 text-xs text-offwhite-muted">{shop.product}</p>

      <div className="mt-3 flex items-center gap-3 text-xs text-offwhite-muted">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {shop.location}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 text-amber-glow" />
          {shop.rating}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-offwhite-muted">
        <span className="flex items-center gap-1">
          <Truck className="h-3 w-3" />
          {shop.delivery}
        </span>
        <span>{shop.distance}</span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-white/[0.06] pt-4">
        <div>
          <p className="text-xs text-offwhite-muted/60">Price</p>
          <p className="font-display text-xl font-bold text-offwhite">
            ₹ {shop.price}
          </p>
        </div>
        <button
          onClick={onSelect}
          disabled={shop.availability === 'Out of Stock'}
          className="inline-flex items-center gap-1.5 rounded-lg border border-lime-glow/30 bg-lime-glow/10 px-4 py-2 text-xs font-semibold text-lime-glow transition-all hover:bg-lime-glow/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Select Shop
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Comparison Table
   ============================================================ */

function ComparisonTable({
  shops,
  bestValueId,
  onSelect,
}: {
  shops: Shop[];
  bestValueId: string;
  onSelect: (shop: Shop) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.02]"
    >
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] text-xs uppercase tracking-widest text-offwhite-muted/60">
            <th className="px-5 py-3 font-medium">Shop</th>
            <th className="px-5 py-3 font-medium">Product</th>
            <th className="px-5 py-3 font-medium">Price</th>
            <th className="px-5 py-3 font-medium">Distance</th>
            <th className="px-5 py-3 font-medium">Availability</th>
            <th className="px-5 py-3 font-medium">Delivery</th>
            <th className="px-5 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => {
            const isBest = shop.id === bestValueId;
            return (
              <tr
                key={shop.id}
                className={`border-b border-white/[0.04] transition-colors ${
                  isBest ? 'bg-lime-glow/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2">
                    {isBest && <Award className="h-4 w-4 text-lime-glow" />}
                    <span className="font-medium text-offwhite">{shop.name}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-offwhite-muted">{shop.product}</td>
                <td className="px-5 py-4">
                  <span className={`font-display font-bold ${isBest ? 'text-lime-glow' : 'text-offwhite'}`}>
                    ₹ {shop.price}
                  </span>
                </td>
                <td className="px-5 py-4 text-offwhite-muted">{shop.distance}</td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 text-offwhite-muted">
                    {shop.availability === 'In Stock' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-glow" />
                    ) : shop.availability === 'Limited' ? (
                      <X className="h-3.5 w-3.5 text-amber-glow" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-red-400" />
                    )}
                    {shop.availability}
                  </span>
                </td>
                <td className="px-5 py-4 text-offwhite-muted">{shop.delivery}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => onSelect(shop)}
                    disabled={shop.availability === 'Out of Stock'}
                    className="inline-flex items-center gap-1 rounded-lg border border-lime-glow/25 bg-lime-glow/10 px-3 py-1.5 text-xs font-semibold text-lime-glow transition-all hover:bg-lime-glow/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Select
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

/* ============================================================
   Product View
   ============================================================ */

function ProductView({
  shop,
  onAddToCart,
  onBack,
}: {
  shop: Shop;
  onAddToCart: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          {/* Product visual */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-forest-700/30 to-forest-900/30 p-8 sm:w-48">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/20">
              <Package className="h-8 w-8 text-lime-glow" />
            </span>
            <p className="mt-3 text-xs text-offwhite-muted">500g Pack</p>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-lime-glow" />
              <span className="text-sm text-offwhite-muted">{shop.name}</span>
            </div>
            <h4 className="mt-2 font-display text-xl font-semibold text-offwhite">
              {shop.product}
            </h4>
            <p className="mt-1 text-sm text-offwhite-muted">{shop.type} • For Early Blight treatment</p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailItem label="Price" value={`₹ ${shop.price}`} highlight />
              <DetailItem label="Distance" value={shop.distance} />
              <DetailItem label="Rating" value={`${shop.rating} ★`} />
              <DetailItem label="Delivery" value={shop.delivery} />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-offwhite-muted">
              A broad-spectrum protectant fungicide effective against fungal leaf
              diseases. Suitable for tomato, potato, and other vegetables. Apply
              every 7–10 days for best results.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onAddToCart}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-lime-glow/30 bg-gradient-to-r from-forest-600 to-forest-800 px-6 py-3 text-sm font-semibold text-offwhite shadow-glow transition-all hover:border-lime-glow/60"
              >
                <ShoppingCart className="h-4 w-4 text-lime-glow" />
                Add to Cart
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-white/20 hover:text-offwhite"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shops
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flow indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs text-offwhite-muted/60">
        <span className="flex items-center gap-1.5 text-lime-glow">
          <CheckCircle2 className="h-3.5 w-3.5" /> Select Shop
        </span>
        <ArrowRight className="h-3 w-3" />
        <span className="flex items-center gap-1.5 text-lime-glow">
          <Package className="h-3.5 w-3.5" /> View Product
        </span>
        <ArrowRight className="h-3 w-3" />
        <span className="flex items-center gap-1.5">
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
        </span>
        <ArrowRight className="h-3 w-3" />
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" /> Order
        </span>
      </div>
    </motion.div>
  );
}

function DetailItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <p className="text-xs text-offwhite-muted/60">{label}</p>
      <p className={`mt-0.5 text-sm font-semibold ${highlight ? 'text-lime-glow' : 'text-offwhite'}`}>
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   Cart View
   ============================================================ */

function CartView({
  shop,
  onPlaceOrder,
  onBack,
}: {
  shop: Shop;
  onPlaceOrder: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h4 className="font-display text-lg font-semibold text-offwhite">Your Cart</h4>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/20">
              <Package className="h-6 w-6 text-lime-glow" />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-offwhite">{shop.product}</p>
              <p className="mt-0.5 text-xs text-offwhite-muted">{shop.name} • {shop.location}</p>
              <p className="mt-1 text-xs text-offwhite-muted">Qty: 1 × 500g</p>
            </div>
            <p className="font-display text-lg font-bold text-offwhite">₹ {shop.price}</p>
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-offwhite-muted">
              <span>Subtotal</span>
              <span>₹ {shop.price}</span>
            </div>
            <div className="flex justify-between text-offwhite-muted">
              <span>Delivery</span>
              <span className="text-emerald-glow">Free</span>
            </div>
            <div className="flex justify-between border-t border-white/[0.06] pt-2 font-display text-base font-bold text-offwhite">
              <span>Total</span>
              <span>₹ {shop.price}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onPlaceOrder}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-lime-glow/40 bg-gradient-to-r from-forest-600 to-forest-800 px-6 py-3.5 text-sm font-bold text-offwhite shadow-glow transition-all hover:border-lime-glow/70"
            >
              <Truck className="h-4 w-4 text-lime-glow" />
              Place Order
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-offwhite-muted transition-all hover:border-white/20 hover:text-offwhite"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-offwhite-muted/50">
            <Sparkles className="h-3 w-3" />
            Demo order — presentation simulation. No real payment is processed.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Order Confirmation
   ============================================================ */

function OrderConfirmation({
  shop,
  onReset,
}: {
  shop: Shop;
  onReset: () => void;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center rounded-2xl border border-emerald-glow/25 bg-gradient-to-br from-forest-700/30 to-forest-900/30 px-6 py-16 text-center backdrop-blur-sm"
    >
      <motion.div
        variants={scaleIn}
        className="relative"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-glow/15 ring-2 ring-emerald-glow/40"
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-glow" />
        </motion.span>
        {/* Ripple */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ delay: 0.3, duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border-2 border-emerald-glow/40"
        />
      </motion.div>

      <motion.h3 variants={fadeUp} className="mt-8 font-display text-2xl font-bold text-gradient-emerald sm:text-3xl">
        ORDER PLACED
      </motion.h3>

      <motion.p variants={fadeUp} className="mt-3 max-w-sm text-sm text-offwhite-muted">
        Your demo order for <span className="font-medium text-offwhite">{shop.product}</span> from{' '}
        <span className="font-medium text-offwhite">{shop.name}</span> has been placed successfully.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-offwhite-muted">
          Order #FS-{Math.floor(Math.random() * 90000) + 10000}
        </span>
        <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-offwhite-muted">
          {shop.delivery}
        </span>
        <span className="rounded-lg border border-emerald-glow/20 bg-emerald-glow/10 px-3 py-1.5 text-emerald-glow">
          ₹ {shop.price}
        </span>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-4 flex items-center gap-1.5 text-xs text-offwhite-muted/50">
        <Sparkles className="h-3 w-3" />
        Demo order — presentation simulation
      </motion.p>

      <motion.button
        variants={fadeUp}
        whileHover={{ scale: 1.03 }}
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-lime-glow/30 hover:text-lime-glow"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </motion.button>
    </motion.div>
  );
}
