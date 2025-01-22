"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t w-full"
      initial={{ opacity: 0, y: 200 }}
      viewport={{ once: false, margin: "100px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, damping: 10 }}
    >
      <div className="container py-8 md:py-12 flex flex-col gap-8">
        <div className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-medium">Contact</h3>
            <p className="text-muted-foreground text-sm">
              123 Auto Drive
              <br />
              Anytown, USA 12345
              <br />
              (555) 123-4567
              <br />
              info@joesautodealer.com
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Hours</h3>
            <p className="text-muted-foreground text-sm">
              Monday - Friday: 9am - 8pm
              <br />
              Saturday: 10am - 6pm
              <br />
              Sunday: Closed
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary">
                About Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-4">
            © 2025 Joe&apos;s Auto Dealer. All rights reserved.
          </p>
          <p className="max-w-[600px] mx-auto">
            Disclaimer: This is a fictional car dealership website created as a
            demonstration. No actual vehicles are available for purchase, and no
            real transactions can be processed. All content, including images
            and descriptions, are for illustrative purposes only.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export { Footer };
