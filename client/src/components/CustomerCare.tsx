import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function CustomerCare() {
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription for:", email);
    toast({ title: "Thank you for subscribing to our newsletter!" });
    e.currentTarget.reset();
  };

  return (
    <div id="customer-care">
      <h2 className="text-3xl font-light mb-8">Customer Care</h2>
      <div className="space-y-8">
        
        <div>
          <h3 className="text-xl font-medium mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-zah-gold" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-zah-gold" />
              <span>care@zah-jewelry.com</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-zah-gold" />
              <span>123 Luxury Lane, Jewelry District,<br />Mumbai, Maharashtra 400001</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Services</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-zah-gold rounded-full mr-3"></div>
              <span>Free shipping on orders above ₹50,000</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-zah-gold rounded-full mr-3"></div>
              <span>30-day return policy</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-zah-gold rounded-full mr-3"></div>
              <span>Lifetime jewelry servicing</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-zah-gold rounded-full mr-3"></div>
              <span>Custom design consultations</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-zah-gold rounded-full mr-3"></div>
              <span>Certified authenticity guarantee</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Visit Our Showroom</h3>
          <p className="text-zah-charcoal mb-4">
            Experience our jewelry collection in person at our flagship showroom. Expert consultations available by appointment.
          </p>
          <Button className="bg-zah-gold hover:bg-yellow-600 text-black font-medium">
            Book Appointment
          </Button>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Care Instructions</h3>
          <div className="bg-zah-off-white rounded-lg p-6">
            <p className="text-sm text-zah-charcoal mb-3">
              <strong>Gold Jewelry:</strong> Clean with mild soap and warm water. Store separately to avoid scratches.
            </p>
            <p className="text-sm text-zah-charcoal mb-3">
              <strong>Diamond Jewelry:</strong> Use a soft brush with warm soapy water. Avoid harsh chemicals.
            </p>
            <p className="text-sm text-zah-charcoal">
              <strong>Pearl Jewelry:</strong> Wipe with soft damp cloth after each wear. Store in breathable pouches.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">Newsletter</h3>
          <p className="text-zah-charcoal mb-4">
            Subscribe to receive updates about new collections and exclusive offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
            <Button type="submit" className="w-full bg-zah-gold hover:bg-yellow-600 text-black font-medium">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
