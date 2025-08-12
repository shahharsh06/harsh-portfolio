import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Send, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GithubIcon, LinkedinIcon } from "./icons";
import SectionIcon from "./SectionIcon";
import InteractiveCard from "./ui/InteractiveCard";
import { GradientButton } from "./ui/GradientButton";
import { SectionHeader } from "./ui/SectionHeader";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { ContactFormData } from "@/types";
import emailjs from "@emailjs/browser";
import disposableDomains from "disposable-email-domains";

function isValidEmail(email: string) {
  // Simple regex for demonstration; you can use a stricter one if needed
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDisposableEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.some(
    (d) => domain === d || domain.endsWith("." + d),
  );
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    if (isDisposableEmail(formData.email)) {
      toast({
        title: "Disposable Email Detected",
        description: "Please use a real, non-temporary email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const emailJsData = {
        ...formData,
        subject: `New Contact Form Submission from ${formData.name}`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailJsData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast({
        title: "Message sent successfully!",
        description:
          "Thank you for reaching out. I'll get back to you within 1-3 business days.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: PERSONAL_INFO.email,
      href: SOCIAL_LINKS.email,
    },
    {
      icon: MapPin,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: GithubIcon,
      label: "GitHub",
      href: SOCIAL_LINKS.github,
      username: `@${PERSONAL_INFO.github}`,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      username: `@${PERSONAL_INFO.linkedin}`,
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Contact"
          gradientWord="Me"
          icon={Mail}
          description="Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!"
        />

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <Card className="card-gradient border-border group hover:border-primary/30 transition-all duration-300 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form role="form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    required
                  />
                </div>

                <GradientButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="full-width"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </GradientButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
