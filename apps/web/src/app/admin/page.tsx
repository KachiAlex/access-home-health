"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Package, Users, Settings, BarChart3, FileText, LogOut, Plus, Edit, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive" | "out-of-stock";
  image: string;
  description: string;
}

// Real products based on WordPress images - expanded inventory
const mockProducts: Product[] = [
  // Wheelchairs
  {
    id: 1,
    name: "Blue Streak Wheelchair",
    price: 449.99,
    category: "Wheelchairs",
    stock: 12,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Blue-Streak-Wheelchair.jpg",
    description: "Standard wheelchair with comfortable seating and durable construction"
  },
  {
    id: 2,
    name: "Phoenix HD 3 Wheelchair",
    price: 899.99,
    category: "Wheelchairs",
    stock: 8,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Phoenix-HD-3.jpg",
    description: "Heavy duty wheelchair with enhanced durability and comfort features"
  },
  {
    id: 3,
    name: "Phoenix HD 4 Wheelchair",
    price: 999.99,
    category: "Wheelchairs",
    stock: 6,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Phoenix-HD-4.jpg",
    description: "Heavy duty wheelchair with advanced positioning and support"
  },
  {
    id: 4,
    name: "Cirrus Plus EC Wheelchair",
    price: 749.99,
    category: "Wheelchairs",
    stock: 10,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cirrus-Plus-EC.jpg",
    description: "Economy comfort wheelchair with ergonomic design"
  },
  {
    id: 5,
    name: "Cirrus Plus HD Wheelchair",
    price: 849.99,
    category: "Wheelchairs",
    stock: 7,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cirrus-Plus-HD.jpg",
    description: "Heavy duty wheelchair with reinforced frame and enhanced weight capacity"
  },
  {
    id: 6,
    name: "Full Reclining Rehab Wheelchair",
    price: 1299.99,
    category: "Wheelchairs",
    stock: 4,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Full-Reclining-Rehab-Wheelchair-Hydraulic-Seat-Lift.jpg",
    description: "Full reclining rehabilitation wheelchair with hydraulic seat lift"
  },
  {
    id: 7,
    name: "Lightweight Pediatric Multi-Function Wheelchair",
    price: 599.99,
    category: "Wheelchairs",
    stock: 5,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Lightweight-Pediatric-Multi-Function-Wheelchair.jpg",
    description: "Pediatric wheelchair with multi-function adjustments for children"
  },
  
  // Power Wheelchairs
  {
    id: 8,
    name: "Bobcat X3 Power Wheelchair",
    price: 2899.99,
    category: "Power Wheelchairs",
    stock: 6,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Bobcat-X3.jpg",
    description: "High-performance power wheelchair with advanced mobility features"
  },
  {
    id: 9,
    name: "Bobcat X4 Power Wheelchair",
    price: 3199.99,
    category: "Power Wheelchairs",
    stock: 5,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Bobcat-X4.jpg",
    description: "Advanced power wheelchair with enhanced maneuverability and comfort"
  },
  {
    id: 10,
    name: "Scout 4 Power Wheelchair",
    price: 2499.99,
    category: "Power Wheelchairs",
    stock: 7,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Scout-4.jpg",
    description: "Compact power wheelchair perfect for indoor use"
  },
  {
    id: 11,
    name: "Maverick Power Wheelchair",
    price: 2799.99,
    category: "Power Wheelchairs",
    stock: 4,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Maverick.jpg",
    description: "Sporty power wheelchair with excellent outdoor performance"
  },
  {
    id: 12,
    name: "Dart 4 Power Wheelchair",
    price: 2299.99,
    category: "Power Wheelchairs",
    stock: 6,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Dart-4.jpg",
    description: "Compact power wheelchair with tight turning radius"
  },
  {
    id: 13,
    name: "Cobra GT4 Power Wheelchair",
    price: 3499.99,
    category: "Power Wheelchairs",
    stock: 3,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cobra-GT4.jpg",
    description: "High-performance power wheelchair with GT4 technology"
  },
  {
    id: 14,
    name: "Titan X16 Power Wheelchair",
    price: 3999.99,
    category: "Power Wheelchairs",
    stock: 2,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Titan-X16.jpg",
    description: "Heavy duty power wheelchair with X16 advanced features"
  },
  {
    id: 15,
    name: "Wildcat 450 Power Wheelchair",
    price: 2699.99,
    category: "Power Wheelchairs",
    stock: 5,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Wildcat-450.jpg",
    description: "All-terrain power wheelchair with 450lb weight capacity"
  },
  
  // Transport Chairs
  {
    id: 16,
    name: "22 Bariatric Aluminum Transport Chair",
    price: 329.99,
    category: "Transport Chairs",
    stock: 8,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/22-Bariatric-Aluminum-Transport-Chair.jpg",
    description: "Heavy-duty bariatric transport chair with reinforced aluminum frame"
  },
  {
    id: 17,
    name: "Aluminum Transport Chair",
    price: 249.99,
    category: "Transport Chairs",
    stock: 14,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Aluminum-Transport-Chair.jpg",
    description: "Standard aluminum transport chair with foldable design"
  },
  {
    id: 18,
    name: "Deluxe Fly Weight Aluminum Transport Chair",
    price: 279.99,
    category: "Transport Chairs",
    stock: 10,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Deluxe-Fly-Weight-Aluminum-Transport-Chair.jpg",
    description: "Ultra-lightweight transport chair with removable casters"
  },
  {
    id: 19,
    name: "Deluxe Go-Kart Steel Transport Chair Chrome",
    price: 299.99,
    category: "Transport Chairs",
    stock: 9,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Deluxe-Go-Kart-Steel-Transport-Chair-Chrome.jpg",
    description: "Chrome steel transport chair with go-kart style design"
  },
  {
    id: 20,
    name: "Steel Transport Chair",
    price: 199.99,
    category: "Transport Chairs",
    stock: 12,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Steel-Transport-Chair.jpg",
    description: "Durable steel transport chair with classic design"
  },
  {
    id: 21,
    name: "TranSport Aluminum Transport Chair",
    price: 259.99,
    category: "Transport Chairs",
    stock: 11,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/TranSport-Aluminum-Transport-Chair.jpg",
    description: "Professional aluminum transport chair with enhanced comfort"
  },
  {
    id: 22,
    name: "Travelite Transport Chair",
    price: 229.99,
    category: "Transport Chairs",
    stock: 15,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Travelite-Transport-Chair.jpg",
    description: "Lightweight travel transport chair easy to fold and carry"
  },
  
  // Rollators
  {
    id: 23,
    name: "Nitro Aluminum Rollator 10 Casters",
    price: 199.99,
    category: "Rollators",
    stock: 15,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Nitro-Aluminum-Rollator-10-Casters.jpg",
    description: "Lightweight aluminum rollator with 10-inch casters for smooth mobility"
  },
  {
    id: 24,
    name: "Nitro DLX Rollator",
    price: 249.99,
    category: "Rollators",
    stock: 10,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Nitro-DLX-Rollator.jpg",
    description: "Deluxe rollator with premium features and enhanced comfort"
  },
  {
    id: 25,
    name: "Nitro Elite CF Carbon Fiber Rollator",
    price: 349.99,
    category: "Rollators",
    stock: 6,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Nitro-Elite-CF-Carbon-Fiber-Rollator.jpg",
    description: "Ultra-lightweight carbon fiber rollator for maximum portability"
  },
  {
    id: 26,
    name: "Airgo Comfort Plus Rollator",
    price: 179.99,
    category: "Rollators",
    stock: 18,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Airgo-Comfort-Plus-Rollator.jpg",
    description: "Comfort-focused rollator with ergonomic hand grips and seat"
  },
  {
    id: 27,
    name: "Go-Lite Bariatric Steel Rollator",
    price: 289.99,
    category: "Rollators",
    stock: 7,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Go-Lite-Bariatric-Steel-Rollator.jpg",
    description: "Heavy-duty bariatric rollator with reinforced steel construction"
  },
  {
    id: 28,
    name: "Bariatric Rollator with 8 Wheels",
    price: 269.99,
    category: "Rollators",
    stock: 8,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Bariatric-Rollator-with-8-Wheels.jpg",
    description: "Bariatric rollator with 8-wheel stability system"
  },
  {
    id: 29,
    name: "Duet Rollator Transport Chair 8 Casters",
    price: 329.99,
    category: "Rollators",
    stock: 9,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Duet-Rollator-Transport-Chair-8-Casters.jpg",
    description: "2-in-1 rollator and transport chair with 8 casters"
  },
  
  // Walkers
  {
    id: 30,
    name: "Clever Lite Walker Adult with 8 Casters",
    price: 89.99,
    category: "Walkers",
    stock: 22,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Clever-Lite-Walker-Adult-with-8-Casters.jpg",
    description: "Adult walker with 8 casters for enhanced stability and maneuverability"
  },
  {
    id: 31,
    name: "Clever Lite Walker Adult with 5 Casters",
    price: 79.99,
    category: "Walkers",
    stock: 18,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Clever-Lite-Walker-Adult-with-5-Casters.jpg",
    description: "Adult walker with 5 casters for smooth indoor/outdoor use"
  },
  {
    id: 32,
    name: "Deluxe Folding Travel Walker with 5 Wheels",
    price: 99.99,
    category: "Walkers",
    stock: 14,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Deluxe-Folding-Travel-Walker-with-5-Wheels.jpg",
    description: "Compact folding walker perfect for travel"
  },
  {
    id: 33,
    name: "Deluxe Trigger Release Folding Walker",
    price: 69.99,
    category: "Walkers",
    stock: 20,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Deluxe-Trigger-Release-Folding-Walker.jpg",
    description: "Easy folding walker with trigger release mechanism"
  },
  
  // Canes
  {
    id: 34,
    name: "Offset Handle Aluminum Canes",
    price: 29.99,
    category: "Canes",
    stock: 30,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Offset-Handle-Aluminum-Canes.jpg",
    description: "Ergonomic offset handle aluminum canes with adjustable height"
  },
  {
    id: 35,
    name: "Aluminum Folding Canes Height Adjustable",
    price: 34.99,
    category: "Canes",
    stock: 25,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Aluminum-Folding-Canes-Height-Adjustable.jpg",
    description: "Folding aluminum canes with height adjustment feature"
  },
  {
    id: 36,
    name: "Gel Grip Aluminum Offset Canes",
    price: 39.99,
    category: "Canes",
    stock: 22,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Gel-Grip-Aluminum-Offset-Canes-Height-Adjustable.jpg",
    description: "Premium offset canes with gel grip for maximum comfort"
  },
  {
    id: 37,
    name: "Airgo Comfort Plus Aluminum Cane with Claw Tip",
    price: 44.99,
    category: "Canes",
    stock: 18,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Airgo-Comfort-Plus-Aluminum-Cane-with-Claw-Tip-Derby-Handle.jpg",
    description: "Aluminum cane with claw tip and derby handle for stability"
  },
  {
    id: 38,
    name: "Quad Canes Large and Small Base",
    price: 49.99,
    category: "Canes",
    stock: 16,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Quad-Canes-Large-and-Small-Base-with-Silver-Vein-Finish.jpg",
    description: "Quad canes with large and small base options in silver vein finish"
  },
  
  // Scooters
  {
    id: 39,
    name: "Panther Heavy Duty 4 Wheel Scooter",
    price: 1899.99,
    category: "Scooters",
    stock: 4,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Panther-Heavy-Duty-4-Wheel-Scooter.jpg",
    description: "Heavy-duty mobility scooter with 4-wheel stability and high weight capacity"
  },
  {
    id: 40,
    name: "3 Wheeled Mini Scooter Classic Style",
    price: 1299.99,
    category: "Scooters",
    stock: 6,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/3-Wheeled-Mini-Scooter-Classic-Style.jpg",
    description: "Classic style 3-wheel mini scooter for easy maneuverability"
  },
  {
    id: 41,
    name: "Portable Folding Electric Scooter",
    price: 1599.99,
    category: "Scooters",
    stock: 5,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Portable-Folding-Electric-Scooter.jpg",
    description: "Portable electric scooter with folding design for transport"
  },
  
  // Bathroom Safety
  {
    id: 42,
    name: "Heavy Duty Bath Bench with Back",
    price: 79.99,
    category: "Bathroom Safety",
    stock: 0,
    status: "out-of-stock",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Heavy-Duty-Bath-Bench-with-Back.jpg",
    description: "Heavy-duty bath bench with back support for safe showering"
  },
  {
    id: 43,
    name: "Bath Board with Handle",
    price: 59.99,
    category: "Bathroom Safety",
    stock: 12,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Bath-Board-with-Handle.jpg",
    description: "Bath board with handle for safe tub transfers"
  },
  {
    id: 44,
    name: "Raised Toilet Seat with Locks",
    price: 39.99,
    category: "Bathroom Safety",
    stock: 18,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Raised-Toilet-Seat-with-LocksNo-Arms.jpg",
    description: "Raised toilet seat with locking mechanism for stability"
  },
  {
    id: 45,
    name: "Lightweight Bath Tub Lift",
    price: 899.99,
    category: "Bathroom Safety",
    stock: 3,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Lightweight-Bath-Tub-Lift.jpg",
    description: "Battery-powered bath lift for safe tub entry and exit"
  },
  
  // Medical Supplies
  {
    id: 46,
    name: "Cardinal Health Foley Catheter Insertion Tray",
    price: 12.99,
    category: "Medical Supplies",
    stock: 50,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cardinal-Health™-Foley-Catheter-Insertion-Tray-10cc-Prefilled-Syringe-Universal.jpg",
    description: "Sterile catheter insertion tray with pre-filled syringe"
  },
  {
    id: 47,
    name: "Cardinal Health Conforming Stretch Gauze Bandage",
    price: 8.99,
    category: "Medical Supplies",
    stock: 75,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cardinal-Health™-Conforming-Stretch-Gauze-Bandage-4-x-75.jpg",
    description: "Conforming stretch gauze bandage 4 x 75 yards"
  },
  {
    id: 48,
    name: "Cardinal Health Self-Adherent Bandage",
    price: 6.99,
    category: "Medical Supplies",
    stock: 60,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cardinal-Health™-Self-Adherent-Bandage-6-x-5-yds.jpg",
    description: "Self-adherent bandage 6 x 5 yards, no tape needed"
  },
  {
    id: 49,
    name: "AmeriGel Saline Wound Wash",
    price: 4.99,
    category: "Medical Supplies",
    stock: 40,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/AmeriGel-Saline-Wound-Wash.jpg",
    description: "Sterile saline wound wash for gentle cleaning"
  },
  {
    id: 50,
    name: "Cuties Baby Diapers Size 3",
    price: 15.99,
    category: "Medical Supplies",
    stock: 100,
    status: "active",
    image: "file:///D:/Access Home Health Medical Supplies/Access Health Medical Supplies/websitefiles/wp-content/uploads/2025/04/Cuties®-Baby-Diaper-Size-3-16-to-28-lb.jpg",
    description: "Baby diapers size 3 for 16-28 lbs, pack of 32"
  }
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  // Admin credentials (in production, these should be in environment variables)
  const ADMIN_EMAIL = "admin@accesshomehealth.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === "active" ? "inactive" : "active" }
        : p
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600 mt-2">Access Home Health Medical Supplies</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@accesshomehealth.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Credentials:</strong><br />
                Email: admin@accesshomehealth.com<br />
                Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "dashboard" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BarChart3 size={20} />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "products" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Package size={20} />
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "orders" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText size={20} />
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("customers")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "customers" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Users size={20} />
                  Customers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "settings" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings size={20} />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.filter(p => p.status === "active").length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Out of Stock</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.filter(p => p.stock === 0).length}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {[...new Set(products.map(p => p.category))].length}
                      </p>
                    </div>
                    <Settings className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.slice(0, 5).map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover mr-3"
                              />
                              <span className="text-sm font-medium text-gray-900">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === "active" 
                                ? "bg-green-100 text-green-800"
                                : product.status === "out-of-stock"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus size={20} />
                  Add Product
                </button>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(product.id)}
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                product.status === "active" 
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : product.status === "out-of-stock"
                                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {product.status}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Order management functionality coming soon</p>
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Management</h2>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Customer management functionality coming soon</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Settings functionality coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
