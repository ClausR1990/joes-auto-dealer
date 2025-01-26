"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, Search, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  content: {
    title: string;
    description?: string;
    cards?: {
      title: string;
      image?: string;
    }[];
  };
}

export interface EdgeBrowserProps {
  tabs: BrowserTab[];
  defaultTab?: string;
  className?: string;
}

export function Browser({
  tabs,
  defaultTab = tabs[0]?.id,
  className,
}: EdgeBrowserProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div className={cn("w-full max-w-4xl", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border bg-background shadow-lg overflow-hidden"
      >
        {/* Browser Chrome */}
        <div className="bg-muted/50 border-b px-4 py-2">
          {/* Tab Bar */}
          <Tabs
            defaultValue={defaultTab}
            className="space-y-2"
            onValueChange={setActiveTab}
          >
            <TabsList className="h-auto bg-transparent border-b p-0 gap-1 w-full justify-start flex-shrink">
              {tabs.map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="w-auto flex-shrink"
                >
                  <TabsTrigger
                    value={tab.id}
                    className="data-[state=active]:bg-background flex-shrink data-[state=active]:border-border data-[state=active]:border-b-background relative px-4 py-1.5 rounded-t-lg border-t border-x border-transparent data-[state=inactive]:bg-muted/50 data-[state=inactive]:hover:bg-muted/80"
                  >
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <Image
                        src={tab.favicon || "/placeholder.svg"}
                        alt=""
                        className="w-4 h-4 rounded-sm flex-shrink-0"
                        width={16}
                        height={16}
                      />
                      <span className="text-sm truncate overflow-hidden">
                        {tab.title}
                      </span>
                    </div>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            {/* Navigation Bar */}
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Address Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.9 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex-shrink w-full flex items-center gap-2 bg-background rounded-full px-2 md:px-4 py-1.5 border overflow-hidden"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate flex-1 block">
                  {tabs.find((tab) => tab.id === activeTab)?.url}
                </span>
                <div className="flex-1" />
                <Star className="w-4 h-4 text-muted-foreground hover:fill-yellow-400 hover:text-yellow-400 transition-colors duration-100 hover:cursor-pointer" />
              </motion.div>

              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-background rounded-sm max-w-full max-h-full overflow-y-auto aspect-video"
            >
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0 p-6">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h1 className="text-2xl font-bold text-foreground">
                        {tab.content.title}
                      </h1>
                      {tab.content.description && (
                        <p className="text-muted-foreground">
                          {tab.content.description}
                        </p>
                      )}
                    </div>

                    {tab.content.cards && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        {tab.content.cards.map((card, i) => (
                          <div
                            key={i}
                            className="rounded-lg border bg-card p-4 space-y-4"
                          >
                            {card.image ? (
                              <Image
                                src={card.image || "/placeholder.svg"}
                                alt=""
                                className="w-full max-w-full aspect-video object-cover rounded-lg bg-muted"
                                width={800}
                                height={600}
                              />
                            ) : (
                              <div className="w-full aspect-video bg-muted rounded-lg animate-pulse" />
                            )}
                            <h2 className="font-semibold text-card-foreground">
                              {card.title}
                            </h2>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
